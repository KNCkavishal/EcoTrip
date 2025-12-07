// src/main/java/com/example/EcoTrip/model/Auth.java
package com.example.EcoTrip.model;

import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Document(collection = "auth")
public class Auth {
    @Id
    private String id;

    private String userId;       // reference to User id
    private String passwordHash; // BCrypt hash

    @CreatedDate
    private LocalDateTime createdAt;
}
