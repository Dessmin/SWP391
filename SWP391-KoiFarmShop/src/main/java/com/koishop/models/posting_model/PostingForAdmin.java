package com.koishop.models.posting_model;

import lombok.Data;

@Data
public class PostingForAdmin {
    private String title;
    private String content;
    private String author;
    private String date;
    private String image;
}
