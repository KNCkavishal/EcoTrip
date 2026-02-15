package com.ecotrip.ecotrip_backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "visit_ideas")
public class VisitIdea {

    @Id
    private String id;

    private String name;
    private String province;
    private String district;
    private String category;
    private String reason;
    private String image;

    // ✅ Empty constructor (REQUIRED by Spring)
    public VisitIdea() {
    }

    // ✅ Optional full constructor
    public VisitIdea(
            String name,
            String province,
            String district,
            String category,
            String reason,
            String image
    ) {
        this.name = name;
        this.province = province;
        this.district = district;
        this.category = category;
        this.reason = reason;
        this.image = image;
    }

    // ✅ Getters & Setters

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getProvince() {
        return province;
    }

    public void setProvince(String province) {
        this.province = province;
    }

    public String getDistrict() {
        return district;
    }

    public void setDistrict(String district) {
        this.district = district;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }
}
