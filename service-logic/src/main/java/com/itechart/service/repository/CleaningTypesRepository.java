package com.itechart.service.repository;

import com.itechart.service.entity.CleaningTypes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CleaningTypesRepository extends JpaRepository<CleaningTypes, Long> {

//    @Query("SELECT ct FROM CleaningType ct")
//    @Query("SELECT ct FROM CleaningType ct WHERE " +
//            "ct.standardRoomCleaning = :standardRoomCleaning OR " +
//            "ct.springCleaning = :springCleaning OR " +
//            "ct.repairAndConstructionCleaning = :repairAndConstructionCleaning OR " +
//            "ct.dryCarpetCleaning = :dryCarpetCleaning OR " +
//            "ct.officeCleaning = :officeCleaning OR " +
//            "ct.furnitureAndCoatingsCleaning = :furnitureAndCoatingsCleaning OR " +
//            "ct.industrialCleaning = :industrialCleaning OR " +
//            "ct.poolCleaning = :poolCleaning")
//    List<CleaningTypes> findAll(
//            @Param("standardRoomCleaning") boolean standardRoomCleaning,
//            @Param("springCleaning") boolean springCleaning,
//            @Param("repairAndConstructionCleaning") boolean repairAndConstructionCleaning,
//            @Param("dryCarpetCleaning") boolean dryCarpetCleaning,
//            @Param("officeCleaning") boolean officeCleaning,
//            @Param("furnitureAndCoatingsCleaning") boolean furnitureAndCoatingsCleaning,
//            @Param("industrialCleaning") boolean industrialCleaning,
//            @Param("poolCleaning") boolean poolCleaning
//    );

    List<CleaningTypes> findAll();
}
