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

    private String userId;          // from JWT
    private String number;          // vehicle number
    private String province;        // province
    private Integer yearMake;       // year of manufacture
    private Integer yearRegister;   // year of registration
    private String vehicleType;     // Car / Bus

    private Double fuelEfficiency;  // km per litre (optional)
    private Double co2PerKm;        // kg per km (optional)
}
