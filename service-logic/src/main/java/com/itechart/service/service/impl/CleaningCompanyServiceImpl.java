package com.itechart.service.service.impl;

import com.itechart.common.entity.Address;
import com.itechart.common.entity.Role;
import com.itechart.common.service.EmailService;
import com.itechart.common.service.RoleService;
import com.itechart.common.service.SMSService;
import com.itechart.customer.dto.VerifyDto;
import com.itechart.service.dto.CleaningCompanyDto;
import com.itechart.service.entity.CleaningCompany;
import com.itechart.service.mapper.CleaningCompanyMapper;
import com.itechart.service.repository.CleaningCompanyRepository;
import com.itechart.service.service.CleaningCompanyService;
import com.itechart.service.service.CleaningTypesService;
import com.itechart.service.specification.OrderSpecificationsBuilder;
import com.itechart.service.util.ServiceVerification;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.File;
import java.io.IOException;
import java.nio.charset.Charset;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;

@Service
public class CleaningCompanyServiceImpl implements CleaningCompanyService {

    @Autowired
    private CleaningCompanyMapper mapper;
    @Value("${logo.path}")
    private String FILE_PATH;
    private static final String DEFAULT_LOGO_URL =
            "https://cdn.pixabay.com/photo/2018/08/08/01/04/cleaning-service-3591146_640.png";
    private static final String DEFAULT_LOGO_NAME = "default-logo";
    private final CleaningCompanyRepository cleaningCompanyRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private ConcurrentMap<String, ServiceVerification> verifications = new ConcurrentHashMap<>();
    private final EmailService emailService;
    private final RoleService roleService;
    private final SMSService smsService;
    private final CleaningTypesService cleaningTypesService;
    private final RestTemplate restTemplate;
    private Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    public CleaningCompanyServiceImpl(CleaningCompanyRepository cleaningCompanyRepository,
                                      BCryptPasswordEncoder bCryptPasswordEncoder,
                                      EmailService emailService, RoleService roleService,
                                      SMSService smsService,
                                      CleaningTypesService cleaningTypesService,
                                      RestTemplate restTemplate) {
        this.cleaningCompanyRepository = cleaningCompanyRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
        this.emailService = emailService;
        this.roleService = roleService;
        this.smsService = smsService;
        this.cleaningTypesService = cleaningTypesService;
        this.restTemplate = restTemplate;
    }

    @Override
    public Page<CleaningCompany> findPaginated(int page, int size) {
        return cleaningCompanyRepository.findAll(PageRequest.of(page, size, Sort.by("username", "id")));
    }

    @Override
    public Page<CleaningCompany> findPaginated(Pageable pageable) {
        return cleaningCompanyRepository.findAll(pageable);
    }

    @Transactional
    @Override
    public CleaningCompany update(CleaningCompanyDto cleaningCompanyDto) {
        CleaningCompany company = mapper.mapCompanyDtoToCompany(cleaningCompanyDto);
        Optional<CleaningCompany> currentCompany = cleaningCompanyRepository.findById(company.getId());
        if (currentCompany.isPresent()) {
            if (cleaningCompanyDto.getPassword() == null || cleaningCompanyDto.getPassword().length() == 0) {
                company.setPassword(currentCompany.get().getPassword());
            } else {
                company.setPassword(bCryptPasswordEncoder.encode(cleaningCompanyDto.getPassword()));
            }
            company.setRoles(currentCompany.get().getRoles());
            company.setAddingDate(currentCompany.get().getAddingDate());
            company.setCleaningTypes(currentCompany.get().getCleaningTypes());
        } else {
            return null;
        }
        cleaningCompanyRepository.saveAndFlush(company);
        cleaningTypesService.saveTypes(cleaningCompanyDto.getCleaningTypes(), company);
        return company;
    }


    private Long saveCompany(CleaningCompanyDto registrationDto) {
        CleaningCompany company = new CleaningCompany();
        //logotype
        Address address = new Address();
        address.setAddress(registrationDto.getAddress().getAddress());
        address.setLat(registrationDto.getAddress().getLat());
        address.setLon(registrationDto.getAddress().getLon());
        company.setAddress(address);
        company.setBanned(false);
        company.setDescription(registrationDto.getDescription());
        company.setUsername(registrationDto.getUsername());
        company.setConfirmed(false);
        company.setEmail(registrationDto.getEmail());
        company.setPhone(registrationDto.getPhone());
        Role companyRole = roleService.getRole("service");
        company.setRoles(Collections.singletonList(companyRole));
        company.setPassword(bCryptPasswordEncoder.encode(registrationDto.getPassword()));
        company.setAddingDate(LocalDate.now());

        cleaningCompanyRepository.saveAndFlush(company);
        cleaningTypesService.
                saveTypes(registrationDto.getCleaningTypes(), company);

        return company.getId();
    }

    @Override
    public void saveLogotype(MultipartFile logotype, Long id) {
        try {
            if (logotype != null && logotype.getBytes().length > 0) {
                File file = new File(FILE_PATH);
                if (!file.exists()) {
                    file.mkdirs();
                }
                Files.write(Paths.get(FILE_PATH, id.toString()), logotype.getBytes());
            }
        } catch (IOException e) {
            logger.error(e.getMessage());
        }
    }

    @Override
    public byte[] getLogotype(Long serviceId) throws IOException {
        Path filePath = Paths.get(FILE_PATH, serviceId.toString());
        Path defaultLogoPath = Paths.get(FILE_PATH, DEFAULT_LOGO_NAME);
        if (Files.exists(filePath)) {
            return Files.readAllBytes(filePath);
        } else if (Files.exists(defaultLogoPath)) {
            return Files.readAllBytes(defaultLogoPath);
        } else {
            ResponseEntity<byte[]> responseEntity = restTemplate.exchange(DEFAULT_LOGO_URL, HttpMethod.GET,
                    new HttpEntity<Void>(new HttpHeaders()), byte[].class);
            if (responseEntity.hasBody() && responseEntity.getBody().length > 0) {
                Files.write(Paths.get(FILE_PATH, DEFAULT_LOGO_NAME), responseEntity.getBody());
            } else {
                throw new IOException("Error downloading default logo.");
            }
            return Files.readAllBytes(Paths.get(FILE_PATH, DEFAULT_LOGO_NAME));
        }
    }

    @Override
    public Page<CleaningCompany> findPaginatedWithSearch(String search, Pageable pageable) {
        //OrderSpecificationsBuilder

//        return null;
    }

    @Transactional
    @Override
    public void registerCompany(CleaningCompanyDto registrationDto, MultipartFile logotype) {
        Long serviceId = saveCompany(registrationDto);
        saveLogotype(logotype, serviceId);
        ServiceVerification verification = new ServiceVerification();
        verification.setServiceId(serviceId);
        verification.setAddingTime(LocalTime.now());
        verification.setTryCount(0);
        byte[] token = (registrationDto.getUsername() + registrationDto.getPassword())
                .getBytes(Charset.forName("UTF-8"));
        String encodedToken = Base64.getEncoder().encodeToString(token);
        double randomNum = Math.random();
        randomNum = (randomNum < 0.1) ? randomNum + 0.1 : randomNum;
        int randomCode = (int) (randomNum * 1_000_000);
        verification.setCode(randomCode);
        verifications.put(encodedToken, verification);
        String text = "Your verification code: " + randomCode;
        if (registrationDto.getEmail() != null && registrationDto.getEmail().length() > 0) {
            String subject = "Account activation " + LocalDate.now().toString();
            emailService.sendSimpleMessage(registrationDto.getEmail(), subject, text);
        } else if (registrationDto.getPhone() != null && registrationDto.getPhone().length() > 4) {
            smsService.sendSMS(registrationDto.getPhone(), text);
        }
    }

    @Override
    @Transactional
    public Optional<Boolean> verify(VerifyDto verifyDto) {
        if (verifyDto.getCode() == null || verifyDto.getEncodedString() == null) return Optional.empty();
        String encodedString = verifyDto.getEncodedString();
        int code = verifyDto.getCode();
        ServiceVerification verification = verifications.get(encodedString);
        if (verification == null) return Optional.empty();
        if (verification.getTryCount() >= 5) {
            verifications.remove(encodedString);
            return Optional.empty();
        }
        if (verification.getCode() == code) {
            cleaningCompanyRepository.changeConfirmStatus(true, verification.getServiceId());
            verifications.remove(encodedString);
            return Optional.of(true);
        } else {
            verification.setTryCount(verification.getTryCount() + 1);
            return Optional.of(false);
        }
    }

    @Scheduled(fixedDelay = 28_800_000)
    public void clearOldVerifications() {
        for (Map.Entry<String, ServiceVerification> entry : verifications.entrySet()) {
            long difference = LocalTime.now().toSecondOfDay() - entry.getValue().getAddingTime().toSecondOfDay();
            if (difference > 1200 || difference < -1200) {
                verifications.remove(entry.getKey());
            }
        }
    }

    @Override
    public CleaningCompany getOne(Long id) {
        Optional<CleaningCompany> companyOptional = cleaningCompanyRepository.findById(id);
        return companyOptional.orElse(null);
    }

    @Override
    public List<CleaningCompany> getAll() {
        return cleaningCompanyRepository.findAll();
    }
}
