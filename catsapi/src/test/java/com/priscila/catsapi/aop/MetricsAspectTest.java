package com.priscila.catsapi.aop;

import com.priscila.catsapi.controller.ControllerFake;
import org.junit.jupiter.api.Test;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.ArgumentMatchers.any;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.context.annotation.Import;
import org.springframework.test.web.servlet.MockMvc;
import io.micrometer.core.instrument.MeterRegistry;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;


@WebMvcTest(ControllerFake.class)
@Import(MetricsAspect.class)
public class MetricsAspectTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private MeterRegistry meterRegistry;

    @Test
    void deveExecutarMetodoComSucesso() throws Exception {
        mockMvc.perform(get("/teste-aop/ok"))
                .andExpect(status().isOk())
                .andExpect(content().string("Sucesso!"));
    }

    @Test
    void deveExecutarMetodoComErro() throws Exception {
        mockMvc.perform(get("/teste-aop/erro"))
                .andExpect(status().is5xxServerError())
                .andExpect(content().string(org.hamcrest.Matchers.containsString("Erro tratado: Erro simulado")));
    }

    @Test
    void deveIgnorarErroDuranteMetricas() throws Exception {
        Mockito.when(meterRegistry.counter(anyString(), any(String[].class)))
                .thenThrow(new RuntimeException("Erro no registry"));

        mockMvc.perform(get("/teste-aop/ok"))
                .andExpect(status().isOk());
    }
}
