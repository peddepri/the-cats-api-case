package com.priscila.catsapi.service.service.impl;

import com.priscila.catsapi.model.Imagem;
import com.priscila.catsapi.repository.ImagemRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;
import org.springframework.web.client.RestTemplate;

import java.util.*;

import static org.mockito.Mockito.*;

class ImagemServiceImplTest {

    @Mock
    private ImagemRepository imagemRepository;

    @InjectMocks
    private ImagemServiceImpl imagemService;

    @Spy
    private RestTemplate restTemplate = new RestTemplate();

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        // Usar reflection para injetar o RestTemplate falso
        try {
            var field = ImagemServiceImpl.class.getDeclaredField("restTemplate");
            field.setAccessible(true);
            field.set(imagemService, restTemplate);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Test
    void deveImportarImagensComCategoria() {
        // Simula resposta da API
        Map<String, Object> imagemMap = new HashMap<>();
        imagemMap.put("url", "https://example.com/image.jpg");

        Map[] imagens = new Map[] { imagemMap };

        RestTemplate restTemplateMock = mock(RestTemplate.class);
        imagemService = new ImagemServiceImpl(imagemRepository);
        try {
            var field = ImagemServiceImpl.class.getDeclaredField("restTemplate");
            field.setAccessible(true);
            field.set(imagemService, restTemplateMock);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

        when(restTemplateMock.getForObject(anyString(), eq(Map[].class))).thenReturn(imagens);

        imagemService.importarImagensComCategoria("fofa", 1);

        verify(imagemRepository).save(any(Imagem.class));
    }
}