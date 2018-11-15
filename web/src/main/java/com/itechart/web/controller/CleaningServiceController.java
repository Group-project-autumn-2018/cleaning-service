package com.itechart.web.controller;

import com.itechart.customer.dto.VerifyDto;
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

import java.io.IOException;
import java.util.Optional;

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
    public ResponseEntity register(@RequestBody CleaningCompanyDto objDto
            //, @RequestParam(name = "logotype", required = false) MultipartFile logotype
    ) throws IOException {
        //ObjectMapper mapper = new ObjectMapper();
        //CleaningCompanyDto registrationDto = mapper.readValue(objDto, CleaningCompanyDto.class);
        cleaningCompanyService.registerCompany(objDto, null);
        return ResponseEntity.status(HttpStatus.ACCEPTED).build();

    }

    @PostMapping("/verify")
    public ResponseEntity verify(@RequestBody VerifyDto verifyDto) {
        Optional<Boolean> result = cleaningCompanyService.verify(verifyDto);
        if (result.isPresent()) {
            ResponseEntity response;
            response = ResponseEntity.status(result.get() ? HttpStatus.CREATED : HttpStatus.NOT_ACCEPTABLE).build();
            return response;
        } else {
            return ResponseEntity.status(HttpStatus.LOCKED).build();
        }
    }

    @PostMapping("/rating")
    public ResponseEntity addRating(@RequestBody RatingDto ratingDto) {
        Long ratingId = ratingService.addRating(ratingDto);
        if (ratingId == 0) return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).build();
        else return ResponseEntity.status(HttpStatus.CREATED).build();
    }

}
