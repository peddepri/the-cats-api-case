package com.priscila.catsapi.service.service.impl;

import com.priscila.catsapi.aop.MetricAndLog;
import com.priscila.catsapi.dto.RacaDto;
import com.priscila.catsapi.model.Raca;
import com.priscila.catsapi.model.Imagem;
import com.priscila.catsapi.repository.RacaRepository;
import com.priscila.catsapi.repository.ImagemRepository;
import com.priscila.catsapi.service.RacaService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class RacaServiceImpl implements RacaService  {

    private final RacaRepository racaRepository;
    private final ImagemRepository imagemRepository;
    private final RestTemplate restTemplate = new RestTemplate();

    private static final String API_RACAS = "https://api.thecatapi.com/v1/breeds";
    private static final String API_IMAGENS = "https://api.thecatapi.com/v1/images/search?limit=3&breed_ids={id}";

    @MetricAndLog
    @Override
    public void importarRacas() {
        log.info("Buscando raças na API TheCatAPI...");
        RacaDto[] racas = restTemplate.getForObject(API_RACAS, RacaDto[].class);

        if (racas != null) {
            log.info("Encontradas {} raças. Processando em lote...", racas.length);
            
            List<Raca> racasParaSalvar = Arrays.stream(racas)
                .map(dto -> Raca.builder()
                    .id(dto.getId())
                    .nome(dto.getName())
                    .descricao(dto.getDescription())
                    .temperamento(dto.getTemperament())
                    .origem(dto.getOrigin())
                    .build())
                .toList();

            // Salva todas as raças de uma vez
            List<Raca> racasSalvas = racaRepository.saveAll(racasParaSalvar);
            log.info("Raças salvas com sucesso. Buscando imagens...");

            // Busca imagens para algumas raças (limitando para evitar timeout)
            racasSalvas.stream()
                .limit(10) // Limita a 10 raças para evitar timeout
                .forEach(this::buscarImagensPorRaca);
                
            log.info("Importação concluída!");
        }
    }

    @MetricAndLog
    private void buscarImagensPorRaca(Raca raca) {
        String url = API_IMAGENS.replace("{id}", raca.getId());

        try {
            List<Object> imagens = Arrays.asList(restTemplate.getForObject(url, Object[].class));
            List<Imagem> imagensParaSalvar = new ArrayList<>();

            imagens.forEach(imagemObj -> {
                String json = imagemObj.toString();
                String urlImagem = json.split("url=")[1].split(",")[0].replace("}", "");

                Imagem imagem = Imagem.builder()
                        .url(urlImagem)
                        .raca(raca)
                        .categoria(null)
                        .build();

                imagensParaSalvar.add(imagem);
            });

            // Salva todas as imagens da raça de uma vez
            if (!imagensParaSalvar.isEmpty()) {
                imagemRepository.saveAll(imagensParaSalvar);
            }

        } catch (Exception e) {
            log.warn("Erro ao buscar imagens para raça: {}", raca.getNome(), e);
        }
    }

    public void setRestTemplate(RestTemplate restTemplate) {
        try {
            java.lang.reflect.Field field = RacaServiceImpl.class.getDeclaredField("restTemplate");
            field.setAccessible(true);
            field.set(this, restTemplate);
        } catch (Exception e) {
            throw new RuntimeException("Erro ao setar RestTemplate para teste", e);    }}

}
