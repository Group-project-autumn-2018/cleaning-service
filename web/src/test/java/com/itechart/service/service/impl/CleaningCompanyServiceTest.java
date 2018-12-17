package com.itechart.service.service.impl;

//import java.util.Optional;
//
//import static org.mockito.MockitoAnnotations.initMocks;
//
//@RunWith(MockitoJUnitRunner.class)
//@SpringBootTest
//public class CleaningCompanyServiceTest {
//
//    @InjectMocks
//    private CleaningCompanyServiceImpl cleaningCompanyService;
//
//    @Mock
//    private CleaningCompanyRepository cleaningCompanyRepository;
//
//    private BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
//
//    @Mock
//    private EmailService emailService;
//
//    @Mock
//    private RoleService roleService;
//
//    @Mock
//    private SMSService smsService;
//
//    @Mock
//    private CleaningTypesService cleaningTypesService;
//
//    @Mock
//    private CleaningCompanyMapper mapper;
//
//    @Before
//    public void setup() {
//        initMocks(this);
//    }
//
//    private AddressDto getTestAddressDto() {
//        AddressDto address = new AddressDto();
//        address.setAddress("Gomel");
//        address.setLon(12.3);
//        address.setLat(42.2);
//        return address;
//    }
//
//    private CleaningTypesDto getTestCleaningTypesDto() {
//        CleaningTypesDto cleaningTypes = new CleaningTypesDto();
//        cleaningTypes.setId(1L);
//        cleaningTypes.setDryCarpetCleaning(false);
//        cleaningTypes.setFurnitureAndCoatingsCleaning(false);
//        cleaningTypes.setIndustrialCleaning(false);
//        cleaningTypes.setOfficeCleaning(false);
//        cleaningTypes.setPoolCleaning(false);
//        cleaningTypes.setRepairAndConstructionCleaning(false);
//        cleaningTypes.setSpringCleaning(false);
//        cleaningTypes.setStandardRoomCleaning(false);
//        PriceDto priceDto = getTestPriceDto();
//        cleaningTypes.setPrice(priceDto);
//        CleaningTimeDto cleaningTimeDto = geTestCleaningTimeDto();
//        cleaningTypes.setCleaningTime(cleaningTimeDto);
//        return cleaningTypes;
//    }
//
//    private CleaningTimeDto geTestCleaningTimeDto() {
//        CleaningTimeDto cleaningTimeDto = new CleaningTimeDto();
//        cleaningTimeDto.setId(1L);
//        cleaningTimeDto.setBathroomCleaningTime(10);
//        cleaningTimeDto.setBigRoomCleaningTime(10);
//        cleaningTimeDto.setSmallRoomCleaningTime(10);
//        cleaningTimeDto.setDryCarpetCleaningTime(10.0);
//        cleaningTimeDto.setFurnitureAndCoatingsCleaningTime(10.0);
//        cleaningTimeDto.setIndustrialCleaningTime(10.0);
//        cleaningTimeDto.setOfficeCleaningTime(10.0);
//        cleaningTimeDto.setPoolCleaningTime(10.0);
//        cleaningTimeDto.setRepairAndConstructionCleaningTime(10.0);
//        cleaningTimeDto.setSpringCleaningTime(10.0);
//        cleaningTimeDto.setStandardRoomCleaningTime(10.0);
//        return cleaningTimeDto;
//    }
//
//    private PriceDto getTestPriceDto() {
//        PriceDto priceDto = new PriceDto();
//        priceDto.setId(1L);
//        priceDto.setBasePrice(BigDecimal.TEN);
//        priceDto.setBathroom(10);
//        priceDto.setBigRoom(10);
//        priceDto.setSmallRoom(10);
//        priceDto.setDryCarpetCleaning(10);
//        priceDto.setFurnitureAndCoatingsCleaning(10);
//        priceDto.setIndustrialCleaning(10);
//        priceDto.setOfficeCleaning(10);
//        priceDto.setPoolCleaning(10);
//        priceDto.setRepairAndConstructionCleaning(10);
//        priceDto.setSpringCleaning(10);
//        priceDto.setStandardRoomCleaning(10);
//        return priceDto;
//    }
//
//    private CleaningCompanyDto getTestCompanyDto() {
//        CleaningCompanyDto companyDto = new CleaningCompanyDto();
//        companyDto.setId(1L);
//        companyDto.setAddingDate(LocalDate.now().toString());
//        companyDto.setBanned(false);
//        companyDto.setConfirmed(true);
//        companyDto.setEmail("smt@mail.ru");
//        companyDto.setDescription("smth");
//        companyDto.setPassword(bCryptPasswordEncoder.encode("123123"));
//        RoleDto roleDto = new RoleDto();
//        roleDto.setId(1L);
//        roleDto.setName("service");
//        companyDto.setRoles(Collections.singletonList(roleDto));
//        companyDto.setUsername("User");
//        AddressDto address = getTestAddressDto();
//        companyDto.setAddress(address);
//        CleaningTypesDto cleaningTypes = getTestCleaningTypesDto();
//        companyDto.setCleaningTypes(cleaningTypes);
//        return companyDto;
//    }
//
//    @Test
//    public void testUpdate() {
//        CleaningCompanyDto companyDto = getTestCompanyDto();
//        CleaningCompany cleaningCompany = new CleaningCompany();
//        cleaningCompany.setId(12L);
//        Mockito.when(mapper.mapCompanyDtoToCompany(companyDto)).thenReturn(cleaningCompany);
//        Mockito.when(cleaningCompanyRepository.findById(companyDto.getId())).thenReturn(Optional.empty());
//        Long updatedId = cleaningCompanyService.update(companyDto).getId();
//        Assert.assertEquals(12L, (long) updatedId);
//    }
//}
