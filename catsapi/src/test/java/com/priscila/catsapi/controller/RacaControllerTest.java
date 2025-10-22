package com.priscila.catsapi.controller;

import com.priscila.catsapi.model.Raca;
import com.priscila.catsapi.repository.RacaRepository;
import com.priscila.catsapi.service.RacaService;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

public class RacaControllerTest {

    @Mock
    private RacaService racaService;

    @Mock
    private RacaRepository racaRepository;

    @InjectMocks
    private RacaController controller;

    public RacaControllerTest() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void deveImportarRacas() {
        ResponseEntity<String> response = controller.importar();
        verify(racaService).importarRacas();
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("Raças importadas com sucesso!", response.getBody());
    }

    @Test
    void deveListarTodas() {
        when(racaRepository.findAll()).thenReturn(List.of(new Raca()));
        ResponseEntity<List<Raca>> response = controller.listarTodas();
        assertEquals(HttpStatus.OK, response.getStatusCode());
        List<Raca> body = response.getBody();
        assertEquals(1, body != null ? body.size() : 0);
    }

    @Test
    void deveBuscarPorIdExistente() {
        Raca raca = new Raca();
        when(racaRepository.findById("abc")).thenReturn(Optional.of(raca));
        ResponseEntity<Raca> response = controller.buscarPorId("abc");
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(raca, response.getBody());
    }

    @Test
    void deveRetornar404QuandoIdNaoEncontrado() {
        when(racaRepository.findById("abc")).thenReturn(Optional.empty());
        ResponseEntity<Raca> response = controller.buscarPorId("abc");
        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
    }

    @Test
    void deveBuscarPorTemperamento() {
        when(racaRepository.findByTemperamentoContainingIgnoreCase("docil"))
                .thenReturn(List.of(new Raca()));
        ResponseEntity<List<Raca>> response = controller.buscarPorTemperamento("docil");
        assertEquals(HttpStatus.OK, response.getStatusCode());
    }

    @Test
    void deveBuscarPorOrigem() {
        when(racaRepository.findByOrigemContainingIgnoreCase("Egito"))
                .thenReturn(List.of(new Raca()));
        ResponseEntity<List<Raca>> response = controller.buscarPorOrigem("Egito");
        assertEquals(HttpStatus.OK, response.getStatusCode());
    }
}
