package com.itechart.service.entity;

import com.fasterxml.jackson.annotation.JsonProperty;

public enum Frequency {
    @JsonProperty("once")
    ONLY_ONCE,

    @JsonProperty("weekly")
    EVERY_WEEK,

    @JsonProperty("fortnightly")
    EVERY_TWO_WEEKS,

    @JsonProperty("monthly")
    EVERY_MONTH

}
