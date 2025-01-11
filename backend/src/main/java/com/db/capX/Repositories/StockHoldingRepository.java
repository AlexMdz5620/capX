package com.db.capX.Repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.db.capX.Entities.StockHolding;

public interface StockHoldingRepository extends JpaRepository<StockHolding, Long> {
    List<StockHolding> findByUserId(Long userId);
}
