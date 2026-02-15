package com.ecotrip.ecotrip_backend.repository;

import com.ecotrip.ecotrip_backend.model.VisitIdea;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VisitIdeaRepository extends MongoRepository<VisitIdea, String> {
}
