package com.example.EcoTrip.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "family_trips")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FamilyTrip {

    @Id
    private String id;

    private String userId;

    private double distanceKm;
    private double fuelCostPerKm;
    private double serviceCost;
    private double tyreCost;
    private double co2PerKm;

    private double fuelCost;
    private double totalCost;
    private double co2Emission;
}
