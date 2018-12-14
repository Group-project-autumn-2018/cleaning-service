package com.itechart.common.entity;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Size;

@Getter
@Setter
public class Address {
    @Size(min = 4, max = 100)
    private String address;

    private Double lat;

    private Double lon;
}
