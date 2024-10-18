package com.koishop.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class Transactions {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "from_id")
    private User from;

    @ManyToOne
    @JoinColumn(name = "to_id")
    private User to;

    @ManyToOne
    @JoinColumn(name = "payment_id")
    @JsonIgnore
    private Payment payment;

    @Enumerated(EnumType.STRING)
    private TransactionsStatus status;

    private String description;
}
