package com.priscila.catsapi.model;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

public class ImagemTest {

    @Test
    void deveTestarGettersSettersEqualsHashCodeToString() {
        Raca raca = new Raca();
        raca.setId("abc");

        // Objeto 1 criado com setters
        Imagem imagem1 = new Imagem();
        imagem1.setId(1L);
        imagem1.setUrl("https://example.com/image.jpg");
        imagem1.setCategoria("categoria");
        imagem1.setRaca(raca);

        // Objeto 2 criado com builder (sem o ID, que será setado depois)
        Imagem imagem2 = Imagem.builder()
                .url("https://example.com/image.jpg")
                .categoria("categoria")
                .raca(raca)
                .build();
        imagem2.setId(1L); // Como o builder não deixa usar `.id()`, setamos aqui

        // Testes
        assertEquals(imagem1, imagem2);
        assertEquals(imagem1.hashCode(), imagem2.hashCode());
        assertTrue(imagem1.toString().contains("categoria"));
        assertEquals(1L, imagem1.getId());
        assertEquals("https://example.com/image.jpg", imagem1.getUrl());
        assertEquals("categoria", imagem1.getCategoria());
        assertEquals(raca, imagem1.getRaca());
    }
}
