// src/main/java/com/example/EcoTrip/model/User.java
package com.example.EcoTrip.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Document(collection = "users")
public class User {
    @Id
    private String id;
    private String username;
    private String email;
    private String role; // e.g., "USER"
}