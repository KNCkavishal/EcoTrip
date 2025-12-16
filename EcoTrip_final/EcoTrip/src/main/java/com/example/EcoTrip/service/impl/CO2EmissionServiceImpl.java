package com.example.EcoTrip.service.impl;

import com.example.EcoTrip.dto.CO2RequestDTO;
import com.example.EcoTrip.dto.CO2SummaryDTO;
import com.example.EcoTrip.model.CO2Emission;
import com.example.EcoTrip.repository.CO2EmissionRepository;
import com.example.EcoTrip.service.CO2EmissionService;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class CO2EmissionServiceImpl implements CO2EmissionService {

    private final CO2EmissionRepository repository;

    public CO2EmissionServiceImpl(CO2EmissionRepository repository) {
        this.repository = repository;
    }

    @Override
    public void calculateAndSave(String userId, CO2RequestDTO dto) {

        double factor;
        switch (dto.getVehicleType()) {
            case "BUS": factor = 0.08; break;
            case "CAR": factor = 0.21; break;
            case "BIKE": factor = 0.05; break;
            default: factor = 0.15;
        }

        double co2 = dto.getDistanceKm() * factor;

        CO2Emission emission = new CO2Emission(
                userId,
                dto.getVehicleType(),
                dto.getDistanceKm(),
                co2,
                LocalDate.now()
        );

        repository.save(emission);
    }

    @Override
    public CO2SummaryDTO getUserSummary(String userId) {

        List<CO2Emission> emissions = repository.findByUserId(userId);
        double total = emissions.stream().mapToDouble(e -> ((Number) e.getCo2()).doubleValue()).sum();

        String suggestion =
                total > 100
                        ? "Consider public transport or carpooling 🌱"
                        : "Great job! Your carbon footprint is low 👏";

        return new CO2SummaryDTO(total, suggestion);
    }
}
