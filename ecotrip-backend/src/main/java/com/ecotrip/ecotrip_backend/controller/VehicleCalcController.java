package com.ecotrip.ecotrip_backend.controller;

import com.ecotrip.ecotrip_backend.model.PrivateVehicleCalc;
import com.ecotrip.ecotrip_backend.model.PublicVehicleCalc;
import com.ecotrip.ecotrip_backend.service.impl.PrivateVehicleCalcServiceImpl;
import com.ecotrip.ecotrip_backend.service.impl.PublicVehicleCalcServiceImpl;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/vehicle")
@CrossOrigin(origins = "http://localhost:3000")
public class VehicleCalcController {

    private final PrivateVehicleCalcServiceImpl privateService;
    private final PublicVehicleCalcServiceImpl publicService;

    public VehicleCalcController(
            PrivateVehicleCalcServiceImpl privateService,
            PublicVehicleCalcServiceImpl publicService) {
        this.privateService = privateService;
        this.publicService = publicService;
    }

    @PostMapping("/private/calc")
    public ResponseEntity<?> privateCalc(@Valid @RequestBody PrivateVehicleCalc calc) {
        try {
            return ResponseEntity.ok(privateService.calculateAndSave(calc));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error saving calculation: " + e.getMessage());
        }
    }

    @PostMapping("/public/calc")
    public ResponseEntity<?> publicCalc(@Valid @RequestBody PublicVehicleCalc calc) {
        try {
            return ResponseEntity.ok(publicService.calculateAndSave(calc));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error saving calculation: " + e.getMessage());
        }
    }
}
