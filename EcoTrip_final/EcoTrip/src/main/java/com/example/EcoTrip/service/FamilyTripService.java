package com.example.EcoTrip.service;

import com.example.EcoTrip.model.FamilyTrip;
import com.example.EcoTrip.repository.FamilyTripRepository;
import com.example.EcoTrip.security.JwtUtil;
import org.springframework.stereotype.Service;

@Service
public class FamilyTripService {

    private final FamilyTripRepository repo;
    private final JwtUtil jwtUtil;

    public FamilyTripService(FamilyTripRepository repo, JwtUtil jwtUtil) {
        this.repo = repo;
        this.jwtUtil = jwtUtil;
    }

    public FamilyTrip createFamilyTrip(FamilyTrip req, String token) {
        String userId = jwtUtil.extractUserId(token);

        FamilyTrip trip = new FamilyTrip();

        trip.setId(Long.parseLong(userId));
        trip.setVehicleId(req.getVehicleId());
        trip.setDistanceKm(req.getDistanceKm());
        trip.setFuelCost(req.getFuelCost());
        trip.setFuelCost(req.getFuelCost());
        trip.setFuelCost(req.getFuelCost());
        trip.setTotalCost(req.getOtherCost());
        trip.setDriverSalary(req.getDriverSalary());
        trip.setFoodAndAccommodation(req.getFoodAndAccommodation());

        // Calculate fuel usage
        double fuelUsed = req.getDistanceKm() / req.getFuelCost();
        double fuelCost = fuelUsed * req.getFuelCost();

        // Total cost
        double totalCost = fuelCost
                + req.getFuelCost()
                + req.getOtherCost()
                + req.getDriverSalary()
                + req.getFoodAndAccommodation();

        // CO₂ calculation
        double co2 = fuelUsed * 2.31;

        trip.setFuelCost(fuelCost);
        trip.setTotalCost(totalCost);
        trip.setCo2Emission(co2);

        return repo.save(trip);
    }
}
