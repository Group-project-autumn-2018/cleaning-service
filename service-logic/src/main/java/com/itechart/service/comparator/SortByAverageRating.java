package com.itechart.service.comparator;

import com.itechart.service.entity.CleaningCompany;

import java.util.Comparator;

public class SortByAverageRating implements Comparator<CleaningCompany> {
    @Override
    public int compare(CleaningCompany o1, CleaningCompany o2) {
        return o1.getAverageRating().compareTo(o2.getAverageRating());
    }
}
