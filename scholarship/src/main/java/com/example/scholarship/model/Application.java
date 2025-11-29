package com.example.scholarship.model;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "Application")

public class Application {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private long studentId;
    private long scholarId;

    private String scholarname;

    private String status;

    private String driveLink;

    private LocalDateTime appliedTime;

    public Application() {
    }

    public Application(long id, long studentId, long scholarId, String scholarname, String status, String driveLink,
            LocalDateTime appliedTime) {
        this.id = id;
        this.studentId = studentId;
        this.scholarId = scholarId;
        this.scholarname = scholarname;
        this.status = status;
        this.driveLink = driveLink;
        this.appliedTime = appliedTime;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public long getStudentId() {
        return studentId;
    }

    public void setStudentId(long studentId) {
        this.studentId = studentId;
    }

    public long getScholarId() {
        return scholarId;
    }

    public void setScholarId(long scholarId) {
        this.scholarId = scholarId;
    }

    public String getScholarname() {
        return scholarname;
    }

    public void setScholarname(String scholarname) {
        this.scholarname = scholarname;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getDriveLink() {
        return driveLink;
    }

    public void setDriveLink(String driveLink) {
        this.driveLink = driveLink;
    }

    public LocalDateTime getAppliedTime() {
        return appliedTime;
    }

    public void setAppliedTime(LocalDateTime appliedTime) {
        this.appliedTime = appliedTime;
    }

}
