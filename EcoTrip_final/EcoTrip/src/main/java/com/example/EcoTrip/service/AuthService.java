package com.example.EcoTrip.service;

import com.example.EcoTrip.dto.SignupRequest;
import com.example.EcoTrip.dto.LoginRequest;

public interface AuthService {
    String signup(SignupRequest request);
    String login(LoginRequest request);
}
