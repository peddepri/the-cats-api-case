package com.priscila.catsapi.model;

import org.junit.jupiter.api.Test;

import java.util.Collections;

import static org.junit.jupiter.api.Assertions.*;

public class RacaTest {

    @Test
    void deveTestarGettersSettersEqualsHashCodeToString() {
        Raca raca1 = new Raca();
        raca1.setId("abc");
        raca1.setNome("Bengal");
        raca1.setDescricao("Raça muito ativa e inteligente.");
        raca1.setOrigem("Ásia");
        raca1.setTemperamento("Brincalhão");

        Raca raca2 = Raca.builder()
                .nome("Bengal")
                .descricao("Raça muito ativa e inteligente.")
                .origem("Ásia")
                .temperamento("Brincalhão")
                .build();
        raca2.setId("abc");

        assertEquals(raca1, raca2);
        assertEquals(raca1.hashCode(), raca2.hashCode());
        assertTrue(raca1.toString().contains("Bengal"));
        assertEquals("abc", raca1.getId());
        assertEquals("Bengal", raca1.getNome());
        assertEquals("Raça muito ativa e inteligente.", raca1.getDescricao());
        assertEquals("Ásia", raca1.getOrigem());
        assertEquals("Brincalhão", raca1.getTemperamento());

        Imagem imagem = new Imagem();
        imagem.setId(1L);
        imagem.setCategoria("categoria");
        imagem.setUrl("https://example.com/image.jpg");
        imagem.setRaca(raca1);

        raca1.setImagens(Collections.singletonList(imagem));
        assertEquals(1, raca1.getImagens().size());
        assertEquals(imagem, raca1.getImagens().get(0));
    }
}
