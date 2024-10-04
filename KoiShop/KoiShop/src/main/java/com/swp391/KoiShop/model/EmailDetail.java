package com.swp391.KoiShop.model;

import com.swp391.KoiShop.entity.User;
import lombok.Data;

@Data
public class EmailDetail {
    private User user;
    private String subject;
    private String link;
}
