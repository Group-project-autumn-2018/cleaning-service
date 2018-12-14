package com.itechart.service.specification;

import com.itechart.service.entity.CleaningCompany;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class CompanySpecificationBuilder {
    private final List<SearchCriteria> params;

    public CompanySpecificationBuilder() {
        params = new ArrayList<SearchCriteria>();
    }

    public CompanySpecificationBuilder with(String key, String operation, Object value) {
        params.add(new SearchCriteria(key, operation, value));
        return this;
    }

    public CompanySpecificationBuilder with(String key, Object value) {
        params.add(new SearchCriteria(key, value));
        return this;
    }

    public Specification<CleaningCompany> build() {
        if (params.size() == 0) {
            return null;
        }

        List<Specification<CleaningCompany>> specs = params.stream()
                .map(CompanySpecification::new)
                .collect(Collectors.toList());

        Specification<CleaningCompany> result = specs.get(0);

        for (int i = 1; i < params.size(); i++) {
            result = Specification.where(result).and(specs.get(i));
        }
        return result;
    }
}
