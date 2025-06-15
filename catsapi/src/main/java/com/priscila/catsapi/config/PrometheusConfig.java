/*
package com.priscila.catsapi.config;

import io.micrometer.core.instrument.MeterRegistry;
import org.springframework.boot.actuate.autoconfigure.metrics.MeterRegistryCustomizer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class PrometheusConfig {

    @Bean(name = "myMetricsCommonTags")
    public MeterRegistryCustomizer<MeterRegistry> customCommonTags() {
        return registry -> registry.config().commonTags("application", "catsapi");
    }

}
*/
