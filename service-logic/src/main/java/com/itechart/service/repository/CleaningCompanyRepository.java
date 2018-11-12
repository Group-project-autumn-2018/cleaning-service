package com.itechart.service.repository;
import com.itechart.service.entity.CleaningCompany;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CleaningCompanyRepository extends JpaRepository<CleaningCompany, Long> {

}
