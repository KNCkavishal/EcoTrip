package com.example.EcoTrip.controller;

import com.example.EcoTrip.model.PublicTrip;
import com.example.EcoTrip.service.PublicTripService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/trips/public")
@CrossOrigin(origins = "http://localhost:3000")
public class PublicTripController {

    private final PublicTripService publicTripService;

    public PublicTripController(PublicTripService publicTripService) {
        this.publicTripService = publicTripService;
    }

    // 🔹 CREATE PUBLIC TRIP (JWT REQUIRED)
    @PostMapping
    public ResponseEntity<PublicTrip> createPublicTrip(
            @RequestBody PublicTrip trip,
            @RequestHeader("Authorization") String authHeader
    ) {
        String token = authHeader.replace("Bearer ", "");
        PublicTrip savedTrip = publicTripService.createPublicTrip(trip, token);
        return ResponseEntity.ok(savedTrip);
    }

    // 🔹 GET USER'S PUBLIC TRIPS (JWT REQUIRED)
    @GetMapping("/my")
    public ResponseEntity<Object> getMyPublicTrips(
            @RequestHeader("Authorization") String authHeader
    ) {
        String token = authHeader.replace("Bearer ", "");
        return ResponseEntity.ok(publicTripService.getUserPublicTrips(token));
    }
}
