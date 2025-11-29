package com.example.scholarship.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;

import com.example.scholarship.model.Application;
import com.example.scholarship.model.Scholarship;
import com.example.scholarship.repository.ApplicationRepo;
import com.example.scholarship.repository.ScholarRepo;

@Service
public class Applicationservice {

    @Autowired
    private ApplicationRepo applicationrepo;

    @Autowired
    private ScholarRepo scholarshiprepo;

    public Application addapplication(@NonNull Application application) {
        return applicationrepo.save(application);
    }

    public List<Application> getallapp() {
        return applicationrepo.findAll();
    }

    public void statusOfApp(@NonNull Long id, String status) {
        Optional<Application> optionalApp = applicationrepo.findById(id);

        if (optionalApp.isPresent()) {
            Application app = optionalApp.get();
            app.setStatus(status);
            applicationrepo.save(app);
        } else {
            throw new RuntimeException("Application not found with ID: " + id);
        }
    }

    public String newscholarname(@NonNull Long Id) {
        Scholarship newscholar = scholarshiprepo.findById(Id)
                .orElseThrow(() -> new RuntimeException("Scholarship not found"));

        return newscholar.getScholarname();
    }

    public List<Application> getApplicationsByStudentId(Long studentId) {
        return applicationrepo.findByStudentId(studentId);
    }

}
