package com.itechart.service.repository;

import com.itechart.service.entity.CleaningTypes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CleaningTypesRepository extends JpaRepository<CleaningTypes, Long> {
}
