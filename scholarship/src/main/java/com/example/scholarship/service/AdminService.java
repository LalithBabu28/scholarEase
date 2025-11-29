package com.example.scholarship.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.scholarship.model.Admin;
import com.example.scholarship.repository.AdminRepo;

import jakarta.annotation.PostConstruct;

@Service
public class AdminService {

    @Autowired
    private AdminRepo adminrepo;

    @Autowired
    private PasswordEncoder passencode;

    @PostConstruct
    public void createDefaultAdmin() {
        if (adminrepo.count() == 0) {
            Admin admin = new Admin();
            admin.setName("Admin");
            admin.setPassword(passencode.encode("admin"));
            adminrepo.save(admin);
            System.out.println("Default Admin Created: Admin/admin");
        }
    }

    public Optional<Admin> findByName(String name) {
        return adminrepo.findByName(name);
    }
}
