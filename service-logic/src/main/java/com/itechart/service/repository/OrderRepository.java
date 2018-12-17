package com.itechart.service.repository;

import com.itechart.service.entity.Frequency;
import com.itechart.service.entity.Order;
import com.itechart.service.entity.Status;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long>, JpaSpecificationExecutor<Order> {

    @Modifying
    @Query("update Order set status = :status where id = :orderId")
    void changeStatus(@Param("status") Status status, @Param("orderId") Long orderId);

    List<Order> findAllByCompany_Id(Long id);

    Page<Order> findAllByCustomer_Id(Pageable pageable, Long id);

    Page<Order> findAllByCompany_Id(Pageable pageable, Long id);

    Page<Order> findAllByCompany_IdAndCleaningType(Pageable pageable, Long id, String cleaningType);

    Page<Order> findAllByCompany_IdAndStatus(Pageable pageable, Long id, Status status);

    Page<Order> findAllByCompany_IdAndCleaningTypeAndStatus(Pageable pageable, Long id, String cleaningType, Status status);

    List<Order> findAllByCompany_IdAndCleaningType(Long id, String cleaningType);

    List<Order> findAllByCompany_IdAndStatus(Long id, Status status);

    List<Order> findAllByCompany_IdAndFrequency(Long id, Frequency frequency);

}
