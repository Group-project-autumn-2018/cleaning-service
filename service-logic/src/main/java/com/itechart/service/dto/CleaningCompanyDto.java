package com.itechart.service.dto;

import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

@Data
public class CleaningCompanyDto {
    private Long id;
    private Integer averageRating;
    private String username;
    private String phone;
    private String email;
    private String password;
    private String description;
    private Boolean banned;
    private String banReason;
    private String addingDate;
    private List<RoleDto> roles;
    private Boolean confirmed;
    private AddressDto address;
    private BigDecimal price;
    private CleaningTypesDto cleaningTypes;
}
