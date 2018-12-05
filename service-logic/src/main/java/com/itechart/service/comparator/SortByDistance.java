package com.itechart.service.comparator;

import com.itechart.service.entity.CleaningCompany;

import java.util.Comparator;

public class SortByDistance implements Comparator<CleaningCompany> {
    @Override
    public int compare(CleaningCompany o1, CleaningCompany o2) {
        return o1.getDistance().compareTo(o2.getDistance());
    }
}
