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
        StringBuilder info = new StringBuilder();
        try {
            long count = userRepository.count();
            info.append("✅ Smart Crime Reporting API is running! Database is CONNECTED. (Users: ").append(count).append(")");
        } catch (Exception e) {
            info.append("❌ Smart Crime Reporting API is running, but Database is DISCONNECTED. Error: ").append(e.getMessage());
        }

        info.append("<br><br><b>Available Env variables (Names only):</b><br>");
        System.getenv().keySet().stream().sorted().forEach(name -> info.append(name).append(", "));
        
        return info.toString();
    }
}
