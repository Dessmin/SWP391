package com.koishop.models.batch_model;

import com.koishop.models.fish_model.FishForList;
import lombok.Data;

import java.util.List;

@Data
public class BatchResponse {
    private List<BatchView> content;
    private int page;
    private long totalElements;
    private int totalPages;
}
