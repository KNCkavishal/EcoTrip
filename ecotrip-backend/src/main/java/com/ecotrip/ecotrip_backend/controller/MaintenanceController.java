package com.ecotrip.ecotrip_backend.controller;

import com.ecotrip.ecotrip_backend.model.Maintenance;
import com.ecotrip.ecotrip_backend.service.impl.MaintenanceServiceImpl;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/vehicle/maintenance")
@CrossOrigin(origins = "http://localhost:3000")
public class MaintenanceController {

    private final MaintenanceServiceImpl service;

    public MaintenanceController(MaintenanceServiceImpl service) {
        this.service = service;
    }

    @PostMapping("/calc")
    public ResponseEntity<?> saveMaintenance(@Valid @RequestBody Maintenance maintenance) {
        try {
            Maintenance saved = service.saveMaintenance(maintenance);
            return ResponseEntity.ok(saved);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error saving maintenance: " + e.getMessage());
        }
    }
}