package com.ecotrip.ecotrip_backend.controller;

import com.ecotrip.ecotrip_backend.model.VisitIdea;
import com.ecotrip.ecotrip_backend.service.VisitIdeaService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/visit-ideas")
public class VisitIdeaController {

    private final VisitIdeaService visitIdeaService;

    public VisitIdeaController(VisitIdeaService visitIdeaService) {
        this.visitIdeaService = visitIdeaService;
    }

    // ✅ GET ALL
    @GetMapping
    public List<VisitIdea> getAllVisitIdeas() {
        return visitIdeaService.getAllVisitIdeas();
    }

    // ✅🔥 GET BY ID (IMPORTANT)
    @GetMapping("/{id}")
    public ResponseEntity<VisitIdea> getVisitIdeaById(@PathVariable String id) {

        return visitIdeaService.getVisitIdeaById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
