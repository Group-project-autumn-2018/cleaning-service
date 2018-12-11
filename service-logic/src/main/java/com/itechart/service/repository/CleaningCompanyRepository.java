package com.itechart.service.repository;

import com.itechart.service.entity.CleaningCompany;
import com.itechart.service.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CleaningCompanyRepository extends JpaRepository<CleaningCompany, Long>, JpaSpecificationExecutor<CleaningCompany> {
    List<CleaningCompany> findAll();

    @Modifying
    @Query("update CleaningCompany set confirmed = :confirmed where id = :serviceId")
    void changeConfirmStatus(@Param("confirmed") boolean confirmed, @Param("serviceId") Long serviceId);

}
