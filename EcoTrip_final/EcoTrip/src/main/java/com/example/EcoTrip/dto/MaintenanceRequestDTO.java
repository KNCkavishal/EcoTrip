package com.example.EcoTrip.dto;

public class MaintenanceRequestDTO {

    private String vehicleId;
    private String vehicleType;
    private double serviceCost;
    private double tyreCost;
    private double otherCost;

    public String getVehicleId() {
        return vehicleId;
    }

    public String getVehicleType() {
        return vehicleType;
    }

    public double getServiceCost() {
        return serviceCost;
    }

    public double getTyreCost() {
        return tyreCost;
    }

    public double getOtherCost() {
        return otherCost;
    }
}
