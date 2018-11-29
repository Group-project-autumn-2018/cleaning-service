//package com.itechart.web;
//
//import com.itechart.service.dto.CleaningTimeDto;
//import com.itechart.service.dto.CleaningTypesDto;
//import com.itechart.service.dto.PriceDto;
//import com.itechart.service.dto.SearchCompanyDTO;
//import com.itechart.service.entity.CleaningCompany;
//import com.itechart.service.entity.CleaningTypes;
//import com.itechart.service.service.SearchCompanyService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.CommandLineRunner;
//import org.springframework.stereotype.Component;
//
//import java.util.List;
//
//@Component
//public class Test implements CommandLineRunner {
//
//    @Autowired
//    private SearchCompanyService searchCompanyService;
//
//    @Override
//    public void run(String... args) throws Exception {
////        List<CleaningTypes> cleaningTypeList = searchCompanyService.search();
////        for (CleaningTypes cleaningTypes : cleaningTypeList) {
////            System.out.println(cleaningTypes);
////        }
//
//        CleaningTypesDto cleaningTypesDto = new CleaningTypesDto(1L,
//                false,
//                false,
//                false,
//                true,
//                false,
//                false,
//                false,
//                false,
//                new PriceDto(),
//                new CleaningTimeDto()
//        );
//
//        SearchCompanyDTO searchCompanyDTO = new SearchCompanyDTO();
//        searchCompanyDTO.setAddress("");
//        searchCompanyDTO.setEmail("kleshchenok90@gmail.com");
//        searchCompanyDTO.setCleaningTypesDto(cleaningTypesDto);
//
//        List<CleaningCompany> cleaningCompanyList = searchCompanyService.search(searchCompanyDTO);
//        for (CleaningCompany cleaningCompany : cleaningCompanyList) {
//            System.out.println(cleaningCompany);
//        }
//    }
//}
