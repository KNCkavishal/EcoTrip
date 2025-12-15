package com.example.EcoTrip.dto;

import lombok.Data;

@Data
public class VehicleRequest {

    private String number;
    private String province;
    private Integer yearMake;
    private Integer yearRegister;
    private String vehicleType;
    private Double fuelEfficiency;
    private Double co2PerKm;
}
