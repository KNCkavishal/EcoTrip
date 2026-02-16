package com.ecotrip.ecotrip_backend.repository;

import com.ecotrip.ecotrip_backend.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<User, String> {
    boolean existsByEmail(String email);
    User findByEmail(String email);
}
