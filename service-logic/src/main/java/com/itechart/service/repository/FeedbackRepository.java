package com.itechart.service.repository;

import com.itechart.service.entity.CleaningCompany;
import com.itechart.service.entity.Feedback;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FeedbackRepository extends JpaRepository<Feedback, Long> {
    @Query("select count(Feedback) from Feedback where customerId = :customerId and serviceId = :serviceId")
    Long countSameRatings(@Param("serviceId") Long serviceId, @Param("customerId") Long customerId);

    List<Feedback> findAllByCompanyOrderByAddingDateDesc(CleaningCompany company);

    @Query(value = "select * from feedback where service_id = :companyId order by adding_date desc limit :elemCount",
            nativeQuery = true)
    List<Feedback> findTop(@Param("companyId") Long companyId, @Param("elemCount") Integer count);

    @Query("select avg(rate) from Feedback where company = :company")
    Integer findAverageRating(@Param("company") CleaningCompany company);
}
