package com.ecotrip.ecotrip_backend.service;

import com.ecotrip.ecotrip_backend.model.User;

public interface UserService {
    User signup(User user);
    boolean checkPassword(String rawPassword, String encodedPassword);
}
