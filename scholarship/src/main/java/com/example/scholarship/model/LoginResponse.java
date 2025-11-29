package com.example.scholarship.model;

public class LoginResponse {

    private String token;
    private String tokenType = "Bearer";
    private Long userId;
    private String role;

    public LoginResponse(String token, Long userId, String role) {
        this.token = token;
        this.userId = userId;
        this.role = role;
    }

    public String getToken() {
        return token;
    }

    public String getTokenType() {
        return tokenType;
    }

    public Long getUserId() {
        return userId;
    }

    public String getRole() {
        return role;
    }
}
