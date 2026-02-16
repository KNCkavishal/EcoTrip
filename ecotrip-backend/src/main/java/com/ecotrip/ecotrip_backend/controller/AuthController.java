package com.ecotrip.ecotrip_backend.controller;

import com.ecotrip.ecotrip_backend.dto.AuthResponse;
import com.ecotrip.ecotrip_backend.dto.LoginRequest;
import com.ecotrip.ecotrip_backend.model.SignupRequest;
import com.ecotrip.ecotrip_backend.model.User;
import com.ecotrip.ecotrip_backend.service.impl.UserServiceImpl;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000") // Allow CORS for the frontend
public class AuthController {

    private final UserServiceImpl userService;

    public AuthController(UserServiceImpl userService) {
        this.userService = userService;
    }

    // ===== SIGNUP =====
    @PostMapping("/signup")
    public ResponseEntity<?> signup(@Valid @RequestBody SignupRequest request) {
        try {
            User user = userService.register(request);
            String token = userService.generateToken(user);

            return ResponseEntity.ok(
                new AuthResponse(
                    token,
                    user.getEmail(),
                    user.getName(),
                    user.getRole()
                )
            );
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // ===== LOGIN =====
    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest request) {
        try {
            User user = userService.login(
                    request.getEmail(),
                    request.getPassword()
            );

            String token = userService.generateToken(user);

            return ResponseEntity.ok(
                new AuthResponse(
                    token,
                    user.getEmail(),
                    user.getName(),
                    user.getRole()
                )
            );
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
