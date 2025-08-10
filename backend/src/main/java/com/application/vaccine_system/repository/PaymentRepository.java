package com.application.vaccine_system.repository;

import com.application.vaccine_system.model.Appointment;
import com.application.vaccine_system.model.Payment;
import org.springframework.data.jpa.repository.JpaRepository;


public interface PaymentRepository extends JpaRepository<Payment, Long> {
    Payment findByAppointment(Appointment appointment);
}
