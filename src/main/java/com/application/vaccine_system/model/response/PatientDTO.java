package com.application.vaccine_system.model.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;
import lombok.experimental.FieldDefaults;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Data
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PatientDTO {
    Long patientId;
    UserPatient user;

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    @FieldDefaults(level = AccessLevel.PRIVATE)
    public static class UserPatient {
        Long userId;
        String fullName;
    }
}
