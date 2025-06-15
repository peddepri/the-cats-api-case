
package com.priscila.catsapi.controller;

import io.micrometer.core.instrument.Counter;
import io.micrometer.core.instrument.MeterRegistry;
import io.micrometer.core.instrument.Timer;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.concurrent.TimeUnit;

@RestController
public class MetricsController {

    private final Counter accessCounter;
    private final Timer processingTimer;

    public MetricsController(MeterRegistry meterRegistry) {
        // Cria um contador personalizado
        this.accessCounter = Counter.builder("catsapi.access.count")
                .description("Número de acessos ao endpoint /metrics-test")
                .register(meterRegistry);

        // Cria um timer personalizado
        this.processingTimer = Timer.builder("catsapi.processing.time")
                .description("Tempo de processamento do endpoint /metrics-test")
                .register(meterRegistry);
    }

    @GetMapping("/metrics-test")
    public String metricTest() {
        accessCounter.increment(); // incrementa o contador
        long start = System.nanoTime();

        // Simula um processamento
        try {
            Thread.sleep(500); // simula um delay de 500ms
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }

        long end = System.nanoTime();
        processingTimer.record(end - start, TimeUnit.NANOSECONDS); // grava o tempo

        return "Métrica registrada!";
    }
}