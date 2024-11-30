package com.application.vaccine_system.service;

import org.springframework.stereotype.Service;

import com.application.vaccine_system.model.Appointment;
import com.application.vaccine_system.model.request.ReqAppointmentDTO;
import com.application.vaccine_system.model.response.ResAppointmentDTO;
import com.application.vaccine_system.repository.AppointmentRepository;
import com.application.vaccine_system.repository.UserRepository;
import com.application.vaccine_system.repository.VaccinationCenterRepository;
import com.application.vaccine_system.repository.VaccineRepository;

@Service
public class AppointmentService {
    private final AppointmentRepository appointmentRepository;
    private final VaccineRepository vaccineRepository;
    private final UserRepository userRepository;
    private final VaccinationCenterRepository vaccinationCenterRepository;
    private final UserService userService;
    private final VaccinationCenterService vaccinationCenterService;

    public AppointmentService(AppointmentRepository appointmentRepository, VaccineRepository vaccineRepository,
            UserRepository userRepository, VaccinationCenterRepository vaccinationCenterRepository,
            UserService userService, VaccinationCenterService vaccinationCenterService) {
        this.appointmentRepository = appointmentRepository;
        this.vaccineRepository = vaccineRepository;
        this.userRepository = userRepository;
        this.vaccinationCenterRepository = vaccinationCenterRepository;
        this.userService = userService;
        this.vaccinationCenterService = vaccinationCenterService;
    }

    public ResAppointmentDTO convertToAppointmentDTO(Appointment appointment) {
        return ResAppointmentDTO.builder()
                .appointId(appointment.getAppointId())
                .vaccine(appointment.getVaccine())
                .user(userService.convertToUserDTO(appointment.getUser()))
                .center(vaccinationCenterService.convertToCenterDTO(appointment.getCenter()))
                .appointmentDate(appointment.getAppointmentDate())
                .appointmentTime(appointment.getAppointmentTime())
                .status(appointment.getStatus()).build();
    }

    public ResAppointmentDTO createAppointment(ReqAppointmentDTO req) {
        Appointment appointment = Appointment.builder()
                .vaccine(vaccineRepository.findById(req.getVaccineId()).get())
                .user(userRepository.findById(req.getUserId()).get())
                .center(vaccinationCenterRepository.findById(req.getCenterId()).get())
                .appointmentDate(req.getAppointmentDate())
                .appointmentTime(req.getAppointmentTime())
                .status(req.getStatus()).build();
        return convertToAppointmentDTO(appointmentRepository.save(appointment));
    }
}
