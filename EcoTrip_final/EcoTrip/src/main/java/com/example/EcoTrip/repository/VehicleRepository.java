package com.example.EcoTrip.repository;

import com.example.EcoTrip.model.Vehicle;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface VehicleRepository extends MongoRepository<Vehicle, String> {
    List<Vehicle> findByUserId(String userId);
}
