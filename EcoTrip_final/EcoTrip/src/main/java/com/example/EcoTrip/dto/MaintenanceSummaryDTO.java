package com.example.EcoTrip.dto;

public class MaintenanceSummaryDTO {

    private double totalMaintenanceCost;
    private String recommendation;
public MaintenanceSummaryDTO(double totalMaintenanceCost, String recommendation) {
        this.totalMaintenanceCost = totalMaintenanceCost;
        this.recommendation = recommendation;
    }

    public double getTotalMaintenanceCost() {
        return totalMaintenanceCost;
    }

    public String getRecommendation() {
        return recommendation;
    }
}
