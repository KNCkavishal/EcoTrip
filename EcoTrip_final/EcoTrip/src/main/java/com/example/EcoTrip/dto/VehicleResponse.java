package com.example.EcoTrip.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class VehicleResponse {
    private String id;
    private String registrationNumber;
    private String model;
    private String type;
    private double fuelEfficiency;
    private double serviceCost;
    private double tyreCost;
    private double co2PerKm;
}
