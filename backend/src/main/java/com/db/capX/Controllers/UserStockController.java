package com.db.capX.Controllers;

import com.db.capX.Entities.StockHolding;
import com.db.capX.Entities.User;
import com.db.capX.Repositories.StockHoldingRepository;
import com.db.capX.Repositories.UserRepository;

// import io.netty.handler.codec.http.HttpMethod;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
// import org.springframework.core.ParameterizedTypeReference;
// import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
// import org.springframework.web.client.RestTemplate;

import java.util.List;
// import java.util.Map;

@RestController
@RequestMapping("/users")
public class UserStockController {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private StockHoldingRepository stockHoldingRepository;

    // @Autowired
    // private RestTemplate restTemplate;

    @Value("${alpha.vantage.api.key}")
    private String apiKey;

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

    // Calcular el valor total del portafolio de un usuario
    // @GetMapping("/{userId}/portfolio/value")
    // public ResponseEntity<Double> getPortfolioValue(@PathVariable Long userId) {
    //     User user = userRepository.findById(userId)
    //             .orElseThrow(() -> new RuntimeException("Usuario no encontrado con ID: " + userId));

    //     double totalValue = user.getHoldings().stream()
    //             .mapToDouble(holding -> {
    //                 double currentPrice = getCurrentStockPrice(holding.getTicker());
    //                 return currentPrice * holding.getQuantity();
    //             })
    //             .sum();

    //     return ResponseEntity.ok(totalValue);
    // }

    // // Método simulado para obtener el precio actual del stock
    // public double getCurrentStockPrice(String ticker) {
    //     String url = "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol="
    //             + ticker + "&apikey=" + apiKey;

    //     try {
    //         // Crear un HttpEntity vacío (sin encabezados ni cuerpo)
    //         HttpEntity<Void> requestEntity = new HttpEntity<>(null);

    //         ResponseEntity<Map<String, Object>> response = restTemplate.exchange(
    //                 url,
    //                 HttpMethod.GET,
    //                 requestEntity,
    //                 new ParameterizedTypeReference<Map<String, Object>>() {
    //                 });

    //         if (response.getBody() == null) {
    //             throw new RuntimeException("El cuerpo de la respuesta es nulo para el ticker: " + ticker);
    //         }

    //         Object globalQuote = response.getBody().get("Global Quote");
    //         if (globalQuote instanceof Map<?, ?>) {
    //             Map<String, Object> quoteData = (Map<String, Object>) globalQuote;
    //             String priceString = (String) quoteData.get("05. price");
    //             return Double.parseDouble(priceString);
    //         } else {
    //             throw new RuntimeException("Estructura de datos inesperada para el ticker: " + ticker);
    //         }
    //     } catch (Exception e) {
    //         throw new RuntimeException("Error al obtener el precio de la acción: " + ticker, e);
    //     }
    // }

}
