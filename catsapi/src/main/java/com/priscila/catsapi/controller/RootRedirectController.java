package com.priscila.catsapi.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.net.URI;

@RestController
public class RootRedirectController {

    @GetMapping("/")
    public ResponseEntity<Void> redirectToRacas() {
        return ResponseEntity.status(HttpStatus.FOUND)
                .location(URI.create("/racas"))
                .build();
    }
}


