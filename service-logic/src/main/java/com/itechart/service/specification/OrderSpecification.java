package com.itechart.service.specification;

import com.itechart.service.entity.Order;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.*;


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


        switch (field) {
            case "company": {
                return builder.like(root.get(field).get("username"), "%" + criteria.getValue() + "%");
            }
            case "address": {
                return builder.like(root.get(field).get("address"), "%" + criteria.getValue() + "%");
            }
            case "customer": {
                return builder.equal(root.get(field).get("id"), criteria.getValue());
            }
            default: {
                return builder.equal(root.get(criteria.getKey()), criteria.getValue());
            }
        }

    }
}