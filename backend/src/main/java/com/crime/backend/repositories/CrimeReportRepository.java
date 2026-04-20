package com.crime.backend.repositories;

import com.crime.backend.models.CrimeReport;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CrimeReportRepository extends MongoRepository<CrimeReport, String> {
    List<CrimeReport> findByReporterId(String reporterId);
    List<CrimeReport> findAllByOrderByTimestampDesc();
}
