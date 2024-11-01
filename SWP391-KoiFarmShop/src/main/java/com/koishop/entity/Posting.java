package com.koishop.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import java.util.Date;

@Entity
@Getter
@Setter
public class Posting {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private int id;
    @NotBlank
    private String title;
    @NotBlank
    private String content;
    @ManyToOne
    @JoinColumn(name = "user_id")
    @NotNull(message = "User is required")
    private User author;
    @Temporal(TemporalType.DATE)
    private Date date;
    @NotNull
    private String image;
}
