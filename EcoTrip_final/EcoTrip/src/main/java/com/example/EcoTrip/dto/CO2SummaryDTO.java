package com.example.EcoTrip.dto;

public class CO2SummaryDTO {

    private double totalCo2;
    private String suggestion;

    public CO2SummaryDTO(double totalCo2, String suggestion) {
        this.totalCo2 = totalCo2;
        this.suggestion = suggestion;
    }

    public double getTotalCo2() {
        return totalCo2;
    }

    public String getSuggestion() {
        return suggestion;
    }
}
