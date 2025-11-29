package com.example.scholarship.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.scholarship.model.Student;
import com.example.scholarship.repository.StudentRepository;

@Service
public class StudentService {

    @Autowired
    private StudentRepository sturepo;

    @Autowired
    private PasswordEncoder encoder;

    public void createstudent(Student student) {
        student.setPassword(encoder.encode(student.getPassword()));
        sturepo.save(student);
    }

    public Student updatestudent(Long Id, Student updatedStudent) {
        Student existingUser = sturepo.findById(Id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        existingUser.setName(updatedStudent.getName());
        existingUser.setEmail(updatedStudent.getEmail());
        existingUser.setAadharno(updatedStudent.getAadharno());
        existingUser.setPanno(updatedStudent.getPanno());
        existingUser.setMobileNo(updatedStudent.getMobileNo());
        existingUser.setPassword(encoder.encode(updatedStudent.getPassword()));
        return sturepo.save(existingUser);
    }

    public Optional<Student> findByEmail(String email) {
        return sturepo.findByEmail(email);
    }
}
