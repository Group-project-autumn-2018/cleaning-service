package com.itechart.service.repository;

import com.itechart.service.entity.Order;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long>, JpaSpecificationExecutor<Order> {

    Page<Order> findAllByCustomer_Id(Pageable pageable, Long id);

    Page<Order> findAllByCompany_Id(Pageable pageable, Long id);

    Page<Order> findAllByCompany_IdAndCleaningType(Pageable pageable, Long id, String cleaningType);

    Page<Order> findAllByCompany_IdAndStatus(Pageable pageable, Long id, String status);

    Page<Order> findAllByCompany_IdAndCleaningTypeAndStatus(Pageable pageable, Long id, String cleaningType, String status);

}
