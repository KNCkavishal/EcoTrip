package com.example.EcoTrip.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "family_trip")
public class FamilyTrip {

    @Id
    private String id;

    private String userId;
    private double distanceKm;
    private double fuelCost;
    private double otherCost;
    private double totalCost;
    private double co2Emission;
    public void setDriverSalary(double driverSalary) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'setDriverSalary'");
    }
    public void setFoodAndAccommodation(double foodAndAccommodation) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'setFoodAndAccommodation'");
    }
    public void setVehicleId(Long vehicleId) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'setVehicleId'");
    }
    public void setId(long long1) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'setId'");
    }
    public Long getVehicleId() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getVehicleId'");
    }
    public double getDriverSalary() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getDriverSalary'");
    }
    public double getFoodAndAccommodation() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getFoodAndAccommodation'");
    }
}
