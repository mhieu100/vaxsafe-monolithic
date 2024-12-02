package com.application.vaccine_system.model.response;

import java.time.LocalDate;
import java.time.LocalTime;

import com.application.vaccine_system.model.Appointment;
import com.application.vaccine_system.model.Vaccine;

import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;
import lombok.Builder;

@Data
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ResAppointmentDTO {
    Long appointId;
    Vaccine vaccine;
    PatientDTO patient;
    CenterDTO center;
    DoctorDTO doctor;
    LocalDate appointmentDate;
    LocalTime appointmentTime;
    Appointment.Status status;
}
