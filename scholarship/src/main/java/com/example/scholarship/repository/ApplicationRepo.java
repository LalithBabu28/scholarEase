package com.example.scholarship.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.scholarship.model.Application;

@Repository
public interface ApplicationRepo extends JpaRepository<Application, Long> {

    List<Application> findByStudentId(Long studentId);
}
