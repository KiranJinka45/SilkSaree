package com.silksaree.repository;

import com.silksaree.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
    org.springframework.data.domain.Page<Product> findByNameContainingIgnoreCase(String name,
            org.springframework.data.domain.Pageable pageable);
}
