package com.ecotrip.ecotrip_backend.controller;

import com.ecotrip.ecotrip_backend.model.VisitIdea;
import com.ecotrip.ecotrip_backend.service.VisitIdeaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/admin/visit-ideas")
public class VisitIdeaAdminController {
    @Autowired
    private VisitIdeaService visitIdeaService;

    @GetMapping
    public List<VisitIdea> getAllVisitIdeas() {
        return visitIdeaService.getAllVisitIdeas();
    }


    @GetMapping("/{id}")
    public ResponseEntity<VisitIdea> getVisitIdeaById(@PathVariable String id) {
        Optional<VisitIdea> idea = visitIdeaService.getVisitIdeaById(id);
        return idea.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public VisitIdea addVisitIdea(@RequestBody VisitIdea visitIdea) {
        return visitIdeaService.addVisitIdea(visitIdea);
    }


    @PutMapping("/{id}")
    public ResponseEntity<VisitIdea> updateVisitIdea(@PathVariable String id, @RequestBody VisitIdea visitIdea) {
        VisitIdea updated = visitIdeaService.updateVisitIdea(id, visitIdea);
        if (updated == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(updated);
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteVisitIdea(@PathVariable String id) {
        visitIdeaService.deleteVisitIdea(id);
        return ResponseEntity.noContent().build();
    }
}
