package com.db.capX.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.db.capX.Entities.User;
import com.db.capX.Repositories.UserRepository;

@RestController
@RequestMapping("/users")
public class AuthController {
    @Autowired
    private final UserRepository userRepository;

    public AuthController(UserRepository userRepository){
        this.userRepository = userRepository;
    }

    // Register
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        if (user.getEmail() == null || user.getEmail().isEmpty()){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("El correo electrónico es requerido");
        }
        if (userRepository.findByEmail(user.getEmail()) != null) {
            return  ResponseEntity.status(HttpStatus.BAD_REQUEST).body("El correo electrónico ya esta registrado");
        }

        User userRegister = userRepository.save(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(userRegister);
    }

    // Login
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        User existingUser = userRepository.findByEmail(user.getEmail());
        if (existingUser != null && existingUser.getPassword().equals(user.getPassword())) {
            return ResponseEntity.ok(existingUser);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenciales inválidas");
        }
    }
}
