package com.application.vaccine_system.controller;

import com.application.vaccine_system.model.response.ResAppointmentDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.application.vaccine_system.model.request.ReqAppointmentDTO;
import com.application.vaccine_system.service.AppointmentService;

@RestController
public class AppointmentController {
    private final AppointmentService appointmentService;

    public AppointmentController(AppointmentService appointmentService) {
        this.appointmentService = appointmentService;
    }

    @PostMapping("/order")
    public ResponseEntity<ResAppointmentDTO> order(@RequestBody ReqAppointmentDTO req) {
        ResAppointmentDTO newAppointment = appointmentService.createAppointment(req);
        return ResponseEntity.ok().body(newAppointment);
    }
}
