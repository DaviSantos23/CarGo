package com.example.CarGO.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record ClienteDto(@NotBlank String nome, @NotNull String endereco, @NotBlank String rg, @NotBlank String cpf) {
    
}
