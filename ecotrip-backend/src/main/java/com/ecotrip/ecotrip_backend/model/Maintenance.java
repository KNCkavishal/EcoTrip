package com.ecotrip.ecotrip_backend.model;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "maintenance")
public class Maintenance {

    @Id
    private String id;

    @NotBlank
    private String vehicleNumber; // Vehicle associated

    @NotNull
    private Integer kmSinceLastService; // Usage since last service

    @NotNull
    private Double serviceCost;

    @NotNull
    private Double partsCost;

    @NotNull
    private Double tyreCost;

    @NotNull
    private Double laborCost;

    private Integer nextServiceKm; // calculated automatically

    private Double costPerKm; // calculated automatically
}