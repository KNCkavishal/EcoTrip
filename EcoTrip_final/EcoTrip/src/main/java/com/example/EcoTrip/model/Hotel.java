package com.ecotrip.ecotrip_backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "hotels")
public class Hotel {

    @Id
    private String id;

    private String placeId;     // 🔥 MUST match VisitIdea _id
    private String name;
    private String location;
    private String pricePerNight;
    private String phone;
    private String image;

    public Hotel() {}

    public String getId() { return id; }
    public String getPlaceId() { return placeId; }
    public String getName() { return name; }
    public String getLocation() { return location; }
    public String getPricePerNight() { return pricePerNight; }
    public String getPhone() { return phone; }
    public String getImage() { return image; }

    public void setPlaceId(String placeId) { this.placeId = placeId; }
    public void setName(String name) { this.name = name; }
    public void setLocation(String location) { this.location = location; }
    public void setPricePerNight(String pricePerNight) { this.pricePerNight = pricePerNight; }
    public void setPhone(String phone) { this.phone = phone; }
    public void setImage(String image) { this.image = image; }
}