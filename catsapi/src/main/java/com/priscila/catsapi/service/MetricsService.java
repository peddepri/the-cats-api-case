package com.priscila.catsapi.service;

import io.micrometer.core.instrument.MeterRegistry;
import io.micrometer.core.instrument.Counter;
import io.micrometer.core.instrument.Timer;
import org.springframework.stereotype.Service;

import java.util.concurrent.TimeUnit;

@Service
public class MetricsService {

    private final Counter customCounter;
    private final Timer customTimer;

    public MetricsService(MeterRegistry registry) {
        this.customCounter = Counter.builder("catsapi_custom_counter")
                .description("Número de vezes que o método foi chamado")
                .register(registry);

        this.customTimer = Timer.builder("catsapi_custom_timer")
                .description("Tempo de execução simulado")
                .register(registry);
    }

    public void contar() {
        customCounter.increment();
    }

    public void medirTempo() {
        customTimer.record(() -> {
            try {
                Thread.sleep(500);
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        });
    }
}
