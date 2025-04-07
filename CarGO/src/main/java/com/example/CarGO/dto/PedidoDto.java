package com.example.CarGO.dto;

import java.time.LocalDate;


import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record PedidoDto(@NotBlank String veiculo, @NotNull LocalDate dtRetirada, @NotNull LocalDate dtDevolucao, @NotBlank String formaPagamento) {
    
}
