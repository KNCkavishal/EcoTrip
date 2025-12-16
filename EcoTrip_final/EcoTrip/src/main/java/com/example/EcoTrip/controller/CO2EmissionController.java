package com.example.EcoTrip.controller;

import com.example.EcoTrip.dto.CO2RequestDTO;
import com.example.EcoTrip.dto.CO2SummaryDTO;
import com.example.EcoTrip.service.CO2EmissionService;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/co2")
@CrossOrigin(origins = "http://localhost:3000")
public class CO2EmissionController {

    private final CO2EmissionService service;

    public CO2EmissionController(CO2EmissionService service) {
        this.service = service;
    }

    // USER – add trip emission
    @PostMapping("/calculate")
    public void calculate(Authentication authentication,
                          @RequestBody CO2RequestDTO dto) {

        String userId = authentication.getName(); // from JWT
        service.calculateAndSave(userId, dto);
    }

    // USER – personal dashboard
    @GetMapping("/summary")
    public CO2SummaryDTO getSummary(Authentication authentication) {

        String userId = authentication.getName();
        return service.getUserSummary(userId);
    }
}
