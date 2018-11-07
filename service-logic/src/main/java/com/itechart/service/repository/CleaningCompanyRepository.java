package com.itechart.service.repository;

import com.itechart.service.entity.CleaningCompany;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CleaningCompanyRepository extends JpaRepository<CleaningCompany, Long> {
    List<CleaningCompany> findAll();
}
