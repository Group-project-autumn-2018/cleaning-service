package com.itechart.service.repository;

import com.itechart.service.entity.CleaningCompany;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CleaningCompanyRepository extends JpaRepository<CleaningCompany, Long> {
    List<CleaningCompany> findAll();

    @Modifying
    @Query("update Customer set confirmed = :confirmed where id = :serviceId")
    void changeConfirmStatus(@Param("confirmed") boolean confirmed, @Param("serviceId") Long serviceId);
}
