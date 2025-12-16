package com.example.EcoTrip.service.impl;

import com.example.EcoTrip.dto.BusFareTripDTO;
import com.example.EcoTrip.model.BusFareTrip;
import com.example.EcoTrip.repository.BusFareTripRepository;
import com.example.EcoTrip.service.BusFareTripService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BusFareTripServiceImpl implements BusFareTripService {

    private final BusFareTripRepository repository;

    public BusFareTripServiceImpl(BusFareTripRepository repository) {
        this.repository = repository;
    }

    @Override
    public BusFareTrip createTrip(BusFareTripDTO dto) {
        BusFareTrip trip = new BusFareTrip(
                dto.getRoute(),
                dto.getBusFare(),
                dto.getDate()
        );
        return repository.save(trip);
    }

    @Override
    public List<BusFareTrip> getAllTrips() {
        return repository.findAll();
    }
}
