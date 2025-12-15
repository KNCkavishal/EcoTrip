package com.example.EcoTrip.controller;

import com.example.EcoTrip.model.FamilyTrip;
import com.example.EcoTrip.service.FamilyTripService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/trips/family")
@CrossOrigin(origins = "http://localhost:3000")
public class FamilyTripController {

    private final FamilyTripService service;

    public FamilyTripController(FamilyTripService service) {
        this.service = service;
    }

    @PostMapping
    public FamilyTrip createTrip(
            @RequestBody FamilyTrip request,
            @RequestHeader("Authorization") String authHeader
    ) {
        String token = authHeader.replace("Bearer ", "");
        return service.createFamilyTrip(request, token);
    }
}
