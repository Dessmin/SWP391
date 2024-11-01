package com.koishop.models.posting_model;

import lombok.Data;

@Data
public class PostingRequest {
    private String title;
    private String content;
    private String image;
}
