package com.ecotrip.ecotrip_backend.controller;

import com.ecotrip.ecotrip_backend.model.Hotel;
import com.ecotrip.ecotrip_backend.repository.HotelRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/hotels")
public class HotelController {

    private final HotelRepository hotelRepository;

    public HotelController(HotelRepository hotelRepository) {
        this.hotelRepository = hotelRepository;
    }

    // 🔥 Get hotels by VisitIdea ID
    @GetMapping("/place/{placeId}")
    public List<Hotel> getHotelsByPlace(@PathVariable String placeId) {
        return hotelRepository.findByPlaceId(placeId);
    }

    // 🔥 Add hotel
    @PostMapping
    public Hotel addHotel(@RequestBody Hotel hotel) {
        return hotelRepository.save(hotel);
    }
}
