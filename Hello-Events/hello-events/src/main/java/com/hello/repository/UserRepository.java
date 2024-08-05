package com.hello.repository;

import com.hello.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User,Long> {
    User findByUsername(String userName);
    boolean existsByEmail(String email);

}
