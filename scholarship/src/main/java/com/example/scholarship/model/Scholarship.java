package com.example.scholarship.model;

import java.util.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;

@Entity
public class Scholarship {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;

    private String scholarname;
    @Lob
    private String title;
    @Lob
    private String description;
    private String eligibility;

    @Lob
    private String requireddocuments;
    private Date deadline;
    private int amount;

    public Scholarship() {

    }

    public Scholarship(Long id, String scholarname, String title, String description, String eligibility,
            String requireddocuments, Date deadline, int amount) {
        Id = id;
        this.scholarname = scholarname;
        this.title = title;
        this.description = description;
        this.eligibility = eligibility;
        this.requireddocuments = requireddocuments;
        this.deadline = deadline;
        this.amount = amount;
    }

    public Long getId() {
        return Id;
    }

    public void setId(Long id) {
        Id = id;
    }

    public String getScholarname() {
        return scholarname;
    }

    public void setScholarname(String scholarname) {
        this.scholarname = scholarname;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getEligibility() {
        return eligibility;
    }

    public void setEligibility(String eligibility) {
        this.eligibility = eligibility;
    }

    public String getRequireddocuments() {
        return requireddocuments;
    }

    public void setRequireddocuments(String required_documents) {
        this.requireddocuments = required_documents;
    }

    public Date getDeadline() {
        return deadline;
    }

    public void setDeadline(Date deadline) {
        this.deadline = deadline;
    }

    public int getAmount() {
        return amount;
    }

    public void setAmount(int amount) {
        this.amount = amount;
    }

}
