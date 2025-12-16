package com.example.EcoTrip.service;

import com.example.EcoTrip.model.PublicTrip;

public interface PublicTripService {
    PublicTrip createPublicTrip(PublicTrip trip, String token);

    Object getUserPublicTrips(String token);
}
