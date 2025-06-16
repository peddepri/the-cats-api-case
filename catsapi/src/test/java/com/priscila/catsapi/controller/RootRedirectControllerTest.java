package com.priscila.catsapi.controller;

import io.micrometer.core.instrument.Counter;
import io.micrometer.core.instrument.simple.SimpleMeterRegistry;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class RootRedirectControllerTest {

    @Test
    void deveRetornarMensagemInicial() {
        SimpleMeterRegistry registry = new SimpleMeterRegistry();
        RootRedirectController controller = new RootRedirectController(registry);

        String response = controller.home();

        assertEquals("Bem-vinda ao TheCatsAPI!", response);
    }
}
