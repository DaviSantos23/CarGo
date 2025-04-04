package com.example.CarGO.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record VeiculoDto(@NotBlank String modelo, @NotNull int ano, @NotBlank String local) {
    
}
