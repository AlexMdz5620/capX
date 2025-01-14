package com.db.capX.Controllers;

import com.db.capX.Entities.StockHolding;
import com.db.capX.Entities.User;
import com.db.capX.Repositories.StockHoldingRepository;
import com.db.capX.Repositories.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserStockController {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private StockHoldingRepository stockHoldingRepository;

    // Obtener todas las tenencias de un usuario
    @GetMapping("/{userId}/holdings")
    public ResponseEntity<List<StockHolding>> getUserHoldings(@PathVariable Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado con ID: " + userId));

        return ResponseEntity.ok(user.getHoldings());
    }

    // Agregar una tenencia a un usuario
    @PostMapping("/{userId}/holdings")
    public ResponseEntity<String> addStockHolding(@PathVariable Long userId, @RequestBody StockHolding holding) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado con ID: " + userId));

        System.out.println("StockHolding received: " + holding);

        holding.setUser(user);
        stockHoldingRepository.save(holding);

        return ResponseEntity.status(HttpStatus.CREATED).body("Stock añadido exitosamente");
    }

    // Editar una tenencia de un usuario
    @PutMapping("/{userId}/holdings/{holdingId}")
    public ResponseEntity<String> updateStockHolding(
            @PathVariable Long userId,
            @PathVariable Long holdingId,
            @RequestBody StockHolding updatedHolding) {
        StockHolding holding = stockHoldingRepository.findById(holdingId)
                .orElseThrow(() -> new RuntimeException("Tenencia no encontrada con ID: " + holdingId));

        if (!holding.getUser().getId().equals(userId)) {
            throw new RuntimeException("Esta tenencia no pertenece al usuario con ID: " + userId);
        }

        holding.setQuantity(updatedHolding.getQuantity());
        holding.setBuyPrice(updatedHolding.getBuyPrice());
        stockHoldingRepository.save(holding);

        return ResponseEntity.ok("Tenencia actualizada exitosamente");
    }

    // Eliminar una tenencia de un usuario
    @DeleteMapping("/{userId}/holdings/{holdingId}")
    public ResponseEntity<String> deleteStockHolding(
            @PathVariable Long userId,
            @PathVariable Long holdingId) {
        StockHolding holding = stockHoldingRepository.findById(holdingId)
                .orElseThrow(() -> new RuntimeException("Tenencia no encontrada con ID: " + holdingId));

        if (!holding.getUser().getId().equals(userId)) {
            throw new RuntimeException("Esta tenencia no pertenece al usuario con ID: " + userId);
        }

        stockHoldingRepository.delete(holding);

        return ResponseEntity.ok("Tenencia eliminada exitosamente");
    }

}
