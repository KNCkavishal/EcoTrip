package com.example.EcoTrip.service.impl;

import com.example.EcoTrip.dto.MaintenanceRequestDTO;
import com.example.EcoTrip.dto.MaintenanceSummaryDTO;
import com.example.EcoTrip.model.VehicleMaintenance;
import com.example.EcoTrip.repository.VehicleMaintenanceRepository;
import com.example.EcoTrip.service.MaintenanceService;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class MaintenanceServiceImpl implements MaintenanceService {

    private final VehicleMaintenanceRepository repository;

    public MaintenanceServiceImpl(VehicleMaintenanceRepository repository) {
        this.repository = repository;
    }
    @Override
    public void addMaintenance(String userId, MaintenanceRequestDTO dto) {

        double total = dto.getServiceCost()
                     + dto.getTyreCost()
                     + dto.getOtherCost();

        VehicleMaintenance maintenance = new VehicleMaintenance(
                userId,
                dto.getVehicleId(),
                dto.getVehicleType(),
                dto.getServiceCost(),
                dto.getTyreCost(),
                dto.getOtherCost(),
                total,
                LocalDate.now()
        );

        repository.save(maintenance);
    }

    @Override
    public List<VehicleMaintenance> getUserMaintenanceHistory(String userId) {
        return repository.findByUserId(userId);
    }

    @Override
    public MaintenanceSummaryDTO getUserMaintenanceSummary(String userId) {

        List<VehicleMaintenance> list = repository.findByUserId(userId);

        double total = list.stream()
            .mapToDouble(VehicleMaintenance::getTotalCost)
            .sum();

        String recommendation =
                total > 50000
                        ? "High maintenance cost ⚠️ Consider servicing efficiency"
                        : "Maintenance cost is under control 👍";

        return new MaintenanceSummaryDTO(total, recommendation);
    }
}