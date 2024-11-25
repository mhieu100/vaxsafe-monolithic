package com.application.vaccine_system.model.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class ReqLoginDTO {
    @NotBlank(message = "username not empty")
    private String username;
    @NotBlank(message = "password not empty")
    private String password;
}