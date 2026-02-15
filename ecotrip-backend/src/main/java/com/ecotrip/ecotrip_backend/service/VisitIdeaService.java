package com.ecotrip.ecotrip_backend.service;

import com.ecotrip.ecotrip_backend.model.VisitIdea;
import com.ecotrip.ecotrip_backend.repository.VisitIdeaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class VisitIdeaService {

    @Autowired
    private VisitIdeaRepository visitIdeaRepository;

    public List<VisitIdea> getAllVisitIdeas() {
        return visitIdeaRepository.findAll();
    }

    public Optional<VisitIdea> getVisitIdeaById(String id) {
        return visitIdeaRepository.findById(id);
    }

    public VisitIdea addVisitIdea(VisitIdea visitIdea) {
        return visitIdeaRepository.save(visitIdea);
    }

    public VisitIdea updateVisitIdea(String id, VisitIdea updated) {
        return visitIdeaRepository.findById(id).map(idea -> {

            idea.setName(updated.getName());
            idea.setProvince(updated.getProvince());
            idea.setDistrict(updated.getDistrict());
            idea.setCategory(updated.getCategory());
            idea.setReason(updated.getReason());
            idea.setImage(updated.getImage());

            return visitIdeaRepository.save(idea);
        }).orElse(null);
    }

    public void deleteVisitIdea(String id) {
        visitIdeaRepository.deleteById(id);
    }
}
