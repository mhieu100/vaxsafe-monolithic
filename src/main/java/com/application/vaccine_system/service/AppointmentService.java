package com.application.vaccine_system.service;

import com.application.vaccine_system.model.*;
import com.application.vaccine_system.model.Appointment.Status;
import com.application.vaccine_system.model.request.ReqAppointment;
import com.application.vaccine_system.repository.*;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

import java.io.UnsupportedEncodingException;
import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class AppointmentService {
    private final AppointmentRepository appointmentRepository;
    private final VaccineRepository vaccineRepository;
    private final CenterRepository centerRepository;
    private final UserRepository userRepository;
    private final PaymentRepository paymentRepository;

    public String createAppointment(ReqAppointment reqAppointment, String paymentMethod)
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
        if (paymentMethod.equals("CASH")) {
            Payment payment = Payment.builder()
                    .appointment(appointment)
                    .paymentDate(LocalDate.now())
                    .amount(vaccine.getPrice())
                    .paymentMethod(Payment.PaymentMethod.CASH)
                    .status(Payment.PaymentStatus.PENDING)
                    .build();
            paymentRepository.save(payment);
        } else if (paymentMethod.equals("CREDIT_CARD")) {
            Payment payment = Payment.builder()
                    .appointment(appointment)
                    .paymentDate(LocalDate.now())
                    .amount(vaccine.getPrice())
                    .paymentMethod(Payment.PaymentMethod.CREDIT_CARD)
                    .status(Payment.PaymentStatus.COMPLETED)
                    .build();
            paymentRepository.save(payment);
        }
        // PaymentMethod.infoVNPay(vaccine.getPrice());
        return "Đặt lịch thành công";
    }

}
