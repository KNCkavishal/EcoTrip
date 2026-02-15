package com.ecotrip.ecotrip_backend.repository;

import com.ecotrip.ecotrip_backend.model.Hotel;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface HotelRepository extends MongoRepository<Hotel, String> {
    List<Hotel> findByPlaceId(String placeId);
}
