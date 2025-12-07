package com.example.EcoTrip.dto;

import lombok.Data;

@Data
public class VehicleRequest {
    private String numberPlate;
    private String vehicleType;
    private Double fuelEfficiency;
    private Double co2PerKm;
}
