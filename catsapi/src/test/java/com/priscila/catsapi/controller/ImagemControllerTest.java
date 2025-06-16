package com.priscila.catsapi.controller;

import com.priscila.catsapi.service.ImagemService;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
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
        ResponseEntity<Void> response = controller.importarChapeu();
        verify(imagemService).importarImagensComCategoria("chapeu", 1);
        assertEquals(200, response.getStatusCodeValue());
    }

    @Test
    void deveImportarOculos() {
        ResponseEntity<Void> response = controller.importarOculos();
        verify(imagemService).importarImagensComCategoria("oculos", 4);
        assertEquals(200, response.getStatusCodeValue());
    }
}
