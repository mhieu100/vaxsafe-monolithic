package com.application.vaccine_system.model.response;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserDTO {
    Long userId;
    String fullName;
    String email;
    String phoneNumber;
    String role;
    LocalDate dateOfBirth;
    String address;
    DoctorUser doctor;
    CashierUser cashier;
    PatientUser patient;

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class DoctorUser {
        private Long doctorId;
        private String specialization;
        private String workingHours;
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class CashierUser {
        private Long cashierId;
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class PatientUser {
        private Long patientId;
        private String medicalHistory;
        private String insuranceNumber;
    }

    // @Data
    // @AllArgsConstructor
    // @NoArgsConstructor
    // public static class CenterDoctor {
    //     private long centerId;
    //     private String name;
    // }

    // @Data
    // @AllArgsConstructor
    // @NoArgsConstructor
    // public static class CenterCashier {
    //     private long centerId;
    //     private String name;
    // }
}
