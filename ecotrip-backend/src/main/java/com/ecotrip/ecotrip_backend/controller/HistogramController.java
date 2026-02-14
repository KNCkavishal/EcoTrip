package com.ecotrip.ecotrip_backend.controller;

import com.ecotrip.ecotrip_backend.repository.PublicVehicleCalcRepository;
import com.ecotrip.ecotrip_backend.repository.PrivateVehicleCalcRepository;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/histogram/co2")
@CrossOrigin(origins = "*")
public class HistogramController {

    private final PublicVehicleCalcRepository publicRepo;
    private final PrivateVehicleCalcRepository privateRepo;

    public HistogramController(
            PublicVehicleCalcRepository publicRepo,
            PrivateVehicleCalcRepository privateRepo
    ) {
        this.publicRepo = publicRepo;
        this.privateRepo = privateRepo;
    }

    // ---------- FUEL TYPE ----------
    @GetMapping("/fuel-type")
    public Map<String, Double> co2ByFuelType() {

        Map<String, Double> result = new HashMap<>();

        merge(result, publicRepo.sumCo2ByFuelType());
        merge(result, privateRepo.sumCo2ByFuelType());

        return result;
    }

    // ---------- BRAND ----------
    @GetMapping("/brand")
    public Map<String, Double> co2ByBrand() {

        Map<String, Double> result = new HashMap<>();

        merge(result, publicRepo.sumCo2ByBrand());
        merge(result, privateRepo.sumCo2ByBrand());

        return result;
    }

    // ---------- MODEL YEAR ----------
    @GetMapping("/model-year")
    public Map<String, Double> co2ByModelYear() {

        Map<String, Double> result = new HashMap<>();

        merge(result, publicRepo.sumCo2ByModelYear());
        merge(result, privateRepo.sumCo2ByModelYear());

        return result;
    }

    // ---------- ENGINE CC ----------
    @GetMapping("/engine-cc")
    public Map<String, Double> co2ByEngineCC() {

        Map<String, Double> result = new HashMap<>();

        merge(result, publicRepo.sumCo2ByEngineCC());
        merge(result, privateRepo.sumCo2ByEngineCC());

        return result;
    }

    // ---------- MONTH ----------
    @GetMapping("/month")
    public Map<String, Double> co2ByMonth() {

        Map<String, Double> result = new HashMap<>();

        merge(result, publicRepo.sumCo2ByMonth());
        merge(result, privateRepo.sumCo2ByMonth());

        return result;
    }

    // ---------- YEAR ----------
    @GetMapping("/year")
    public Map<String, Double> co2ByYear() {

        Map<String, Double> result = new HashMap<>();

        merge(result, publicRepo.sumCo2ByYear());
        merge(result, privateRepo.sumCo2ByYear());

        return result;
    }

    // ---------- MERGE HELPER ----------
    private void merge(Map<String, Double> target,
                       List<Map<String, Object>> data) {

        for (Map<String, Object> row : data) {

            String key = row.get("_id").toString();
            Double value = ((Number) row.get("totalCO2")).doubleValue();

            target.put(
                    key,
                    target.getOrDefault(key, 0.0) + value
            );
        }
    }
}
