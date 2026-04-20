package com.crime.backend.models;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Document(collection = "reports")
public class CrimeReport {
    @Id
    private String id;
    
    private String title;
    private String description;
    private String category;
    
    private String location; // Could be extended to lat/lng object
    
    private LocalDateTime timestamp = LocalDateTime.now();
    
    // Status can be: PENDING, INVESTIGATING, RESOLVED, REJECTED
    private String status = "PENDING";
    
    private String reporterId;
    
    private List<String> evidenceUrls;
}
