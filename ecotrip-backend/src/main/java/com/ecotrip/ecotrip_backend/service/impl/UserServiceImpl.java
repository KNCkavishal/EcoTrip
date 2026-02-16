package com.ecotrip.ecotrip_backend.service.impl;

import com.ecotrip.ecotrip_backend.model.SignupRequest;
import com.ecotrip.ecotrip_backend.model.User;
import com.ecotrip.ecotrip_backend.repository.UserRepository;
import com.ecotrip.ecotrip_backend.security.JwtUtils;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl {

    private final UserRepository userRepository;
    private final JwtUtils jwtUtils;
    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    public UserServiceImpl(UserRepository userRepository, JwtUtils jwtUtils) {
        this.userRepository = userRepository;
        this.jwtUtils = jwtUtils;
    }

    // ===== SIGNUP =====
    public User register(SignupRequest request) throws Exception {

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new Exception("Email already registered");
        }

        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(encoder.encode(request.getPassword()));

        // DEFAULT ROLE
        user.setRole("USER");

        return userRepository.save(user);
    }

    // ===== LOGIN =====
    public User login(String email, String password) throws Exception {

        User user = userRepository.findByEmail(email);

        if (user == null || !encoder.matches(password, user.getPassword())) {
            throw new Exception("Invalid credentials");
        }

        return user;
    }

    // ===== JWT =====
    public String generateToken(User user) {
        return jwtUtils.generateJwtToken(
                user.getEmail(),
                user.getRole()
        );
    }
}
