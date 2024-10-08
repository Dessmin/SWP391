package com.koishop.repository;

import com.koishop.entity.Origin;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OriginRepository extends JpaRepository<Origin, Integer> {

    Origin getOriginByOriginName(String origin);
}
