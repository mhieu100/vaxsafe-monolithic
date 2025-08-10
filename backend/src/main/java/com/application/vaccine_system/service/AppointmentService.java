package com.application.vaccine_system.service;

import com.application.vaccine_system.config.security.SecurityUtil;
import com.application.vaccine_system.model.*;
import com.application.vaccine_system.model.Appointment.Status;
import com.application.vaccine_system.model.request.ReqAppointment;
import com.application.vaccine_system.model.response.Pagination;
import com.application.vaccine_system.model.response.ResAppointment;
import com.application.vaccine_system.repository.*;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.io.UnsupportedEncodingException;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AppointmentService {
    private final VNPayService vnPayService;

    private final AppointmentRepository appointmentRepository;
    private final VaccineRepository vaccineRepository;
    private final CenterRepository centerRepository;
    private final UserRepository userRepository;
    private final PaymentRepository paymentRepository;

    public ResAppointment convertToReqAppointment(Appointment appointment) {
        ResAppointment res = new ResAppointment();
        res.setAppointmentId(appointment.getAppointmentId());
        res.setVaccineName(appointment.getVaccine().getName());
        res.setPatientName(appointment.getPatient().getFullname());
        res.setDoctorName(appointment.getDoctor() != null ? appointment.getDoctor().getFullname() : "");
        res.setCashierName(appointment.getCashier() != null ? appointment.getCashier().getFullname() : "");
        res.setCenterName(appointment.getCenter().getName());
        res.setAppointmentDate(appointment.getAppointmentDate());
        res.setAppointmentTime(appointment.getAppointmentTime());
        res.setStatus(appointment.getStatus());
        return res;
    }

    public ResAppointment createAppointmentWithCash(ReqAppointment reqAppointment)
            throws UnsupportedEncodingException {
        Vaccine vaccine = vaccineRepository.findById(reqAppointment.getVaccineId()).get();
        vaccine.setStockQuantity(vaccine.getStockQuantity() - 1);

        Appointment appointment = Appointment.builder()
                .vaccine(vaccineRepository.save(vaccine))
                .patient(userRepository.findById(reqAppointment.getPatientId()).get())
                .center(centerRepository.findById(reqAppointment.getCenterId()).get())
                .appointmentDate(reqAppointment.getAppointmentDate())
                .appointmentTime(reqAppointment.getAppointmentTime())
                .status(Status.PENDING).build();
        appointmentRepository.save(appointment);

        Payment payment = Payment.builder()
                .appointment(appointment)
                .paymentDate(LocalDate.now())
                .amount(vaccine.getPrice())
                .paymentMethod(Payment.PaymentMethod.CASH)
                .status(Payment.PaymentStatus.PENDING)
                .build();
        paymentRepository.save(payment);

        ResAppointment res = convertToReqAppointment(appointment);
        return res;
    }

    @Transactional
    public String createAppointmentWithCreditCard(ReqAppointment reqAppointment, String ipAddress)
            throws UnsupportedEncodingException {
        Vaccine vaccine = vaccineRepository.findById(reqAppointment.getVaccineId()).get();
        vaccine.setStockQuantity(vaccine.getStockQuantity() - 1);

        Appointment appointment = Appointment.builder()
                .vaccine(vaccineRepository.save(vaccine))
                .patient(userRepository.findById(reqAppointment.getPatientId()).get())
                .center(centerRepository.findById(reqAppointment.getCenterId()).get())
                .appointmentDate(reqAppointment.getAppointmentDate())
                .appointmentTime(reqAppointment.getAppointmentTime())
                .status(Status.PENDING).build();
        appointmentRepository.save(appointment);

        Payment payment = Payment.builder()
                .appointment(appointment)
                .paymentDate(LocalDate.now())
                .amount(vaccine.getPrice())
                .paymentMethod(Payment.PaymentMethod.CREDIT_CARD)
                .status(Payment.PaymentStatus.PENDING)
                .build();
        Payment newPayment = paymentRepository.save(payment);

        String paymentUrl = vnPayService.createPaymentUrl(Math.round(vaccine.getPrice()),
                String.valueOf(newPayment.getPaymentId()), ipAddress);

        return paymentUrl;
    }

    @Transactional
    public String updatePaymentStatus(int paymentId, String vnpResponse) {
        Payment payment = paymentRepository.findById((long)paymentId).get();
    
        if (vnpResponse.equals("00")) {
            payment.setStatus(Payment.PaymentStatus.COMPLETED);
            payment.setPaymentDate(LocalDate.now());
        } else {
            payment.setStatus(Payment.PaymentStatus.FAILED);
            payment.setPaymentDate(LocalDate.now());
        }
        paymentRepository.save(payment);
        return "Payment status updated";
    }

    public Pagination getAllAppointments(Specification<Appointment> specification, Pageable pageable) {

        Page<Appointment> pageAppointment = appointmentRepository.findAll(specification, pageable);
        Pagination pagination = new Pagination();
        Pagination.Meta meta = new Pagination.Meta();

        meta.setPage(pageable.getPageNumber() + 1);
        meta.setPageSize(pageable.getPageSize());

        meta.setPages(pageAppointment.getTotalPages());
        meta.setTotal(pageAppointment.getTotalElements());

        pagination.setMeta(meta);

        List<ResAppointment> listAppointments = pageAppointment.getContent()
                .stream().map(this::convertToReqAppointment)
                .collect(Collectors.toList());

        pagination.setResult(listAppointments);

        return pagination;
    }

    public Pagination getAllAppointmentsOfUser(Specification<Appointment> specification, Pageable pageable) {
        Page<Appointment> pageAppointment = appointmentRepository.findAll(specification, pageable);
        Pagination pagination = new Pagination();
        Pagination.Meta meta = new Pagination.Meta();

        meta.setPage(pageable.getPageNumber() + 1);
        meta.setPageSize(pageable.getPageSize());

        meta.setPages(pageAppointment.getTotalPages());
        meta.setTotal(pageAppointment.getTotalElements());

        pagination.setMeta(meta);

        List<ResAppointment> listAppointments = pageAppointment.getContent()
                .stream().map(this::convertToReqAppointment)
                .collect(Collectors.toList());

        pagination.setResult(listAppointments);

        return pagination;
    }

    public ResAppointment updateAppointmentOfCashier(String id, ReqAppointment reqAppointment) {
        String email = SecurityUtil.getCurrentUserLogin().isPresent()
                ? SecurityUtil.getCurrentUserLogin().get()
                : "";
        User cashier = userRepository.findByEmail(email);
        User doctor = userRepository.findById(reqAppointment.getDoctorId()).get();
        Appointment appointment = appointmentRepository.findById(Long.parseLong(id)).get();
        appointment.setCashier(cashier);
        appointment.setDoctor(doctor);
        appointment.setStatus(Status.PROCESSING);
        this.appointmentRepository.save(appointment);
        return convertToReqAppointment(appointment);
    }

    public ResAppointment cancelAppointment(String id) {
        Appointment appointment = appointmentRepository.findById(Long.parseLong(id)).get();
        appointment.setStatus(Status.CANCELLED);
        Payment payment = this.paymentRepository.findByAppointment(appointment);
        payment.setStatus(Payment.PaymentStatus.FAILED);
        payment.setPaymentDate(LocalDate.now());
        this.paymentRepository.save(payment);
        this.appointmentRepository.save(appointment);
        return convertToReqAppointment(appointment);
    }

    public ResAppointment completeAppointment(String id) {
        Appointment appointment = appointmentRepository.findById(Long.parseLong(id)).get();
        appointment.setStatus(Status.COMPLETED);
        Payment payment = this.paymentRepository.findByAppointment(appointment);
        if (payment.getPaymentMethod().equals(Payment.PaymentMethod.CASH)) {
            payment.setStatus(Payment.PaymentStatus.COMPLETED);
            payment.setPaymentDate(LocalDate.now());
        }
        this.paymentRepository.save(payment);
        this.appointmentRepository.save(appointment);
        return convertToReqAppointment(appointment);
    }

    
}
