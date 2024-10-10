package com.koishop.models.fish_model;

import lombok.Data;

import java.math.BigDecimal;
@Data
public class FishForCart {
    private int id;
    private String fishName;
    private BigDecimal price;
    private String image;
}
