package com.example.EcoTrip;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.config.EnableMongoAuditing;

@SpringBootApplication
@EnableMongoAuditing
public class EcoTripApplication {
    public static void main(String[] args) {
        SpringApplication.run(EcoTripApplication.class, args);
    }
}
