package com.priscila.catsapi.dto;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

public class RacaDtoTest {

    @Test
    void deveTestarGettersSettersEqualsHashCodeToString() {
        RacaDto dto1 = new RacaDto();
        dto1.setId("abc");
        dto1.setName("Abyssinian");
        dto1.setOrigin("Egypt");
        dto1.setTemperament("Active, Affectionate");
        dto1.setDescription("desc");

        RacaDto dto2 = new RacaDto();
        dto2.setId("abc");
        dto2.setName("Abyssinian");
        dto2.setOrigin("Egypt");
        dto2.setTemperament("Active, Affectionate");
        dto2.setDescription("desc");

        // Getters
        assertEquals("abc", dto1.getId());
        assertEquals("Abyssinian", dto1.getName());
        assertEquals("Egypt", dto1.getOrigin());
        assertEquals("Active, Affectionate", dto1.getTemperament());
        assertEquals("desc", dto1.getDescription());

        // Equals & hashCode
        assertEquals(dto1, dto2);
        assertEquals(dto1.hashCode(), dto2.hashCode());

        // Equals com null e objeto diferente
        assertNotEquals(dto1, null);
        assertNotEquals(dto1, "string diferente");

        // Equals com id diferente
        dto2.setId("xyz");
        assertNotEquals(dto1, dto2);

        // toString
        assertTrue(dto1.toString().contains("Abyssinian"));
    }
}