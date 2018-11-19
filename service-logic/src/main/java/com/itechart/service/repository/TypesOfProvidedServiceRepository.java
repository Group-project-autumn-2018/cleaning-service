package com.itechart.service.repository;

import com.itechart.service.entity.TypesOfProvidedService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TypesOfProvidedServiceRepository extends JpaRepository<TypesOfProvidedService, Long> {
}
