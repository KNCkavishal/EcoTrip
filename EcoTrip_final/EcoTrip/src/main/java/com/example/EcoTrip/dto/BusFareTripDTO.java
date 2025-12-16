package com.example.EcoTrip.dto;

import java.time.LocalDate;

public class BusFareTripDTO {

    private String route;
    private Double busFare;
    private LocalDate date;

    public String getRoute() {
        return route;
    }

    public void setRoute(String route) {
        this.route = route;
    }

    public Double getBusFare() {
        return busFare;
    }

    public void setBusFare(Double busFare) {
        this.busFare = busFare;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }
}
