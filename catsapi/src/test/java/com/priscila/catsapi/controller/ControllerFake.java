package com.priscila.catsapi.controller;

import com.priscila.catsapi.aop.MetricAndLog;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/teste-aop")
public class ControllerFake {

    @MetricAndLog
    @GetMapping("/ok")
    public String sucesso() {
        return "Sucesso!";
    }

    @MetricAndLog
    @GetMapping("/erro")
    public String erro() {
        throw new RuntimeException("Erro simulado");
    }
}