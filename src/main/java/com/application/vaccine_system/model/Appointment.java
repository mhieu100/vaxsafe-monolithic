package com.application.vaccine_system.model;

import java.time.LocalDate;
import java.time.LocalTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@Entity
@Table(name = "appointments")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Appointment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long appointmentId;
    @ManyToOne
    @JoinColumn(name = "vaccine_id")
    Vaccine vaccine;
    @ManyToOne
    @JoinColumn(name = "patient_id")
    User patient;
    @ManyToOne
    @JoinColumn(name = "doctor_id")
    User doctor;
    @ManyToOne
    @JoinColumn(name = "cashier_id")
    User cashier;
    @ManyToOne
    @JoinColumn(name = "center_id")
    Center center;
    LocalDate appointmentDate;
    LocalTime appointmentTime;
    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    Status status;

    public enum Status {
        PENDING,
        CANCELLED,
        PROCESSING,
        COMPLETED
    }
}
