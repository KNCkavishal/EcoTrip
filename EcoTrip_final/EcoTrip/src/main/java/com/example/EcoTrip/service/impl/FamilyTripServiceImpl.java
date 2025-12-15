package com.example.EcoTrip.service.impl;

import com.example.EcoTrip.model.FamilyTrip;
import com.example.EcoTrip.repository.FamilyTripRepository;
import com.example.EcoTrip.security.JwtUtil;
import com.example.EcoTrip.service.FamilyTripService;
import org.springframework.stereotype.Service;

@Service
public class FamilyTripServiceImpl implements FamilyTripService {

    private final FamilyTripRepository repository;
    private final JwtUtil jwtUtil;

    public FamilyTripServiceImpl(FamilyTripRepository repository, JwtUtil jwtUtil) {
        this.repository = repository;
        this.jwtUtil = jwtUtil;
    }

    @Override
    public FamilyTrip createFamilyTrip(FamilyTrip request, String token) {

        // Extract userId from JWT
        String userId = jwtUtil.extractUserId(token);
        request.setUserId(userId);

        // Calculations
        double fuelCost = request.getDistanceKm() * request.getFuelCostPerKm();
        double totalCost = fuelCost + request.getServiceCost() + request.getTyreCost();
        double co2 = request.getDistanceKm() * request.getCo2PerKm();

        request.setFuelCost(fuelCost);
        request.setTotalCost(totalCost);
        request.setCo2Emission(co2);

        return repository.save(request);
    }
}
