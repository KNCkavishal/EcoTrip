package com.ecotrip.ecotrip_backend.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Data
@Document(collection = "public_vehicle_calcs")
public class PublicVehicleCalc {

    @Id
    private String id;

    private String vehicleNumber;

    private double estimatedDistancePerTrip;
    private int tripsPerDay;

    private String fuelType;
    private double fuelPricePerLitre;
    private double expectedFuelEconomy;

    private double tyrePrice;
    private double servicePrice;

    private double driverSalary;
    private double helperSalary;
    private double ownerProfitPercentage;

    private double tyreCostPerKm;
    private double serviceCostPerKm;
    private double totalTripCost;

    private double co2Emission;

    // ✅ MUST be java.util.Date
    private Date tripDate;
}
