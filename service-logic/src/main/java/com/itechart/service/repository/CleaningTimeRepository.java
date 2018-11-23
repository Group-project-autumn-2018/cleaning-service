package com.itechart.service.repository;

import com.itechart.service.entity.CleaningTime;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CleaningTimeRepository extends JpaRepository<CleaningTime, Long> {

}
