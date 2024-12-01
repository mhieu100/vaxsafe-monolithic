package com.application.vaccine_system.model.request;

import java.time.LocalDate;
import java.time.LocalTime;

import com.application.vaccine_system.model.Appointment;

import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ReqAppointmentDTO {
    Long vaccineId;
    Long patientId;
    Long centerId;
    Long doctorId;
    LocalDate appointmentDate;
    LocalTime appointmentTime;
    Appointment.Status status;
}
