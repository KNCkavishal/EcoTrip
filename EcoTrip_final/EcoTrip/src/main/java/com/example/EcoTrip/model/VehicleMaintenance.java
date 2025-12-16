package com.example.EcoTrip.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;

@Document(collection = "vehicle_maintenance")
public class VehicleMaintenance {

    @Id
    private String id;

    private String userId;
    private String vehicleId;
    private String vehicleType;

    private double serviceCost;
    private double tyreCost;
    private double otherCost;

    private double totalCost;
    private LocalDate date;

    public VehicleMaintenance() {}

public VehicleMaintenance(String userId, String vehicleId, String vehicleType,
                              double serviceCost, double tyreCost, double otherCost,
                              double totalCost, LocalDate date) {
        this.userId = userId;
        this.vehicleId = vehicleId;
        this.vehicleType = vehicleType;
        this.serviceCost = serviceCost;
        this.tyreCost = tyreCost;
        this.otherCost = otherCost;
        this.totalCost = totalCost;
        this.date = date;
    }

    public Object getTotal() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getTotal'");
    }

    // getters & setters
    public double getTotalCost() {
    return totalCost;
}

}
