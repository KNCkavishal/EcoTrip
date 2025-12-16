package com.example.EcoTrip.controller;

import com.example.EcoTrip.dto.MaintenanceRequestDTO;
import com.example.EcoTrip.dto.MaintenanceSummaryDTO;
import com.example.EcoTrip.service.MaintenanceService;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/maintenance")
@CrossOrigin(origins = "http://localhost:3000")
public class MaintenanceController {

    private final MaintenanceService service;

    public MaintenanceController(MaintenanceService service) {
        this.service = service;
    }

    // USER – Add maintenance record
    @PostMapping("/add")
    public void addMaintenance(Authentication auth,
                               @RequestBody MaintenanceRequestDTO dto) {

        String userId = auth.getName(); // from JWT
        service.addMaintenance(userId, dto);
    }

    // USER – Maintenance history
    @GetMapping("/history")
    public List<?> getHistory(Authentication auth) {
        return service.getUserMaintenanceHistory(auth.getName());
    }

    // USER – Maintenance summary
    @GetMapping("/summary")
    public MaintenanceSummaryDTO getSummary(Authentication auth) {
        return service.getUserMaintenanceSummary(auth.getName());
    }
}
