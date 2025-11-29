package com.example.scholarship.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.scholarship.model.Scholarship;
import com.example.scholarship.repository.ScholarRepo;

import io.micrometer.common.lang.NonNull;

@Service
public class ScholarshipService {

    @Autowired
    private ScholarRepo scholar;

    public Scholarship addscholar(@NonNull Scholarship scholarship) {
        return scholar.save(scholarship);
    }

    public Scholarship updateScholar(@NonNull Long id, Scholarship updatedData) {

        Scholarship existingScholarship = scholar.findById(id)
                .orElseThrow(() -> new RuntimeException("Scholarship not found"));
        existingScholarship.setScholarname(updatedData.getScholarname());
        existingScholarship.setTitle(updatedData.getTitle());
        existingScholarship.setDescription(updatedData.getDescription());
        existingScholarship.setEligibility(updatedData.getEligibility());
        existingScholarship.setRequireddocuments(updatedData.getRequireddocuments());
        existingScholarship.setDeadline(updatedData.getDeadline());
        existingScholarship.setAmount(updatedData.getAmount());

        return scholar.save(existingScholarship);
    }

    public Scholarship getScholarbyid(@NonNull Long Id) {
        return scholar.findById(Id)
                .orElse(null);
    }

    public List<Scholarship> getAll() {
        return scholar.findAll();
    }

    public void deletescholar(@NonNull Long id) {
        scholar.deleteById(id);
    }

}
