package com.crime.backend;

import com.crime.backend.services.FilesStorageService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class BackendApplication {

    public static void main(String[] args) {
        String mongoUri = System.getenv("SPRING_DATA_MONGODB_URI");
        if (mongoUri != null && !mongoUri.isEmpty()) {
            System.setProperty("spring.data.mongodb.uri", mongoUri);
            System.out.println(">>> AUTO-CONFIG: Force-set spring.data.mongodb.uri from Environment.");
        }
        SpringApplication.run(BackendApplication.class, args);
    }

    @org.springframework.beans.factory.annotation.Value("${spring.data.mongodb.uri:NOT_FOUND}")
    private String mongoUri;

    @Bean
    CommandLineRunner init(FilesStorageService storageService) {
        return (args) -> {
            storageService.init();
            System.out.println(">>> STARTUP DEBUG: MongoDB URI found: " + (mongoUri.contains("@") ? "REDACTED" : mongoUri));
            if (mongoUri.equals("NOT_FOUND") || mongoUri.contains("localhost")) {
                System.out.println(">>> WARNING: App is still using localhost. Check Render Environment Variables!");
            }
        };
    }
}
