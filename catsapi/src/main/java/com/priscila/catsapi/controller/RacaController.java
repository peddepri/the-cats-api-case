package com.priscila.catsapi.controller;

import com.priscila.catsapi.aop.MetricAndLog;
import com.priscila.catsapi.model.Imagem;
import com.priscila.catsapi.model.Raca;
import com.priscila.catsapi.repository.ImagemRepository;
import com.priscila.catsapi.repository.RacaRepository;
import com.priscila.catsapi.service.RacaService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/racas")
@RequiredArgsConstructor
public class RacaController {

    private final RacaService racaService;
    private final RacaRepository racaRepository;
    private final ImagemRepository imagemRepository;

    @MetricAndLog
    @PostMapping("/importar")
    public ResponseEntity<String> importar() {
        racaService.importarRacas();
        return ResponseEntity.ok("Raças importadas com sucesso!");
    }

    @MetricAndLog
    @GetMapping("/importar")
    public ResponseEntity<String> importarGet() {
        racaService.importarRacas();
        return ResponseEntity.ok("Raças importadas com sucesso!");
    }

    @MetricAndLog
    @GetMapping
    public ResponseEntity<List<Raca>> listarTodas() {
        return ResponseEntity.ok(racaRepository.findAll());
    }

    @MetricAndLog
    @GetMapping("/{id}")
    public ResponseEntity<Raca> buscarPorId(@PathVariable String id) {
        return racaRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @MetricAndLog
    @GetMapping("/{id}/imagens")
    public ResponseEntity<List<Imagem>> buscarImagensPorRaca(@PathVariable String id) {
        return ResponseEntity.ok(imagemRepository.findByRacaId(id));
    }

    @MetricAndLog
    @GetMapping("/temperamento/{valor}")
    public ResponseEntity<List<Raca>> buscarPorTemperamento(@PathVariable String valor) {
        return ResponseEntity.ok(racaRepository.findByTemperamentoContainingIgnoreCase(valor));
    }

    @MetricAndLog
    @GetMapping("/origem/{valor}")
    public ResponseEntity<List<Raca>> buscarPorOrigem(@PathVariable String valor) {
        return ResponseEntity.ok(racaRepository.findByOrigemContainingIgnoreCase(valor));
    }
}
