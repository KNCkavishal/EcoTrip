package com.example.EcoTrip.repository;

import com.example.EcoTrip.model.Auth;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.Optional;

public interface AuthRepository extends MongoRepository<Auth, String> {
    Optional<Auth> findByUserId(String userId);
}
