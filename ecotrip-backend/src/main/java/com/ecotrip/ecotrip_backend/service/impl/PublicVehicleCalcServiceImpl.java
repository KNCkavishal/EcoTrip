package com.ecotrip.ecotrip_backend.service.impl;

import com.ecotrip.ecotrip_backend.model.PublicVehicleCalc;
import com.ecotrip.ecotrip_backend.repository.PublicVehicleCalcRepository;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class PublicVehicleCalcServiceImpl {

    private final PublicVehicleCalcRepository repo;

    public PublicVehicleCalcServiceImpl(PublicVehicleCalcRepository repo) {
        this.repo = repo;
    }

    public PublicVehicleCalc calculateAndSave(PublicVehicleCalc calc) {

        // ---------------- COST PER KM ----------------
        calc.setTyreCostPerKm(calc.getTyrePrice() / 15000.0);
        calc.setServiceCostPerKm(calc.getServicePrice() / 5000.0);

        // ---------------- FUEL COST ----------------
        double fuelUsedPerDay =
                (calc.getEstimatedDistancePerTrip() * calc.getTripsPerDay())
                        / calc.getExpectedFuelEconomy();

        double fuelCost = fuelUsedPerDay * calc.getFuelPricePerLitre();

        // ---------------- RUNNING COST ----------------
        double runningCost =
                (calc.getTyreCostPerKm() + calc.getServiceCostPerKm())
                        * calc.getEstimatedDistancePerTrip()
                        * calc.getTripsPerDay();

        // ---------------- SALARY & PROFIT ----------------
        double salaryCost = calc.getDriverSalary() + calc.getHelperSalary();
        double profit = salaryCost * calc.getOwnerProfitPercentage() / 100.0;

        calc.setTotalTripCost(fuelCost + runningCost + salaryCost + profit);

        // ---------------- CO₂ EMISSION ----------------
        double co2Factor =
                "DIESEL".equalsIgnoreCase(calc.getFuelType()) ? 2.68 : 2.31;

        calc.setCo2Emission(fuelUsedPerDay * co2Factor);

        // ---------------- TRIP DATE (CRITICAL FIX) ----------------
        if (calc.getTripDate() == null) {
            calc.setTripDate(new Date()); // ✅ BSON Date
        }

        return repo.save(calc);
    }
}
