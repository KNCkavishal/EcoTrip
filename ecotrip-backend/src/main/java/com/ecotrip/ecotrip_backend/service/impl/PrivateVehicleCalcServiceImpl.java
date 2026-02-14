package com.ecotrip.ecotrip_backend.service.impl;

import com.ecotrip.ecotrip_backend.model.PrivateVehicleCalc;
import com.ecotrip.ecotrip_backend.repository.PrivateVehicleCalcRepository;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class PrivateVehicleCalcServiceImpl {

    private final PrivateVehicleCalcRepository repo;

    public PrivateVehicleCalcServiceImpl(PrivateVehicleCalcRepository repo) {
        this.repo = repo;
    }

    public PrivateVehicleCalc calculateAndSave(PrivateVehicleCalc calc) {

        // ================= VALIDATION =================
        if (calc.getExpectedFuelEconomy() <= 0) {
            throw new IllegalArgumentException("Fuel economy must be greater than zero");
        }

        if (calc.getEstimatedDistance() <= 0) {
            throw new IllegalArgumentException("Distance must be greater than zero");
        }

        // ================= COST CALCULATIONS =================

        // Tyre cost per km
        double tyreCostPerKm = (calc.getTyrePrice() * 4) / 15000;
        calc.setTyreCostPerKm(tyreCostPerKm);

        // Service cost per km
        double serviceCostPerKm = calc.getServicePrice() / 5000;
        calc.setServiceCostPerKm(serviceCostPerKm);

        // Fuel used for trip
        double fuelUsed =
                calc.getEstimatedDistance() / calc.getExpectedFuelEconomy();

        // Fuel cost
        double fuelCost =
                fuelUsed * calc.getFuelPricePerLitre();

        // Tyre cost for trip
        double tyreCost =
                tyreCostPerKm * calc.getEstimatedDistance();

        // Service cost for trip
        double serviceCost =
                serviceCostPerKm * calc.getEstimatedDistance();

        // Total trip cost
        calc.setTotalTripCost(fuelCost + tyreCost + serviceCost);

        // ================= CO₂ CALCULATION =================

        double emissionFactor = 2.31; // default petrol

        if (calc.getFuelType() != null) {
            switch (calc.getFuelType().toLowerCase()) {
                case "diesel":
                    emissionFactor = 2.68;
                    break;
                case "petrol":
                    emissionFactor = 2.31;
                    break;
                case "electric":
                    emissionFactor = 0;
                    break;
            }
        }

        double co2Emission = fuelUsed * emissionFactor;
        calc.setCo2Emission(co2Emission);

        // ================= DATE =================
        calc.setTripDate(new Date());

        return repo.save(calc);
    }
}
