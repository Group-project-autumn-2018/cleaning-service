package com.itechart.web.controller;

import com.itechart.customer.dto.VerifyDto;
import com.itechart.service.dto.CleaningCompanyDto;
import com.itechart.service.dto.FeedbackDto;
import com.itechart.service.entity.CleaningCompany;
import com.itechart.service.service.CleaningCompanyService;
import com.itechart.service.service.FeedbackService;
import org.codehaus.jackson.map.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

@RestController
@RequestMapping("/api/cleaning")
public class CleaningServiceController {

    private Logger logger = LoggerFactory.getLogger(this.getClass());

    private final CleaningCompanyService cleaningCompanyService;

    private final FeedbackService feedbackService;

    @Autowired
    public CleaningServiceController(CleaningCompanyService cleaningCompanyService, FeedbackService feedbackService) {
        this.cleaningCompanyService = cleaningCompanyService;
        this.feedbackService = feedbackService;
    }

    @PostMapping("/registration/service")
    public ResponseEntity saveService(@RequestParam(value = "objDto") String companyDto,
                                      @RequestParam(value = "logotype", required = false) MultipartFile logo) {
        ObjectMapper mapper = new ObjectMapper();
        CleaningCompanyDto cleaningCompanyDto = null;
        try {
            cleaningCompanyDto = mapper.readValue(companyDto, CleaningCompanyDto.class);
        } catch (IOException e) {
            logger.warn(e.getMessage());
        }
        cleaningCompanyService.registerCompany(cleaningCompanyDto, logo);
        return ResponseEntity.status(HttpStatus.ACCEPTED).build();

    }

    @GetMapping()
    public Page<CleaningCompany> findPaginated(@RequestParam("page") int page, @RequestParam("size") int size) {
        return cleaningCompanyService.findPaginated(page, size);
    }

    @PostMapping(value = "/{cleaningId}")
    public ResponseEntity update(@RequestParam(name = "logo", required = false) MultipartFile logo,
                                 @RequestParam(name = "company") String companyDto) {
        ObjectMapper mapper = new ObjectMapper();
        CleaningCompanyDto cleaningCompanyDto = null;
        try {
            cleaningCompanyDto = mapper.readValue(companyDto, CleaningCompanyDto.class);
        } catch (IOException e) {
            logger.warn(e.getMessage());
        }
        cleaningCompanyService.update(cleaningCompanyDto);
        cleaningCompanyService.saveLogotype(logo, cleaningCompanyDto.getId());
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @GetMapping("/{cleaningId}")
    public ResponseEntity getOne(@PathVariable Long cleaningId) {
        return ResponseEntity.ok(cleaningCompanyService.getOne(cleaningId));
    }

    @PostMapping("/feedback")
    public ResponseEntity addFeedback(@RequestBody FeedbackDto feedbackDto) {
        Long ratingId = feedbackService.addFeedback(feedbackDto);
        if (ratingId == 0) return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).build();
        else return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PostMapping("/registration")
    public ResponseEntity register(@RequestBody CleaningCompanyDto objDto
                                   //, @RequestParam(name = "logotype", required = false) MultipartFile logotype
    ) {
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
}
