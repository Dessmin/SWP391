package com.example.demo.models.fish_model;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class FishForList {
    private String fishName;
    private String breed;
    private String origin;
    private Double size;
    private BigDecimal price;
    private String image;
}
