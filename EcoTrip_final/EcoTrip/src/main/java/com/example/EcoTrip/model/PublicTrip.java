package com.example.EcoTrip.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "public_trips")
public class PublicTrip {

    @Id
    private String id;

    private String userId;

    private double distanceKm;
    private double fuelPricePerLitre;
    private double fuelConsumptionPer100Km;
    private double estimatedTyreCost;
    private double estimatedServiceCost;
    private int passengers;

    private double totalCost;
    private double costPerPassenger;
    private double co2Emission;
}
