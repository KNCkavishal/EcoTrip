package com.ecotrip.ecotrip_backend.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Data
@Document(collection = "private_vehicle_calcs")
public class PrivateVehicleCalc {

    @Id
    private String id;

    // ✅ ADD THIS
    private String vehicleNumber;

    private double estimatedDistance;
    private double tyrePrice;
    private double servicePrice;
    private double fuelPricePerLitre;
    private double expectedFuelEconomy;

    private double tyreCostPerKm;
    private double serviceCostPerKm;
    private double totalTripCost;

    private String fuelType;
    private double co2Emission;

    private Date tripDate;
}
