package com.crime.backend.controllers;

import com.crime.backend.models.CrimeReport;
import com.crime.backend.services.FilesStorageService;
import com.crime.backend.services.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/reports")
public class ReportController {

    @Autowired
    private ReportService reportService;

    @Autowired
    private FilesStorageService storageService;

    @PostMapping
    public ResponseEntity<?> createReport(
            @RequestParam("title") String title,
            @RequestParam("description") String description,
            @RequestParam("category") String category,
            @RequestParam("location") String location,
            @RequestParam("reporterId") String reporterId,
            @RequestParam(value = "files", required = false) MultipartFile[] files) {
        
        try {
            CrimeReport report = new CrimeReport();
            report.setTitle(title);
            report.setDescription(description);
            report.setCategory(category);
            report.setLocation(location);
            report.setReporterId(reporterId);
            
            List<String> evidenceUrls = new ArrayList<>();
            
            if (files != null && files.length > 0) {
                for (MultipartFile file : files) {
                    String filename = storageService.save(file);
                    String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                            .path("/api/reports/files/")
                            .path(filename)
                            .toUriString();
                    evidenceUrls.add(fileDownloadUri);
                }
            }
            
            report.setEvidenceUrls(evidenceUrls);
            CrimeReport savedReport = reportService.createReport(report);
            
            return ResponseEntity.status(HttpStatus.CREATED).body(savedReport);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body("Could not create report: " + e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<List<CrimeReport>> getAllReports() {
        List<CrimeReport> reports = reportService.getAllReports();
        return ResponseEntity.ok(reports);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<CrimeReport>> getReportsByUser(@PathVariable String userId) {
        List<CrimeReport> reports = reportService.getReportsByUser(userId);
        return ResponseEntity.ok(reports);
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<?> updateReportStatus(@PathVariable String id, @RequestBody Map<String, String> body) {
        String status = body.get("status");
        if (status == null) {
            return ResponseEntity.badRequest().body("Status is required");
        }
        
        try {
            CrimeReport updatedReport = reportService.updateReportStatus(id, status);
            return ResponseEntity.ok(updatedReport);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    
    @GetMapping("/files/{filename:.+}")
    @ResponseBody
    public ResponseEntity<Resource> getFile(@PathVariable String filename) {
        Resource file = storageService.load(filename);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getFilename() + "\"").body(file);
    }
}
