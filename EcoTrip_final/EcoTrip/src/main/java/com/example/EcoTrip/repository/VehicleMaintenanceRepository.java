package com.example.EcoTrip.repository;

import com.example.EcoTrip.model.VehicleMaintenance;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface VehicleMaintenanceRepository
        extends MongoRepository<VehicleMaintenance, String> {

    List<VehicleMaintenance> findByUserId(String userId);

    List<VehicleMaintenance> findByVehicleId(String vehicleId);
}
