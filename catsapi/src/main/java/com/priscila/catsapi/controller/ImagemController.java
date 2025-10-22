package com.priscila.catsapi.controller;

import com.priscila.catsapi.aop.MetricAndLog;
import com.priscila.catsapi.model.Imagem;
import com.priscila.catsapi.repository.ImagemRepository;
import com.priscila.catsapi.service.ImagemService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/imagens")
@RequiredArgsConstructor
public class ImagemController {
    private final ImagemService imagemService;
    private final ImagemRepository imagemRepository;

    @MetricAndLog
    @PostMapping("/importar/{categoria}")
    public ResponseEntity<String> importarPorCategoria(@PathVariable String categoria) {
        imagemService.importarImagensComCategoria(categoria, 5);
        return ResponseEntity.ok("Imagens da categoria '" + categoria + "' importadas com sucesso!");
    }

    @MetricAndLog
    @GetMapping("/importar/{categoria}")
    public ResponseEntity<String> importarPorCategoriaGet(@PathVariable String categoria) {
        imagemService.importarImagensComCategoria(categoria, 5);
        return ResponseEntity.ok("Imagens da categoria '" + categoria + "' importadas com sucesso!");
    }

    @MetricAndLog
    @GetMapping("/categoria/{categoria}")
    public ResponseEntity<List<Imagem>> buscarPorCategoria(@PathVariable String categoria) {
        return ResponseEntity.ok(imagemRepository.findByCategoriaContainingIgnoreCase(categoria));
    }

    @MetricAndLog
    @GetMapping
    public ResponseEntity<List<Imagem>> listarTodas() {
        return ResponseEntity.ok(imagemRepository.findAll());
    }

    // Manter compatibilidade com endpoints anteriores
    @MetricAndLog
    @PostMapping("/importar/chapeu")
    public ResponseEntity<String> importarChapeu() {
        imagemService.importarImagensComCategoria("chapeu", 1);
        return ResponseEntity.ok("Imagens de chapéu importadas com sucesso!");
    }

    @MetricAndLog
    @PostMapping("/importar/oculos")
    public ResponseEntity<String> importarOculos() {
        imagemService.importarImagensComCategoria("oculos", 4);
        return ResponseEntity.ok("Imagens de óculos importadas com sucesso!");
    }
}

