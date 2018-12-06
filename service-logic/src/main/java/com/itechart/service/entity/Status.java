package com.itechart.service.entity;

import com.fasterxml.jackson.annotation.JsonProperty;

public enum Status {

    @JsonProperty("New")
    NEW,

    @JsonProperty("Confirmed")
    CONFIRMED,

    @JsonProperty("Rejected")
    REJECTED,

    @JsonProperty("Completed")
    COMPLETED
}
