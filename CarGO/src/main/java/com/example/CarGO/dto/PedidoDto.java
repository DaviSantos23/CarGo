package com.example.CarGO.dto;

import java.sql.Date;
import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;

import com.example.CarGO.model.VeiculosModel;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record PedidoDto(@NotBlank String veiculo, @NotNull LocalDate dtRetirada, @NotNull LocalDate dtDevolucao, @NotBlank String formaPagamento) {
    
}
