package com.itechart.service.mapper;

import com.itechart.common.entity.Address;
import com.itechart.common.entity.Role;
import com.itechart.service.dto.*;
import com.itechart.service.entity.CleaningCompany;
import com.itechart.service.entity.CleaningTime;
import com.itechart.service.entity.CleaningTypes;
import com.itechart.service.entity.Price;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public abstract class CleaningCompanyMapper {
    public abstract CleaningCompanyDto mapCompanyToCompanyDto(CleaningCompany company);

    //@Mapping(target = "addingDate", source = "companyDto.addingDate", dateFormat = "yyyy.MM.dd")
    public abstract CleaningCompany mapCompanyDtoToCompany(CleaningCompanyDto companyDto);

    public abstract Address mapAddressDtoToAddress(AddressDto addressDto);

    public abstract AddressDto mapAddressToAddressDto(Address address);

    public abstract Price mapPriceDtoToPrice(PriceDto priceDto);

    public abstract PriceDto mapPriceToPriceDto(Price price);

    public abstract CleaningTime mapCleaningTimeDtoToCleaningTime(CleaningTimeDto cleaningTimeDto);

    public abstract CleaningTimeDto mapCleaningTimeToCleaningTimeDto(CleaningTime cleaningTime);

    public abstract CleaningTypesDto mapCleaningTypesToCleaningTypesDto(CleaningTypes cleaningTypes);

    public abstract CleaningTypes mapCleaningTypesDtoToCleaningTypes(CleaningTypesDto cleaningTypesDto);

    public abstract Role mapRoleDtoToRole(RoleDto roleDto);

    public abstract RoleDto mapRoleToRoleDto(Role role);
}
