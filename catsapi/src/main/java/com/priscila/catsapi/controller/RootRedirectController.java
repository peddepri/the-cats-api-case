package com.priscila.catsapi.controller;
import io.micrometer.core.instrument.Counter;
import io.micrometer.core.instrument.MeterRegistry;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.view.RedirectView;

@RestController
public class RootRedirectController {

    private final Counter accessCounter;
    private final Counter helloCounter;

    public RootRedirectController(MeterRegistry registry) {
        this.accessCounter = registry.counter("app_access_total", "endpoint", "/");
        this.helloCounter = registry.counter("app_hello_total", "endpoint", "/hello");
    }

/*
    @GetMapping("/")
    public RedirectView redirectToRacas() {
        return new RedirectView("/racas");
    }
*/

    @GetMapping("/")
    public String home() {
        accessCounter.increment();
        return "Bem-vinda ao TheCatsAPI!";
    }

 /*   @GetMapping("/hello")
    public String hello() {
        helloCounter.increment();
        return "Olá, mundo!";
    }*/
}

