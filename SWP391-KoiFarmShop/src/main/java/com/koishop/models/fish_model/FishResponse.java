package com.koishop.models.fish_model;

import lombok.Data;

import java.util.List;
@Data
public class FishResponse {
    private List<FishForList> content;
    private int page;
    private long totalElements;
    private int totalPages;
}
