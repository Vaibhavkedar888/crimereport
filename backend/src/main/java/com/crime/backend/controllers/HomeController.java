package com.crime.backend.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.crime.backend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;

@RestController
public class HomeController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/")
    public String home() {
        try {
            long count = userRepository.count();
            return "✅ Smart Crime Reporting API is running! Database is CONNECTED. (Users: " + count + ")";
        } catch (Exception e) {
            return "❌ Smart Crime Reporting API is running, but Database is DISCONNECTED. Error: " + e.getMessage();
        }
    }
}
