package com.koishop.models.fish_model;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class FishForList {
    private int id;
    private String fishName;
    private String breed;
    private String origin;
    private Double size;
    private Double price;
    private String image;
}
