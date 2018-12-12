package com.itechart.service.repository;

import com.itechart.service.entity.CleaningCompany;
import com.itechart.service.entity.Feedback;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FeedbackRepository extends JpaRepository<Feedback, Long> {
    @Query("select count(id) from Feedback where customer_id = :customerId and service_id = :serviceId")
    Long countSameRatings(@Param("serviceId") Long serviceId, @Param("customerId") Long customerId);

    Page<Feedback> findAllByCompanyOrderByAddingDateDesc(Pageable pageable, CleaningCompany company);

    @Query(value = "select * from feedback where service_id = :companyId order by adding_date desc limit :elemCount",
            nativeQuery = true)
    List<Feedback> findTop(@Param("companyId") Long companyId, @Param("elemCount") Long count);

    @Query("select avg(rate) from Feedback where company = :company")
    Optional<Double> findAverageRating(@Param("company") CleaningCompany company);
}
