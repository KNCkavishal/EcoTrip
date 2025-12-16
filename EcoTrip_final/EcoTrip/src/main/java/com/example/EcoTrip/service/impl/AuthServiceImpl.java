// src/main/java/com/example/EcoTrip/service/impl/AuthServiceImpl.java
package com.example.EcoTrip.service.impl;

import com.example.EcoTrip.dto.LoginRequest;
import com.example.EcoTrip.dto.SignupRequest;
import com.example.EcoTrip.model.Auth;
import com.example.EcoTrip.model.User;
import com.example.EcoTrip.repository.AuthRepository;
import com.example.EcoTrip.repository.UserRepository;
import com.example.EcoTrip.security.JwtUtil;
import com.example.EcoTrip.service.AuthService;
import com.example.EcoTrip.service.EmailService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.regex.Pattern;

@Service
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final AuthRepository authRepository;
    private final EmailService emailService;
    private final JwtUtil jwtUtil;
    private final BCryptPasswordEncoder passwordEncoder;

    private static final Pattern EMAIL_REGEX = Pattern.compile(
        "^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,64}$",
        Pattern.CASE_INSENSITIVE
    );

    public AuthServiceImpl(UserRepository userRepository,
                           AuthRepository authRepository,
                           EmailService emailService,
                           JwtUtil jwtUtil,
                           BCryptPasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.authRepository = authRepository;
        this.emailService = emailService;
        this.jwtUtil = jwtUtil;
        this.passwordEncoder = passwordEncoder;
    }

    @SuppressWarnings("null")
    @Override
    public String signup(SignupRequest request) {
        if (!StringUtils.hasText(request.getEmail()) || !EMAIL_REGEX.matcher(request.getEmail()).matches()) {
            throw new IllegalArgumentException("Invalid email format");
        }
        if (!StringUtils.hasText(request.getPassword()) || request.getPassword().length() < 6) {
            throw new IllegalArgumentException("Password must be at least 6 characters long");
        }
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new IllegalArgumentException("Email already registered");
        }

        User user = User.builder()
                .username(request.getUsername())
                .email(request.getEmail())
                .role("USER")
                .build();
        user = userRepository.save(user);

        Auth auth = Auth.builder()
                .userId(user.getId())
                .passwordHash(passwordEncoder.encode(request.getPassword()))
                .build();
        authRepository.save(auth);

        try {
            emailService.sendEmail(
                    user.getEmail(),
                    "Welcome to EcoTrip",
                    "Your account has been created!"
            );
        } catch (Exception e) {
            // non-fatal; log and continue
        }

        return "User registered successfully";
    }

    @Override
    public String login(LoginRequest request) {
        if (!StringUtils.hasText(request.getEmail()) || !EMAIL_REGEX.matcher(request.getEmail()).matches()) {
            throw new IllegalArgumentException("Invalid email format");
        }
        if (!StringUtils.hasText(request.getPassword())) {
            throw new IllegalArgumentException("Password cannot be empty");
        }

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("Email not found"));

        Auth auth = authRepository.findByUserId(user.getId())
                .orElseThrow(() -> new IllegalArgumentException("Authentication info missing"));

        if (!passwordEncoder.matches(request.getPassword(), auth.getPasswordHash())) {
            throw new IllegalArgumentException("Invalid password");
        }

        return jwtUtil.generateToken(user.getId());
    }
}