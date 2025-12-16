package com.example.EcoTrip.controller;

import com.example.EcoTrip.dto.BusFareTripDTO;
import com.example.EcoTrip.model.BusFareTrip;
import com.example.EcoTrip.service.BusFareTripService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bus-trips")
@CrossOrigin(origins = "http://localhost:3000")
public class BusFareTripController {

    private final BusFareTripService service;

    public BusFareTripController(BusFareTripService service) {
        this.service = service;
    }

    @PostMapping
    public BusFareTrip createTrip(@RequestBody BusFareTripDTO dto) {
        return service.createTrip(dto);
    }

    @GetMapping
    public List<BusFareTrip> getAllTrips() {
        return service.getAllTrips();
    }
}
