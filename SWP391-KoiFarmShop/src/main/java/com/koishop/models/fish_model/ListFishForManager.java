package com.koishop.models.fish_model;

import lombok.Data;

@Data
public class ListFishForManager {
    private int id;
    private String fishName;
    private String breed;
    private String origin;
    private Double size;
    private Double price;
    private String image;
    private Boolean isForSale;
    private Boolean deleted;
}
