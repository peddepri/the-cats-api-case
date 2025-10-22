package com.priscila.catsapi.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class ApiController {

    @GetMapping("/health")
    public ResponseEntity<Map<String, Object>> health() {
        Map<String, Object> status = new HashMap<>();
        status.put("status", "UP");
        status.put("timestamp", LocalDateTime.now());
        status.put("service", "Cats API");
        status.put("version", "1.0.0");
        return ResponseEntity.ok(status);
    }

    @GetMapping("/info")
    public ResponseEntity<Map<String, Object>> info() {
        Map<String, Object> info = new HashMap<>();
        info.put("service", "Cats API");
        info.put("description", "API para gerenciar raças de gatos e suas imagens");
        info.put("version", "1.0.0");
        info.put("springBootVersion", "3.4.1");
        info.put("javaVersion", System.getProperty("java.version"));
        
        Map<String, String> endpoints = new HashMap<>();
        endpoints.put("GET /racas", "Listar todas as raças");
        endpoints.put("POST /racas/importar", "Importar raças da API externa");
        endpoints.put("GET /racas/importar", "Importar raças da API externa (alternativo)");
        endpoints.put("GET /racas/{id}", "Buscar raça por ID");
        endpoints.put("GET /imagens", "Listar todas as imagens");
        endpoints.put("POST /imagens/importar/{categoria}", "Importar imagens por categoria");
        endpoints.put("GET /imagens/categoria/{categoria}", "Buscar imagens por categoria");
        
        info.put("endpoints", endpoints);
        return ResponseEntity.ok(info);
    }
}