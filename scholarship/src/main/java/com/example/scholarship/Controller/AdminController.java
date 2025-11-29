package com.example.scholarship.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.scholarship.config.JwtUtil;
import com.example.scholarship.model.LoginRequest;
import com.example.scholarship.model.LoginResponse;
import com.example.scholarship.model.Scholarship;
import com.example.scholarship.service.AdminService;
import com.example.scholarship.service.Applicationservice;
import com.example.scholarship.service.ScholarshipService;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private AdminService adminservice;

    @Autowired
    private ScholarshipService scholarservice;

    @Autowired
    private Applicationservice applicationservice;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/login")
    public ResponseEntity<?> adminLogin(@RequestBody LoginRequest req) {
        try {
            org.springframework.security.core.Authentication auth = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(req.getUsername(), req.getPassword())
            );

            com.example.scholarship.model.Admin admin = adminservice.findByName(req.getUsername()).get();

            String token = jwtUtil.generateToken(req.getUsername(), "ADMIN");

            return ResponseEntity.ok(new LoginResponse(
                    token,
                    admin.getId(),
                    "ADMIN"
            ));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Invalid username or password");
        }
    }

    @PostMapping("/scholarship")
    public String postMethodName(@RequestBody Scholarship scholarship) {
        scholarservice.addscholar(scholarship);
        return "schaolrship added";
    }

    @GetMapping("/scholarship/all")
    public List<Scholarship> getall() {
        return scholarservice.getAll();
    }

    @PutMapping("/scholarship/update/{id}")
    public Scholarship updateScholarship(@PathVariable Long id, @RequestBody Scholarship s) {
        return scholarservice.updateScholar(id, s);
    }

    @DeleteMapping("/scholarship/delete/{id}")
    public void deleteScholarship(@PathVariable Long id) {
        scholarservice.deletescholar(id);
    }

    @GetMapping("/applications")
    public List<com.example.scholarship.model.Application> getallapp() {
        return applicationservice.getallapp();
    }

    @PutMapping("/application/acc/{id}")
    public void acceptapp(@PathVariable Long id) {
        applicationservice.statusOfApp(id, "APPROVED");
    }

    @PutMapping("/application/rejected/{id}")
    public void rejectapp(@PathVariable Long id) {
        applicationservice.statusOfApp(id, "REJECTED");
    }
}
