package com.koishop.models.user_model;

import com.koishop.entity.User;
import lombok.Data;

@Data
public class EmailDetail {
    private User user;
    private String subject;
    private String link;
}
