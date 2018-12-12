package com.itechart.web.controller;

import com.itechart.common.service.UserService;
import com.itechart.customer.dto.VerifyDto;
import com.itechart.service.dto.CleaningCompanyDto;
import com.itechart.service.dto.FeedbackDto;
import com.itechart.service.dto.SearchCompanyDto;
import com.itechart.service.entity.CleaningCompany;
import com.itechart.service.entity.Feedback;
import com.itechart.service.service.CleaningCompanyService;
import com.itechart.service.service.FeedbackService;
import com.itechart.service.service.SearchCompanyService;
import org.codehaus.jackson.map.DeserializationConfig;
import org.codehaus.jackson.map.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.security.Principal;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/cleaning")
public class CleaningServiceController {

    private Logger logger = LoggerFactory.getLogger(this.getClass());

    private final CleaningCompanyService cleaningCompanyService;

    private final SearchCompanyService searchCompanyService;

    private final FeedbackService feedbackService;

    private final UserService userService;

    @Autowired
    public CleaningServiceController(CleaningCompanyService cleaningCompanyService,
                                     SearchCompanyService searchCompanyService,
                                     FeedbackService feedbackService, UserService userService) {
        this.cleaningCompanyService = cleaningCompanyService;
        this.searchCompanyService = searchCompanyService;
        this.feedbackService = feedbackService;
        this.userService = userService;
    }

    @PostMapping("/search/companies")
    public List<CleaningCompany> searchCompanies(@RequestBody SearchCompanyDto searchCompanyDto) {
        String sort = searchCompanyDto.getSort();
        switch (sort) {
            case "":
                return searchCompanyService.search(searchCompanyDto);
            case "price":
                return searchCompanyService.sortByAveragePrice(searchCompanyDto);
            case "ranking":
                return searchCompanyService.sortByAverageRating(searchCompanyDto);
            case "remoteness":
                return searchCompanyService.sortByRemoteness(searchCompanyDto);
        }
        return null;
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

    @GetMapping("/search")
    public Page<CleaningCompany> getCompany(@RequestParam(value = "search", required = false) String search,
                                            Pageable pageable) {
        if (search != null) {
            return cleaningCompanyService.findPaginatedWithSearch(search, pageable);
        } else {
            return cleaningCompanyService.findPaginated(pageable);
        }

    }

    @PostMapping(value = "/{cleaningId}")
    public ResponseEntity update(@RequestParam(name = "logo", required = false) MultipartFile logo,
                                 @RequestParam(name = "company") String companyDto) {
        ObjectMapper mapper = new ObjectMapper();
        mapper.configure(DeserializationConfig.Feature.FAIL_ON_UNKNOWN_PROPERTIES, false);
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
    public ResponseEntity addFeedback(@RequestBody FeedbackDto feedbackDto, Principal principal) {
        Long ratingId = feedbackService.addFeedback(feedbackDto);
        if (ratingId == 0) return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).build();
        else return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @GetMapping("/feedback")
    public ResponseEntity getFeedback(@RequestParam(value = "count", required = false) Integer count,
                                      @RequestParam(value = "service-id") Long serviceId) {
        List<Feedback> feedback;
        if (count != null) {
            feedback = feedbackService.getTop(serviceId, count);
        } else {
            feedback = feedbackService.getAll(serviceId);
        }
        return ResponseEntity.ok(feedback);
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


    @GetMapping("/{id}/image")
    public ResponseEntity getLogo(@PathVariable Long id) throws IOException {
        return ResponseEntity.ok(cleaningCompanyService.getLogotype(id));
    }

    @GetMapping("/email")
    public ResponseEntity isEmailExists(@RequestParam(name = "email") String email) {
        return ResponseEntity.ok(userService.isEmailExists(email));
    }

    @ExceptionHandler(IOException.class)
    public ResponseEntity handleIOException(Exception ex) {
        logger.error(ex.getMessage());
        return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).build();
    }
}
