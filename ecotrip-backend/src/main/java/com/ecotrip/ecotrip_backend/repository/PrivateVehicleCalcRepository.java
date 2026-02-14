package com.ecotrip.ecotrip_backend.repository;

import com.ecotrip.ecotrip_backend.model.PrivateVehicleCalc;
import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface PrivateVehicleCalcRepository
        extends MongoRepository<PrivateVehicleCalc, String> {

    // ================= FUEL TYPE =================
    @Aggregation(pipeline = {
        "{ $lookup: { from: 'vehicles', localField: 'vehicleNumber', foreignField: 'vehicleNumber', as: 'vehicle' } }",
        "{ $unwind: '$vehicle' }",
        "{ $group: { _id: '$vehicle.fuelType', totalCO2: { $sum: '$co2Emission' } } }"
    })
    List<Map<String, Object>> sumCo2ByFuelType();


    // ================= BRAND =================
    @Aggregation(pipeline = {
        "{ $lookup: { from: 'vehicles', localField: 'vehicleNumber', foreignField: 'vehicleNumber', as: 'vehicle' } }",
        "{ $unwind: '$vehicle' }",
        "{ $group: { _id: '$vehicle.brand', totalCO2: { $sum: '$co2Emission' } } }"
    })
    List<Map<String, Object>> sumCo2ByBrand();


    // ================= MODEL YEAR =================
    @Aggregation(pipeline = {
        "{ $lookup: { from: 'vehicles', localField: 'vehicleNumber', foreignField: 'vehicleNumber', as: 'vehicle' } }",
        "{ $unwind: '$vehicle' }",
        "{ $group: { _id: '$vehicle.modelYear', totalCO2: { $sum: '$co2Emission' } } }",
        "{ $sort: { _id: 1 } }"
    })
    List<Map<String, Object>> sumCo2ByModelYear();


    // ================= ENGINE CC =================
    @Aggregation(pipeline = {
        "{ $lookup: { from: 'vehicles', localField: 'vehicleNumber', foreignField: 'vehicleNumber', as: 'vehicle' } }",
        "{ $unwind: '$vehicle' }",
        "{ $group: { _id: '$vehicle.engineCapacityCC', totalCO2: { $sum: '$co2Emission' } } }",
        "{ $sort: { _id: 1 } }"
    })
    List<Map<String, Object>> sumCo2ByEngineCC();


    // ================= MONTH =================
    @Aggregation(pipeline = {
        "{ $match: { tripDate: { $exists: true, $ne: null } } }",
        "{ $project: { month: { $month: '$tripDate' }, co2Emission: 1 } }",
        "{ $group: { _id: '$month', totalCO2: { $sum: '$co2Emission' } } }",
        "{ $sort: { _id: 1 } }"
    })
    List<Map<String, Object>> sumCo2ByMonth();


    // ================= YEAR =================
    @Aggregation(pipeline = {
        "{ $match: { tripDate: { $exists: true, $ne: null } } }",
        "{ $project: { year: { $year: '$tripDate' }, co2Emission: 1 } }",
        "{ $group: { _id: '$year', totalCO2: { $sum: '$co2Emission' } } }",
        "{ $sort: { _id: 1 } }"
    })
    List<Map<String, Object>> sumCo2ByYear();
}
