package com.example.demo.models.user_model;

import com.example.demo.entity.User;
import lombok.Data;

@Data
public class EmailDetail {
    private User user;
    private String subject;
    private String link;
}
