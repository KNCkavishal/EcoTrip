package com.example.EcoTrip.service;

import com.example.EcoTrip.dto.VehicleRequest;
import com.example.EcoTrip.model.Vehicle;

import java.util.List;

public interface VehicleService {

    Vehicle registerVehicle(VehicleRequest request, String userId);

    List<Vehicle> getUserVehicles(String userId);
}
