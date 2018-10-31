//package com.itechart.customer.service;
//
//
//import com.itechart.customer.entity.Customer;
//import com.itechart.customer.repository.CustomerRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.CommandLineRunner;
//import org.springframework.stereotype.Component;
//
//@Component
//public class DatabaseLoader implements CommandLineRunner {
//
//    private final CustomerRepository repository;
//
//    @Autowired
//    public DatabaseLoader(CustomerRepository repository) {
//        this.repository = repository;
//    }
//
//    @Override
//    public void run(String... strings) throws Exception {
//        this.repository.save(new Customer("Mike Johnson", "123456", "mike@mail.com", "jlfjsdl", false, "jdjfgldf", "fjsdlfjlk", true, true));
//        this.repository.save(new Customer("John Doe", "123456", "john@mail.com", "jlfjsdl", false, "jdjfgldf", "fjsdlfjlk", true, true));
//        this.repository.save(new Customer("Jane Doe", "123456", "jane@mail.com", "jlfjsdl", false, "jdjfgldf", "fjsdlfjlk", true, true));
//    }
//}
