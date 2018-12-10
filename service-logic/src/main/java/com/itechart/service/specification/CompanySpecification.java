package com.itechart.service.specification;

import com.itechart.service.entity.CleaningCompany;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

public class CompanySpecification implements Specification<CleaningCompany> {
    private SearchCriteria criteria;

    public CompanySpecification(final SearchCriteria criteria) {
        super();
        this.criteria = criteria;
    }

    public SearchCriteria getCriteria() {
        return criteria;
    }

    @Override
    public Predicate toPredicate
            (Root<CleaningCompany> root, CriteriaQuery<?> query, CriteriaBuilder builder) {

        String field = criteria.getKey();
        String value = null;
        if (criteria.getValue() instanceof String) {
            value = ((String) criteria.getValue()).replaceAll("_", " ");
        }


        switch (field) {
            case "company": {
                return builder.like(builder.upper(root.get("username")), "%" + value.toUpperCase() + "%");
            }
            case "cleaningType": {

                return builder.like(builder.upper(root.get("cleaningTypes").get(value)), "TRUE");
            }
            default: {
                if (criteria.getValue() instanceof String) {
                    return builder.equal(root.get(criteria.getKey()), value);
                }
                return builder.equal(root.get(criteria.getKey()), criteria.getValue());
            }
        }

    }
}
