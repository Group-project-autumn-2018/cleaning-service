package com.itechart.service.service.impl;

import com.itechart.common.service.UserService;
import com.itechart.service.comparator.SortByAverageRating;
import com.itechart.service.comparator.SortCompanyByAveragePrice;
import com.itechart.service.dto.CleaningTypesDto;
import com.itechart.service.dto.SearchCompanyDto;
import com.itechart.service.entity.CleaningCompany;
import com.itechart.service.entity.CleaningTypes;
import com.itechart.service.mapper.CleaningCompanyMapper;
import com.itechart.service.repository.CleaningTypesRepository;
import com.itechart.service.service.SearchCompanyService;
import com.itechart.service.util.CalculationRules;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

@Service
@Transactional
public class SearchCompanyServiceImpl implements SearchCompanyService {

    @Autowired
    private CleaningTypesRepository cleaningTypesRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private CleaningCompanyMapper mapper;

    @Autowired
    private CalculationRules calculationRules;

    private final int COUNT = 20;

    private CleaningTypesDto getCleaningTypesDto(String cleaningType) {
        CleaningTypesDto cleaningTypesDto = new CleaningTypesDto(0L,
                false, false, false, false,
                false, false, false, false,
                null, null);

        switch (cleaningType) {
            case "Standard room cleaning":
                cleaningTypesDto.setStandardRoomCleaning(true);
                break;
            case "Spring-cleaning":
                cleaningTypesDto.setSpringCleaning(true);
                break;
            case "Cleaning after repair and construction":
                cleaningTypesDto.setRepairAndConstructionCleaning(true);
                break;
            case "Dry carpet cleaning":
                cleaningTypesDto.setDryCarpetCleaning(true);
                break;
            case "Office cleaning":
                cleaningTypesDto.setOfficeCleaning(true);
                break;
            case "Dry cleaning of furniture and coatings":
                cleaningTypesDto.setDryCarpetCleaning(true);
                break;
            case "Industrial cleaning":
                cleaningTypesDto.setIndustrialCleaning(true);
                break;
            case "Pool cleaning":
                cleaningTypesDto.setPoolCleaning(true);
                break;
        }

        return cleaningTypesDto;
    }

    Comparator<CleaningCompany> priceComparator = new SortCompanyByAveragePrice();
    Comparator<CleaningCompany> ratingComparator = new SortByAverageRating();

    @Override
    public List<CleaningCompany> search(SearchCompanyDto searchCompanyDto) {

        CleaningTypesDto cleaningTypes = getCleaningTypesDto(searchCompanyDto.getCleaningType());
        List<CleaningTypes> cleaningTypeList = cleaningTypesRepository.findAll(
                cleaningTypes.getStandardRoomCleaning(),
                cleaningTypes.getSpringCleaning(),
                cleaningTypes.getRepairAndConstructionCleaning(),
                cleaningTypes.getDryCarpetCleaning(),
                cleaningTypes.getOfficeCleaning(),
                cleaningTypes.getFurnitureAndCoatingsCleaning(),
                cleaningTypes.getIndustrialCleaning(),
                cleaningTypes.getPoolCleaning()
        );

        List<CleaningCompany> cleaningCompanyList = new ArrayList<>();
        for (CleaningTypes cleaningType : cleaningTypeList) {
            List<CleaningCompany> cleaningCompanies = Collections.singletonList(cleaningType.getCompany());
            cleaningCompanyList.addAll(cleaningCompanies);
        }
        List<CleaningCompany> companies = new ArrayList<>();
        for (CleaningCompany cleaningCompany : cleaningCompanyList) {
            BigDecimal price = calculationRules.calculateAvaregePrice(searchCompanyDto, cleaningCompany.getId());
            cleaningCompany.setAveragePrice(price);
            companies.add(cleaningCompany);
        }

        return companies;
    }

    @Override
    public List<CleaningCompany> sortByAveragePrice(SearchCompanyDto searchCompanyDto) {

        List<CleaningCompany> companies = search(searchCompanyDto);
        companies.sort(priceComparator);
        return companies;
    }

    @Override
    public List<CleaningCompany> sortByAverageRating(SearchCompanyDto searchCompanyDto) {

        List<CleaningCompany> companies = search(searchCompanyDto);
        companies.sort(ratingComparator);
        Collections.reverse(companies);
        return companies;
    }

    @Override
    public List<CleaningCompany> sortByRemoteness(SearchCompanyDto searchCompanyDto) {
        //        if (!searchCompanyDTO.getEmail().isEmpty() & searchCompanyDTO.getAddress().isEmpty()) {
//            User user = userService.findByEmail(searchCompanyDTO.getEmail());
//            Double latitude = user.getAddress().getLat();
//            Double longitude = user.getAddress().getLon();
//            List<CleaningCompany> cleaningCompanyResultList = new ArrayList<>(cleaningCompanyList.size());
//
//            int step = 0;
//            for (CleaningCompany cleaningCompany : cleaningCompanyList) {
//                if (cleaningCompany.getAddress().getLat() >= latitude & cleaningCompany.getAddress().getLon() >= longitude) {
//                    cleaningCompanyResultList.add(cleaningCompany);
//                }
//                step++;
//                if (step >= COUNT / 2) {
//                    break;
//                }
//            }
//
//            step = 0;
//            for (CleaningCompany cleaningCompany : cleaningCompanyList) {
//                if (cleaningCompany.getAddress().getLat() <= latitude & cleaningCompany.getAddress().getLon() <= longitude) {
//                    cleaningCompanyResultList.add(cleaningCompany);
//                }
//                step++;
//                if (step >= COUNT / 2) {
//                    break;
//                }
//            }
//            return cleaningCompanyResultList;
//        }
//        if (!searchCompanyDTO.getEmail().isEmpty() & !searchCompanyDTO.getAddress().isEmpty()) {
//            return cleaningCompanyList.size() > COUNT ? cleaningCompanyList.subList(0, COUNT) : cleaningCompanyList;
//        }
//        return new ArrayList<>();
        return null;
    }

}
