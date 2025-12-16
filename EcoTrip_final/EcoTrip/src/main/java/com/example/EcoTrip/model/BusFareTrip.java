package com.example.EcoTrip.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;

@Document(collection = "bus_fare_trips")
public class BusFareTrip {

    @Id
    private String id;

    @SuppressWarnings("unused")
    private String route;
    @SuppressWarnings("unused")
    private Double busFare;
    @SuppressWarnings("unused")
    private LocalDate date;

    public BusFareTrip() {}

    public BusFareTrip(String route, Double busFare, LocalDate date) {
        this.route = route;
        this.busFare = busFare;
        this.date = date;
    }

    // getters & setters
}
