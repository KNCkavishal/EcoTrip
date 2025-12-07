package com.example.EcoTrip.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Document(collection = "vehicles")
public class Vehicle {
    @Id
    private String id;
    private String userId;          // auto-filled from JWT
    private String numberPlate;     // essential
    private String vehicleType;     // car, bus, etc.
    private Double fuelEfficiency;  // optional
    private Double co2PerKm;        // optional
}
