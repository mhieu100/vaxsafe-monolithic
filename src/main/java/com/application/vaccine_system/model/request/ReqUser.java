package com.application.vaccine_system.model.request;

import java.time.LocalDate;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class ReqUser {
    @NotBlank(message = "Full name không được trống")
    private String fullname;
    String phoneNumber;
    LocalDate birthday;
    String address;
}