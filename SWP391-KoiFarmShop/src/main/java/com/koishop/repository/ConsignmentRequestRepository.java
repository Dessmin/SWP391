package com.koishop.repository;

import com.koishop.entity.ConsignmentRequest;
import com.koishop.entity.ConsignmentType;
import com.koishop.entity.KoiFish;
import com.koishop.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ConsignmentRequestRepository extends JpaRepository<ConsignmentRequest, Integer> {
    List<ConsignmentRequest> findByConsignmentType (ConsignmentType consignmentType);
}
