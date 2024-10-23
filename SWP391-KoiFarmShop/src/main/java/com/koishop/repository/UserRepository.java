package com.koishop.repository;

import com.koishop.entity.Role;
import com.koishop.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByUserName(String userName);
    User findByEmail(String email);
    Page<User> findAll(Pageable pageable);
    List<User> findAllByDeletedIsFalse();

    User findFirstByRole(Role role);
}