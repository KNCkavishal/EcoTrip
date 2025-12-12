package com.example.EcoTrip.repository;

import com.example.EcoTrip.model.FamilyTrip;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface FamilyTripRepository extends MongoRepository<FamilyTrip, String> {

}
