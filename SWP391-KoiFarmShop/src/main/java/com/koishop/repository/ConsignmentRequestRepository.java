package com.koishop.repository;

import com.koishop.entity.ConsignmentRequest;
import com.koishop.entity.KoiFish;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ConsignmentRequestRepository extends JpaRepository<ConsignmentRequest, Integer> {
    ConsignmentRequest findByKoiFish(KoiFish fish);
}
