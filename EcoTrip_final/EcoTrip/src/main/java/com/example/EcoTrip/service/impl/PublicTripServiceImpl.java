package com.example.EcoTrip.service.impl;

import com.example.EcoTrip.model.PublicTrip;
import com.example.EcoTrip.repository.PublicTripRepository;
import com.example.EcoTrip.security.JwtUtil;
import com.example.EcoTrip.service.PublicTripService;
import org.springframework.stereotype.Service;

@Service
public class PublicTripServiceImpl implements PublicTripService {

    private final PublicTripRepository repository;
    private final JwtUtil jwtUtil;

    public PublicTripServiceImpl(
            PublicTripRepository repository,
            JwtUtil jwtUtil
    ) {
        this.repository = repository;
        this.jwtUtil = jwtUtil;
    }

    @Override
    public PublicTrip createPublicTrip(PublicTrip trip, String token) {

        String userId = jwtUtil.extractUserId(token);
        trip.setUserId(userId);

        double fuelUsed = (trip.getDistanceKm() / 100)
                * trip.getFuelConsumptionPer100Km();
        double fuelCost = fuelUsed * trip.getFuelPricePerLitre();

        double tyreUsage = (trip.getDistanceKm() / 20000)
                * trip.getEstimatedTyreCost();
        double serviceUsage = (trip.getDistanceKm() / 10000)
                * trip.getEstimatedServiceCost();

        double totalCost = fuelCost + tyreUsage + serviceUsage;
        double perPassenger = totalCost / trip.getPassengers();
        double co2 = trip.getDistanceKm() * 0.18;

        trip.setTotalCost(totalCost);
        trip.setCostPerPassenger(perPassenger);
        trip.setCo2Emission(co2);

        return repository.save(trip);
    }

    @Override
    public Object getUserPublicTrips(String token) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getUserPublicTrips'");
    }
}
