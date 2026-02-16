package com.ecotrip.ecotrip_backend.service.impl;

import com.ecotrip.ecotrip_backend.model.Vehicle;
import com.ecotrip.ecotrip_backend.repository.VehicleRepository;
import org.springframework.stereotype.Service;

@Service
public class VehicleServiceImpl {

    private final VehicleRepository repo;

    public VehicleServiceImpl(VehicleRepository repo) {
        this.repo = repo;
    }

    public Vehicle registerVehicle(Vehicle vehicle) {
        return repo.save(vehicle);
    }
    public Vehicle getVehicleById(String id) {
    return repo.findById(id).orElse(null);
}

}