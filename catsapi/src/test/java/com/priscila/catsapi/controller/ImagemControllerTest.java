package com.priscila.catsapi.controller;

import com.priscila.catsapi.service.ImagemService;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.verify;

public class ImagemControllerTest {

    @Mock
    private ImagemService imagemService;

    @InjectMocks
    private ImagemController controller;

    public ImagemControllerTest() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void deveImportarChapeu() {
        ResponseEntity<String> response = controller.importarChapeu();
        verify(imagemService).importarImagensComCategoria("chapeu", 1);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("Imagens de chapéu importadas com sucesso!", response.getBody());
    }

    @Test
    void deveImportarOculos() {
        ResponseEntity<String> response = controller.importarOculos();
        verify(imagemService).importarImagensComCategoria("oculos", 4);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("Imagens de óculos importadas com sucesso!", response.getBody());
    }
}
