package com.example.CarGO.dto;

import java.sql.Date;
import java.sql.Timestamp;

import com.example.CarGO.model.VeiculosModel;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record PedidoDto(@NotNull VeiculosModel veiculo, @NotBlank Timestamp dtRetirada, @NotBlank Timestamp dtDevolucao, @NotBlank String formaPagamento) {
    
}
