package com.example.EcoTrip.repository;

import com.example.EcoTrip.model.CO2Emission;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface CO2EmissionRepository extends MongoRepository<CO2Emission, String> {

    List<CO2Emission> findByUserId(String userId);
}
