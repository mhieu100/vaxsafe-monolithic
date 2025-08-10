package com.application.vaccine_system.repository;

import org.springframework.boot.autoconfigure.data.web.SpringDataWebProperties.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.application.vaccine_system.model.Appointment;
import com.application.vaccine_system.model.response.Pagination;


public interface AppointmentRepository extends JpaRepository<Appointment, Long>, JpaSpecificationExecutor<Appointment> {
    // Pagination getAllAppointmentsOfCenter(Specification<Appointment> specification, Pageable pageable, Long centerId);
}
