package com.example.EcoTrip.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;

@Document(collection = "co2_emissions")
public class CO2Emission {

    @Id
    private String id;

    private String userId;
    private String vehicleType;   // BUS, CAR, BIKE
    private double distanceKm;
    private double co2Kg;
    private LocalDate date;

    public CO2Emission() {}

    public CO2Emission(String userId, String vehicleType,
                       double distanceKm, double co2Kg, LocalDate date) {
        this.userId = userId;
        this.vehicleType = vehicleType;
        this.distanceKm = distanceKm;
        this.co2Kg = co2Kg;
        this.date = date;
    }

    public Object getCo2() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getCo2'");
    }

    // getters & setters
}
