package com.itechart.service.service.impl;

import com.itechart.common.service.UserService;
import com.itechart.service.dto.CleaningTypesDto;
import com.itechart.service.dto.SearchCompanyDTO;
import com.itechart.service.entity.CleaningCompany;
import com.itechart.service.entity.CleaningTypes;
import com.itechart.service.repository.CleaningTypesRepository;
import com.itechart.service.service.SearchCompanyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
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

    private final int COUNT = 20;

    @Override
    public List<CleaningCompany> search(SearchCompanyDTO searchCompanyDTO) {
        CleaningTypesDto cleaningTypeDto = searchCompanyDTO.getCleaningTypesDto();
        List<CleaningTypes> cleaningTypeList = cleaningTypesRepository.findAll(
                cleaningTypeDto.getStandardRoomCleaning(),
                cleaningTypeDto.getSpringCleaning(),
                cleaningTypeDto.getRepairAndConstructionCleaning(),
                cleaningTypeDto.getDryCarpetCleaning(),
                cleaningTypeDto.getOfficeCleaning(),
                cleaningTypeDto.getFurnitureAndCoatingsCleaning(),
                cleaningTypeDto.getIndustrialCleaning(),
                cleaningTypeDto.getPoolCleaning()
        );
        List<CleaningCompany> cleaningCompanyList = new ArrayList<>();
        for (CleaningTypes cleaningType : cleaningTypeList) {
            List<CleaningCompany> cleaningCompanies = Collections.singletonList(cleaningType.getCompany());
            cleaningCompanyList.addAll(cleaningCompanies);
        }
        System.out.println(cleaningCompanyList);
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
        return new ArrayList<>();
    }

//    @Override
//    public List<CleaningTypes> search() {
//        return cleaningTypesRepository.findAll();
//    }
}
