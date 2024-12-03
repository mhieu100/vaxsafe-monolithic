package com.application.vaccine_system.service;

import com.application.vaccine_system.model.Patient;
import com.application.vaccine_system.model.Vaccine;
import com.application.vaccine_system.model.Appointment.Status;
import com.application.vaccine_system.model.response.PatientDTO;
import com.application.vaccine_system.repository.*;
import org.springframework.stereotype.Service;

import com.application.vaccine_system.model.Appointment;
import com.application.vaccine_system.model.Doctor;
import com.application.vaccine_system.model.request.ReqAppointmentDTO;
import com.application.vaccine_system.model.response.DoctorDTO;
import com.application.vaccine_system.model.response.ResAppointmentDTO;

@Service
public class AppointmentService {
    private final AppointmentRepository appointmentRepository;
    private final VaccineRepository vaccineRepository;
    private final PatientRepository patientRepository;
    private final VaccinationCenterRepository vaccinationCenterRepository;
    private final VaccinationCenterService vaccinationCenterService;
    private final DoctorRepository doctorRepository;
    private final UserRepository userRepository;

    public AppointmentService(AppointmentRepository appointmentRepository, VaccineRepository vaccineRepository,
            PatientRepository patientRepository,

            VaccinationCenterRepository vaccinationCenterRepository,
            VaccinationCenterService vaccinationCenterService, DoctorRepository doctorRepository,
            UserRepository userRepository) {
        this.appointmentRepository = appointmentRepository;
        this.vaccineRepository = vaccineRepository;
        this.patientRepository = patientRepository;
        this.vaccinationCenterRepository = vaccinationCenterRepository;
        this.vaccinationCenterService = vaccinationCenterService;
        this.doctorRepository = doctorRepository;
        this.userRepository = userRepository;
    }

    public DoctorDTO convertToDoctorDTO(Doctor doctor) {
        return DoctorDTO.builder()
                .doctorId(doctor.getDoctorId())
                .user(DoctorDTO.UserDoctor.builder()
                        .userId(doctor.getUser().getUserId())
                        .fullName(doctor.getUser().getFullName())
                        .build())
                .build();
    }

    public PatientDTO convertToPatientDTO(Patient patient) {
        return PatientDTO.builder()
                .patientId(patient.getPatientId())
                .user(PatientDTO.UserPatient.builder()
                        .userId(patient.getUser().getUserId())
                        .fullName(patient.getUser().getFullName()).build())
                .build();
    }

    public ResAppointmentDTO convertToAppointmentDTO(Appointment appointment) {
        return ResAppointmentDTO.builder()
                .appointId(appointment.getAppointId())
                .vaccine(appointment.getVaccine())
                .patient(convertToPatientDTO(appointment.getPatient()))
                .center(vaccinationCenterService.convertToCenterDTO(appointment.getCenter()))
                .doctor(appointment.getDoctor() != null ? convertToDoctorDTO(appointment.getDoctor()) : null)
                .appointmentDate(appointment.getAppointmentDate())
                .appointmentTime(appointment.getAppointmentTime())
                .status(appointment.getStatus()).build();
    }

    public ResAppointmentDTO createAppointment(ReqAppointmentDTO req) {
        Vaccine vaccine = vaccineRepository.findById(req.getVaccineId()).get();
        vaccine.setStockQuantity(vaccine.getStockQuantity() - 1);
        
        Appointment appointment = Appointment.builder()
                .vaccine(vaccineRepository.save(vaccine))
                .patient(userRepository.findById(req.getPatientId()).get().getPatient())
                .center(vaccinationCenterRepository.findById(req.getCenterId()).get())
                .doctor(req.getDoctorId() != null ? doctorRepository.findById(req.getDoctorId()).get() : null)
                .appointmentDate(req.getAppointmentDate())
                .appointmentTime(req.getAppointmentTime())
                .status(Status.PENDING).build();
        return convertToAppointmentDTO(appointmentRepository.save(appointment));
    }
}
