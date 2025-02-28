package com.application.vaccine_system.controller;

import lombok.RequiredArgsConstructor;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.application.vaccine_system.annotation.ApiMessage;
import com.application.vaccine_system.config.security.SecurityUtil;
import com.application.vaccine_system.model.Appointment;
import com.application.vaccine_system.model.request.ReqAppointment;
import com.application.vaccine_system.model.response.Pagination;
import com.application.vaccine_system.model.response.ResAppointment;
import com.application.vaccine_system.service.AppointmentService;
import com.application.vaccine_system.service.UserService;
import com.turkraft.springfilter.boot.Filter;

import java.io.UnsupportedEncodingException;

@RestController
@RequestMapping("/appointments")
@RequiredArgsConstructor
public class AppointmentController {
        private final AppointmentService appointmentService;
        private final UserService userService;

        @PostMapping
        @ApiMessage("Create a appointments")
        public ResponseEntity<ResAppointment> createAppointment(@RequestBody ReqAppointment reqAppointment,
                        @RequestParam("payment_method") String paymentMethod) throws UnsupportedEncodingException {
                return ResponseEntity.ok().body(appointmentService.createAppointment(reqAppointment, paymentMethod));
        }

        @GetMapping
        @ApiMessage("Get all appointments of center")
        public ResponseEntity<Pagination> getAllAppointmentsOfCenter(@Filter Specification<Appointment> specification,
                        Pageable pageable) {

                String email = SecurityUtil.getCurrentUserLogin().isPresent()
                                ? SecurityUtil.getCurrentUserLogin().get()
                                : "";
                String centerName = this.userService.getUserByEmail(email).getCenter().getName();

                specification = Specification.where(specification).and((root, query, criteriaBuilder) -> criteriaBuilder
                                .equal(root.get("center").get("name"), centerName));

                return ResponseEntity.ok().body(appointmentService.getAllAppointments(specification, pageable));
        }

        @GetMapping("/my-schedule")
        @ApiMessage("Get all appointments of doctor")
        public ResponseEntity<Pagination> getAllAppointmentsOfDoctor(@Filter Specification<Appointment> specification,
                        Pageable pageable) {
                String email = SecurityUtil.getCurrentUserLogin().isPresent()
                                ? SecurityUtil.getCurrentUserLogin().get()
                                : "";

                String docterName = this.userService.getUserByEmail(email).getFullname();

                specification = Specification.where(specification).and((root, query, criteriaBuilder) -> criteriaBuilder
                                .equal(root.get("doctor").get("fullname"), docterName));

                return ResponseEntity.ok().body(appointmentService.getAllAppointments(specification, pageable));
        }

        @PutMapping("/{id}")
        @ApiMessage("Update a appointment of cashier")
        public ResponseEntity<ResAppointment> updateAppointmentOfCashier(@PathVariable String id,
                        @RequestBody ReqAppointment reqAppointment) {
                return ResponseEntity.ok().body(appointmentService.updateAppointmentOfCashier(id, reqAppointment));
        }

        @PutMapping("/{id}/cancel")
        @ApiMessage("Cancel a appointment")
        public ResponseEntity<ResAppointment> cancelAppointment(@PathVariable String id) {
                return ResponseEntity.ok().body(appointmentService.cancelAppointment(id));
        }

        @PutMapping("/{id}/complete")
        @ApiMessage("Complete a appointment")
        public ResponseEntity<ResAppointment> completeAppointment(@PathVariable String id) {
                return ResponseEntity.ok().body(appointmentService.completeAppointment(id));
        }
}
