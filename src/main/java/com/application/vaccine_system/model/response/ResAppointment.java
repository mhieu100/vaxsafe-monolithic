package com.application.vaccine_system.model.response;

import java.time.LocalDate;
import java.time.LocalTime;

import com.application.vaccine_system.model.Appointment.Status;

import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ResAppointment {
    Long appointmentId;
    String vaccineName;
    String patientName;
    String centerName;
    String doctorName;
    String cashierName;
    LocalDate appointmentDate;
    LocalTime appointmentTime;
    Status status;
}
