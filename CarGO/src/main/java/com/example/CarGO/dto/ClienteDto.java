package com.example.CarGO.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public record ClienteDto(@NotBlank String email, @NotBlank String senha, @NotBlank String nome, @NotNull String endereco, @NotBlank String rg, @NotBlank String cpf, @NotBlank String profissao, @NotBlank String entidades, @NotNull @Positive float salario) {
    
}
