package com.example.EcoTrip.service;

import com.example.EcoTrip.dto.MaintenanceRequestDTO;
import com.example.EcoTrip.dto.MaintenanceSummaryDTO;

import java.util.List;

public interface MaintenanceService {

    void addMaintenance(String userId, MaintenanceRequestDTO dto);

    List<?> getUserMaintenanceHistory(String userId);

    MaintenanceSummaryDTO getUserMaintenanceSummary(String userId);
}
