// src/main/java/com/example/EcoTrip/dto/LoginRequest.java
package com.example.EcoTrip.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class LoginRequest {
    @NotBlank
    private String email;

    @NotBlank
    private String password;
}
