package com.ecotrip.ecotrip_backend.controller;

import com.ecotrip.ecotrip_backend.model.Vehicle;
import com.ecotrip.ecotrip_backend.service.impl.VehicleServiceImpl;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/vehicle")
@CrossOrigin(origins = "*")
public class VehicleController {

    private final VehicleServiceImpl service;

    public VehicleController(VehicleServiceImpl service) {
        this.service = service;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody Vehicle vehicle) {
        return ResponseEntity.ok(service.registerVehicle(vehicle));
    }
}