package com.example.demo.repository;

import com.example.demo.entity.Origin;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OriginRepository extends JpaRepository<Origin, Integer> {

    Origin getOriginByOriginName(String origin);
}
