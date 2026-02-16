package com.ecotrip.ecotrip_backend.repository;

import com.ecotrip.ecotrip_backend.model.Maintenance;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MaintenanceRepository extends MongoRepository<Maintenance, String> {
}