package com.application.vaccine_system.model.request;

import java.time.LocalDate;
import java.time.LocalTime;

import com.application.vaccine_system.model.Appointment;

import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ReqAppointment {
    @NotNull(message = "Vaccine ID cannot be null")
    @Positive(message = "Vaccine ID must be a positive number")
    Long vaccineId;

    @NotNull(message = "Patient ID cannot be null")
    @Positive(message = "Patient ID must be a positive number")
    Long patientId;

    @NotNull(message = "Center ID cannot be null")
    @Positive(message = "Center ID must be a positive number")
    Long centerId;
    Long doctorId;
    Long cashierId;
    @NotNull(message = "Appointment date cannot be null")
    @FutureOrPresent(message = "Appointment date must be in the present or future")
    LocalDate appointmentDate;

    @NotNull(message = "Appointment time cannot be null")
    LocalTime appointmentTime;

    Appointment.Status status;
}
