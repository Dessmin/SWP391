package com.koishop.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Date;

@Entity
@Getter
@Setter
public class ConsignmentRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private Integer consignmentID;

    @NotNull(message = "User ID is required")
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @NotNull(message = "Koi ID is required")
    @OneToOne
    @JoinColumn(name = "koifish_id")
    private KoiFish koiFish;


    @FutureOrPresent(message = "Start date must be in the present or future")
    private LocalDate startDate;


    @Future(message = "End date must be in the future")
    private LocalDate endDate;

    @NotNull(message = "Consignment type is required")
    @Enumerated(EnumType.STRING)
    private ConsignmentType consignmentType;

    @NotNull(message = "Status is required")
    private String status;

    private double shopPrice;

    @ManyToOne
    @JoinColumn(name = "pack_id")
    private Pack pack;

}
