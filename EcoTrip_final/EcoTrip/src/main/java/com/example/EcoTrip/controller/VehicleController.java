package com.example.EcoTrip.controller;

import com.example.EcoTrip.dto.VehicleRequest;
import com.example.EcoTrip.model.Vehicle;
import com.example.EcoTrip.service.VehicleService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import org.springframework.security.core.context.SecurityContextHolder;
import java.util.List;

@RestController
@RequestMapping("/api/vehicles")
@CrossOrigin(origins = "http://localhost:3000")
public class VehicleController {

    private final VehicleService vehicleService;

    public VehicleController(VehicleService vehicleService) {
        this.vehicleService = vehicleService;
    }

    @PostMapping("/register")
    public ResponseEntity<Vehicle> registerVehicle(@RequestBody VehicleRequest request) {

        String userId = (String) SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getPrincipal();

        Vehicle saved = vehicleService.registerVehicle(request, userId);
        return ResponseEntity.ok(saved);
    }

    @GetMapping("/myvehicles")
    public ResponseEntity<List<Vehicle>> getMyVehicles() {

        String userId = (String) SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getPrincipal();

        return ResponseEntity.ok(vehicleService.getUserVehicles(userId));
    }
}
