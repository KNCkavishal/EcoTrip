package com.ecotrip.ecotrip_backend.service.impl;

import com.ecotrip.ecotrip_backend.model.Maintenance;
import com.ecotrip.ecotrip_backend.repository.MaintenanceRepository;
import org.springframework.stereotype.Service;

@Service
public class MaintenanceServiceImpl {

    private final MaintenanceRepository repo;

    public MaintenanceServiceImpl(MaintenanceRepository repo) {
        this.repo = repo;
    }

    public Maintenance saveMaintenance(Maintenance maintenance) {
        // Calculate next service km (example: every 5000 km)
        maintenance.setNextServiceKm(maintenance.getKmSinceLastService() + 5000);

        // Calculate cost per km
        double totalCost = maintenance.getServiceCost() + maintenance.getPartsCost()
                + maintenance.getTyreCost() + maintenance.getLaborCost();

        maintenance.setCostPerKm(totalCost / maintenance.getKmSinceLastService());

        return repo.save(maintenance);
    }
}