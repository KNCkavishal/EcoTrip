package com.example.EcoTrip.service;

import com.example.EcoTrip.dto.BusFareTripDTO;
import com.example.EcoTrip.model.BusFareTrip;

import java.util.List;

public interface BusFareTripService {

    BusFareTrip createTrip(BusFareTripDTO dto);

    List<BusFareTrip> getAllTrips();
}
