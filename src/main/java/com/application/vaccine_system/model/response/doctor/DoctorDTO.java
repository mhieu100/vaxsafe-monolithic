package com.application.vaccine_system.model.response.doctor;

import com.application.vaccine_system.model.User;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class DoctorDTO {
    Long doctorId;
    User user;
    String specialization;
    String workingHours;
    CenterDoctor center;

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class CenterDoctor {
        private long centerId;
        private String name;
    }
}
