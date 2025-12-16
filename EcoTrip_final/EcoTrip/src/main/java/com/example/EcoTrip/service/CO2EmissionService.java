package com.example.EcoTrip.service;

import com.example.EcoTrip.dto.CO2RequestDTO;
import com.example.EcoTrip.dto.CO2SummaryDTO;

public interface CO2EmissionService {

    void calculateAndSave(String userId, CO2RequestDTO dto);

    CO2SummaryDTO getUserSummary(String userId);
}
