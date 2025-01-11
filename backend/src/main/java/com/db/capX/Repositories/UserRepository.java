package com.db.capX.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.db.capX.Entities.User;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);
}
