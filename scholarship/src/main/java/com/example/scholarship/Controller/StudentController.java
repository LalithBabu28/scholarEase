package com.example.scholarship.Controller;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
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
import com.example.scholarship.model.Student;
import com.example.scholarship.service.Applicationservice;
import com.example.scholarship.service.ScholarshipService;
import com.example.scholarship.service.StudentService;

@RestController
@RequestMapping("/api/student")
public class StudentController {

    @Autowired
    private StudentService studentService;

    @Autowired
    private ScholarshipService scholarservice;

    @Autowired
    private Applicationservice applicationservice;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/register")
    public String createStudent(@RequestBody Student student) {
        studentService.createstudent(student);
        return "student added";
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest req) {
        try {
            Authentication auth = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(req.getUsername(), req.getPassword())
            );

            Student student = studentService.findByEmail(req.getUsername()).get();

            String token = jwtUtil.generateToken(req.getUsername(), "STUDENT");

            return ResponseEntity.ok(new LoginResponse(
                    token,
                    student.getId(),
                    "STUDENT"
            ));
        } catch (BadCredentialsException ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
    }

    @PutMapping("/update/{id}")
    public String updateprofile(@PathVariable Long id, @RequestBody Student student) {
        studentService.updatestudent(id, student);
        return "updated";
    }

    @GetMapping("/scholarship/all")
    public List<Scholarship> getall() {
        return scholarservice.getAll();
    }

    @PostMapping("/apply")
    public String apply(@RequestBody com.example.scholarship.model.Application application) {
        Long Id = application.getScholarId();
        application.setScholarname(applicationservice.newscholarname(Id));
        application.setStatus("PENDING");
        application.setAppliedTime(LocalDateTime.now());
        applicationservice.addapplication(application);
        return "Application Submitted";
    }

    @GetMapping("/application/{studentId}")
    public List<com.example.scholarship.model.Application> getApplicationsByStudentId(@PathVariable Long studentId) {
        return applicationservice.getApplicationsByStudentId(studentId);
    }
}
