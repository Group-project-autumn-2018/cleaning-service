package com.itechart.service.specification;

import com.itechart.service.entity.Order;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;


public class OrderSpecification implements Specification<Order> {

    private SearchCriteria criteria;

    public OrderSpecification(final SearchCriteria criteria) {
        super();
        this.criteria = criteria;
    }

    public SearchCriteria getCriteria() {
        return criteria;
    }

    @Override
    public Predicate toPredicate
            (Root<Order> root, CriteriaQuery<?> query, CriteriaBuilder builder) {

        String field = criteria.getKey();
        String value = null;
        if (criteria.getValue() instanceof String) {
            value = ((String) criteria.getValue()).replaceAll("_", " ");
        }


        switch (field) {
            case "company": {
                return builder.like(builder.upper(root.get(field).get("username")), "%" + value.toUpperCase() + "%");
            }
            case "address": {
                return builder.like(builder.upper(root.get(field).get("address")), "%" + value.toUpperCase() + "%");
            }
            case "customer": {
                return builder.equal(root.get(field).get("id"), criteria.getValue());
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