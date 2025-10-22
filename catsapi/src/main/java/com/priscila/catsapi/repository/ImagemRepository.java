package com.priscila.catsapi.repository;

import com.priscila.catsapi.model.Imagem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ImagemRepository extends JpaRepository<Imagem, Long> {
    List<Imagem> findByCategoriaContainingIgnoreCase(String categoria);
    List<Imagem> findByRacaId(String racaId);
}
