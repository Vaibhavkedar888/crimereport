package com.crime.backend.services;

import com.crime.backend.models.CrimeReport;
import com.crime.backend.repositories.CrimeReportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ReportService {

    @Autowired
    private CrimeReportRepository reportRepository;

    public CrimeReport createReport(CrimeReport report) {
        return reportRepository.save(report);
    }

    public List<CrimeReport> getAllReports() {
        return reportRepository.findAllByOrderByTimestampDesc();
    }

    public List<CrimeReport> getReportsByUser(String userId) {
        return reportRepository.findByReporterId(userId);
    }

    public CrimeReport updateReportStatus(String reportId, String status) {
        Optional<CrimeReport> optionalReport = reportRepository.findById(reportId);
        if (optionalReport.isPresent()) {
            CrimeReport report = optionalReport.get();
            report.setStatus(status);
            return reportRepository.save(report);
        }
        throw new RuntimeException("Report not found with id " + reportId);
    }
    
    public CrimeReport getReportById(String reportId) {
        return reportRepository.findById(reportId)
                .orElseThrow(() -> new RuntimeException("Report not found"));
    }
}
