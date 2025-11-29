package com.example.scholarship.config;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.example.scholarship.repository.AdminRepo;
import com.example.scholarship.repository.StudentRepository;

@Service
public class CustomUserDetailService implements UserDetailsService {

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private AdminRepo adminRepo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        return studentRepository.findByEmail(username)
                .map(s -> new User(
                s.getEmail(),
                s.getPassword(),
                List.of(new SimpleGrantedAuthority("ROLE_STUDENT"))
        ))
                .or(() -> adminRepo.findByName(username)
                .map(a -> new User(
                a.getName(),
                a.getPassword(),
                List.of(new SimpleGrantedAuthority("ROLE_ADMIN"))
        )))
                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + username));
    }

}
