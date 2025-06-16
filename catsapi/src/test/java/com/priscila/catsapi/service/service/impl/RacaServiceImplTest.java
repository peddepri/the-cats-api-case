package com.priscila.catsapi.service.service.impl;


import com.priscila.catsapi.dto.RacaDto;
import com.priscila.catsapi.model.Raca;
import com.priscila.catsapi.repository.ImagemRepository;
import com.priscila.catsapi.repository.RacaRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;
import org.springframework.web.client.RestTemplate;

import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

class RacaServiceImplTest {

    @Mock
    private RacaRepository racaRepository;

    @Mock
    private ImagemRepository imagemRepository;

    @InjectMocks
    private RacaServiceImpl service;

    @Spy
    private RestTemplate restTemplate = new RestTemplate();

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        service.setRestTemplate(restTemplate);
    }

    @Test
    void deveImportarRacasComSucesso() {
        RacaDto dto = new RacaDto();
        dto.setId("abc");
        dto.setName("Abyssinian");
        dto.setDescription("desc");
        dto.setOrigin("Egypt");
        dto.setTemperament("Active, Affectionate");

        RacaDto[] racas = { dto };

        RestTemplate restTemplateMock = mock(RestTemplate.class);
        service.setRestTemplate(restTemplateMock);

        when(restTemplateMock.getForObject(anyString(), eq(RacaDto[].class))).thenReturn(racas);

        when(restTemplateMock.getForObject(contains("images"), eq(Object[].class)))
                .thenReturn(new Object[]{"{url=https://example.com/image.jpg}"});

        when(racaRepository.save(any(Raca.class))).thenAnswer(i -> i.getArguments()[0]);

        service.importarRacas();

        verify(racaRepository).save(any());
        verify(imagemRepository).save(any());
    }

    @Test
    void naoDeveImportarQuandoRacasNull() {
        RestTemplate restTemplateMock = mock(RestTemplate.class);
        service.setRestTemplate(restTemplateMock);
        when(restTemplateMock.getForObject(anyString(), eq(RacaDto[].class))).thenReturn(null);

        service.importarRacas();

        verifyNoInteractions(racaRepository);
        verifyNoInteractions(imagemRepository);
    }

    @Test
    void deveIgnorarErroAoBuscarImagem() {
        RacaDto dto = new RacaDto();
        dto.setId("abc");
        dto.setName("Abyssinian");
        dto.setDescription("desc");
        dto.setOrigin("Egypt");
        dto.setTemperament("Active, Affectionate");

        RacaDto[] racas = { dto };

        RestTemplate restTemplateMock = mock(RestTemplate.class);
        service.setRestTemplate(restTemplateMock);
        when(restTemplateMock.getForObject(anyString(), eq(RacaDto[].class))).thenReturn(racas);
        when(restTemplateMock.getForObject(contains("images"), eq(Object[].class)))
                .thenThrow(new RuntimeException("Erro"));

        when(racaRepository.save(any(Raca.class))).thenAnswer(i -> i.getArguments()[0]);

        service.importarRacas();

        verify(racaRepository).save(any());
        verify(imagemRepository, never()).save(any());
    }

    @Test
    void naoDeveImportarQuandoRacasVazio() {
        RestTemplate restTemplateMock = mock(RestTemplate.class);
        service.setRestTemplate(restTemplateMock);
        when(restTemplateMock.getForObject(anyString(), eq(RacaDto[].class))).thenReturn(new RacaDto[0]);

        service.importarRacas();

        verifyNoInteractions(racaRepository);
        verifyNoInteractions(imagemRepository);
    }

    @Test
    void deveIgnorarImagemComFormatoInvalido() {
        RacaDto dto = new RacaDto();
        dto.setId("abc");
        dto.setName("Abyssinian");
        dto.setDescription("desc");
        dto.setOrigin("Egypt");
        dto.setTemperament("Active, Affectionate");

        RacaDto[] racas = { dto };

        RestTemplate restTemplateMock = mock(RestTemplate.class);
        service.setRestTemplate(restTemplateMock);

        when(restTemplateMock.getForObject(anyString(), eq(RacaDto[].class)))
                .thenReturn(racas);
        when(restTemplateMock.getForObject(contains("images"), eq(Object[].class)))
                .thenReturn(new Object[]{"{url=https://example.com/image.jpg}"});

        when(racaRepository.save(any(Raca.class)))
                .thenReturn(Raca.builder().id("abc").build());

        service.importarRacas();

        verify(racaRepository).save(any());
        verify(imagemRepository).save(any());
    }

    @Test
    void deveIgnorarImagemQuandoNaoPossuiUrl() {
        RacaDto dto = new RacaDto();
        dto.setId("abc");
        dto.setName("Abyssinian");
        dto.setDescription("desc");
        dto.setOrigin("Egypt");
        dto.setTemperament("Active, Affectionate");

        RacaDto[] racas = { dto };

        RestTemplate restTemplateMock = mock(RestTemplate.class);
        service.setRestTemplate(restTemplateMock);

        when(restTemplateMock.getForObject(anyString(), eq(RacaDto[].class)))
                .thenReturn(racas);
        when(restTemplateMock.getForObject(contains("images"), eq(Object[].class)))
                .thenReturn(new Object[]{"imagem_sem_url"});

        when(racaRepository.save(any(Raca.class)))
                .thenReturn(Raca.builder().id("abc").nome("Abyssinian").build());

        service.importarRacas();

        verify(racaRepository).save(any());
        verify(imagemRepository, never()).save(any());
    }

}