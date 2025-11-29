package com.example.scholarship.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.scholarship.model.Scholarship;

@Repository
public interface ScholarRepo extends JpaRepository<Scholarship, Long> {

}
