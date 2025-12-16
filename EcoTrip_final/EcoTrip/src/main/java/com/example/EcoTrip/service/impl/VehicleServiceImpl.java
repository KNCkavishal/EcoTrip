package com.example.EcoTrip.service.impl;

import com.example.EcoTrip.dto.VehicleRequest;
import com.example.EcoTrip.model.Vehicle;
import com.example.EcoTrip.repository.VehicleRepository;
import com.example.EcoTrip.service.VehicleService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VehicleServiceImpl implements VehicleService {

    private final VehicleRepository vehicleRepository;

    public VehicleServiceImpl(VehicleRepository vehicleRepository) {
        this.vehicleRepository = vehicleRepository;
    }

    @SuppressWarnings("null")
    @Override
    public Vehicle registerVehicle(VehicleRequest request, String userId) {

        Vehicle vehicle = Vehicle.builder()
                .userId(userId)
                .number(request.getNumber())
                .province(request.getProvince())
                .yearMake(request.getYearMake())
                .yearRegister(request.getYearRegister())
                .vehicleType(request.getVehicleType())
                .fuelEfficiency(request.getFuelEfficiency())
                .co2PerKm(request.getCo2PerKm())
                .build();

        return vehicleRepository.save(vehicle);
    }

    @Override
    public List<Vehicle> getUserVehicles(String userId) {
        return vehicleRepository.findByUserId(userId);
    }
}
