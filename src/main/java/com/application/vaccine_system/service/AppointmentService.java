package com.application.vaccine_system.service;

import org.springframework.stereotype.Service;

import com.application.vaccine_system.model.Appointment;
import com.application.vaccine_system.model.Doctor;
import com.application.vaccine_system.model.Patient;
import com.application.vaccine_system.model.User;
import com.application.vaccine_system.model.request.ReqAppointmentDTO;
import com.application.vaccine_system.model.response.DoctorDTO;
import com.application.vaccine_system.model.response.ResAppointmentDTO;
import com.application.vaccine_system.repository.AppointmentRepository;
import com.application.vaccine_system.repository.PatientRepository;
import com.application.vaccine_system.repository.UserRepository;
import com.application.vaccine_system.repository.VaccinationCenterRepository;
import com.application.vaccine_system.repository.VaccineRepository;

@Service
public class AppointmentService {
    private final AppointmentRepository appointmentRepository;
    private final VaccineRepository vaccineRepository;
    private final UserRepository userRepository;
    private final PatientRepository patientRepository;
    private final VaccinationCenterRepository vaccinationCenterRepository;
    private final VaccinationCenterService vaccinationCenterService;

    public AppointmentService(AppointmentRepository appointmentRepository, VaccineRepository vaccineRepository,
            UserRepository userRepository, PatientRepository patientRepository,
            VaccinationCenterRepository vaccinationCenterRepository,
            VaccinationCenterService vaccinationCenterService) {
        this.appointmentRepository = appointmentRepository;
        this.vaccineRepository = vaccineRepository;
        this.userRepository = userRepository;
        this.patientRepository = patientRepository;
        this.vaccinationCenterRepository = vaccinationCenterRepository;
        this.vaccinationCenterService = vaccinationCenterService;
    }

    public DoctorDTO convertToDoctorDTO(Doctor doctor) {
        return DoctorDTO.builder()
                .doctorId(doctor.getDoctorId())
                .user(DoctorDTO.UserDoctor.builder()
                        .userId(doctor.getUser().getUserId())
                        .fullName(doctor.getUser().getFullName())
                        .email(doctor.getUser().getEmail())
                        .phoneNumber(doctor.getUser().getPhoneNumber())
                        .role(doctor.getUser().getRole())
                        .dateOfBirth(doctor.getUser().getDateOfBirth())
                        .address(doctor.getUser().getAddress()).build())
                .specialization(doctor.getSpecialization())
                .workingHours(doctor.getWorkingHours()).build();
    }

    public ResAppointmentDTO convertToAppointmentDTO(Appointment appointment) {
        return ResAppointmentDTO.builder()
                .appointId(appointment.getAppointId())
                .vaccine(appointment.getVaccine())
                .patient(appointment.getPatient())
                .center(vaccinationCenterService.convertToCenterDTO(appointment.getCenter()))
                .doctor(appointment.getDoctor() != null ? convertToDoctorDTO(appointment.getDoctor()) : null)
                .appointmentDate(appointment.getAppointmentDate())
                .appointmentTime(appointment.getAppointmentTime())
                .status(appointment.getStatus()).build();
    }

    public ResAppointmentDTO createAppointment(ReqAppointmentDTO req) {
        Appointment appointment = Appointment.builder()
                .vaccine(vaccineRepository.findById(req.getVaccineId()).get())
                .patient(patientRepository.findById(req.getPatientId()).get())
                .center(vaccinationCenterRepository.findById(req.getCenterId()).get())
                .doctor(req.getDoctorId() != null ? userRepository.findById(req.getDoctorId()).get().getDoctor() : null)
                .appointmentDate(req.getAppointmentDate())
                .appointmentTime(req.getAppointmentTime())
                .status(req.getStatus()).build();
        return convertToAppointmentDTO(appointmentRepository.save(appointment));
    }
}
