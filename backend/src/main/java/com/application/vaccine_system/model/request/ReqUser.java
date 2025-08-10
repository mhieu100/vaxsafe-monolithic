package com.application.vaccine_system.model.request;

import java.time.LocalDate;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class ReqUser {
    @NotBlank(message = "Full name không được trống")
    String fullname;
    String email;
    String password;
    String phoneNumber;
    LocalDate birthday;
    String address;
    String roleName;
    String centerName;
}