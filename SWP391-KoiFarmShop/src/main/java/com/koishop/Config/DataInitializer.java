package com.koishop.Config;

import com.koishop.entity.Role;
import com.koishop.entity.User;
import com.koishop.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class DataInitializer {

    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private UserRepository userRepository;

    @Bean
    public CommandLineRunner init() {
        return args -> {
            if (userRepository.findFirstByRole(Role.Manager) == null) {
                User manager = new User();
                manager.setUserName("Quang Long");
                manager.setPassword(passwordEncoder.encode("12345678")); // Set a secure password
                manager.setRole(Role.Manager);
                manager.setEmail("quanglong281381@gmail.com");
                manager.setJoinDate(new java.sql.Date(System.currentTimeMillis()));
                manager.setPhoneNumber("0933701262");
                manager.setAddress("54D Nguyen Du, Di An, Binh Duong");
                manager.setBalance(0.0);
                manager.setPointsBalance(0);
                manager.setDeleted(false);
                userRepository.save(manager);
                System.out.println("Manager user created");
            } else {
                System.out.println("Manager user already exists");
            }
        };
    }
}