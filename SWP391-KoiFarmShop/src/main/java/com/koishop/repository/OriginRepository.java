package com.koishop.repository;

import com.koishop.entity.Origin;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OriginRepository extends JpaRepository<Origin, Integer> {

    Origin getOriginByOriginName(String origin);
    List<Origin> findAllByDeletedIsFalse();
}
