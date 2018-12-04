package com.itechart.service.service.impl;

import com.itechart.common.service.UserService;
import com.itechart.service.dto.CleaningCompanyDto;
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

    @Override
    public List<CleaningCompanyDto> search(SearchCompanyDto searchCompanyDto) {

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
        List<CleaningCompanyDto> companies = new ArrayList<>();
        for (CleaningCompany cleaningCompany : cleaningCompanyList) {

            CleaningCompanyDto companyDto = mapper.mapCompanyToCompanyDto(cleaningCompany);
            BigDecimal price = calculationRules.calculateAvaregePrice(searchCompanyDto, cleaningCompany.getId());
            companyDto.setPrice(price);
            companies.add(companyDto);
        }


//        System.out.println(companies + "lalala");
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
        return companies;
    }
}
