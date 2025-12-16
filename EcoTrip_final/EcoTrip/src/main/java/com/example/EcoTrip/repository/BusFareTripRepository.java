package com.example.EcoTrip.repository;

import com.example.EcoTrip.model.BusFareTrip;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface BusFareTripRepository extends MongoRepository<BusFareTrip, String> {
}
