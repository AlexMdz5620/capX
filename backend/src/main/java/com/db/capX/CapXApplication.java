package com.db.capX;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.stream.Stream;

@SpringBootApplication
public class CapXApplication {

	public static void main(String[] args) {
		loadEnv();
		SpringApplication.run(CapXApplication.class, args);
	}

	private static void loadEnv() {
        try (Stream<String> stream = Files.lines(Paths.get(".env"))) {
            stream.forEach(line -> {
                String[] keyValue = line.split("=", 2);
                if (keyValue.length == 2) {
                    System.setProperty(keyValue[0].trim(), keyValue[1].trim());
                }
            });
        } catch (IOException e) {
            System.err.println("Could not load .env file");
            e.printStackTrace();
        }
    }

}
