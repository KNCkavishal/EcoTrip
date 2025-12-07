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
public class VehicleController {

    private final VehicleService vehicleService;

    public VehicleController(VehicleService vehicleService) {
        this.vehicleService = vehicleService;
    }

    @PostMapping("/register")
    public ResponseEntity<Vehicle> registerVehicle(@RequestBody VehicleRequest request) {
        String userId = getCurrentUserId();
        Vehicle vehicle = vehicleService.registerVehicle(request);
        vehicle.setUserId(userId); // attach logged-in user
        return ResponseEntity.ok(vehicleService.registerVehicle(request));
    }

    @GetMapping("/myvehicles")
    public ResponseEntity<List<Vehicle>> getMyVehicles() {
        String userId = getCurrentUserId();
        return ResponseEntity.ok(vehicleService.getUserVehicles(userId));
    }

    private String getCurrentUserId() {
        return (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }
}
