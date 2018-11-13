package com.itechart.web.controller;

import com.itechart.service.dto.CleaningCompanyDto;
import com.itechart.service.dto.RatingDto;
import com.itechart.service.entity.CleaningCompany;
import com.itechart.service.service.CleaningCompanyService;
import com.itechart.service.service.RatingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cleaning")
public class CleaningServiceController {

    private final CleaningCompanyService cleaningCompanyService;
    private final RatingService ratingService;

    @Autowired
    public CleaningServiceController(CleaningCompanyService cleaningCompanyService, RatingService ratingService) {
        this.cleaningCompanyService = cleaningCompanyService;
        this.ratingService = ratingService;
    }

    @GetMapping()
    public Page<CleaningCompany> findPaginated(@RequestParam("page") int page, @RequestParam("size") int size) {
        return cleaningCompanyService.findPaginated(page, size);
    }

    @PutMapping("/{cleaningId}")
    public void getOneById(@RequestBody CleaningCompany cleaningCompany) {
        cleaningCompanyService.update(cleaningCompany);
    }

    @PostMapping("/registration")
    public ResponseEntity register(@RequestBody CleaningCompanyDto registrationDto) {
        cleaningCompanyService.registerCompany(registrationDto);
        return ResponseEntity.status(HttpStatus.ACCEPTED).build();
    }

    @PostMapping("/rating")
    public ResponseEntity addRating(@RequestBody RatingDto ratingDto) {
        Long ratingId = ratingService.addRating(ratingDto);
        if (ratingId == 0) return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).build();
        else return ResponseEntity.status(HttpStatus.CREATED).build();
    }

}
