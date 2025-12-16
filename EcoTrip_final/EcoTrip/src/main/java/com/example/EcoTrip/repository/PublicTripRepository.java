package com.example.EcoTrip.repository;

import com.example.EcoTrip.model.PublicTrip;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface PublicTripRepository extends MongoRepository<PublicTrip, String> {
}
