package com.itechart.cleaning.repository;

import com.itechart.cleaning.entity.Cleaning;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CleaningRepository extends JpaRepository<Cleaning, Long> {

    Cleaning findOneById(Long id);

    List<Cleaning> findAll();
}
