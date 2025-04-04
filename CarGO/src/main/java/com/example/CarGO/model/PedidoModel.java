package com.example.CarGO.model;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "PEDIDOS")
public class PedidoModel {
    
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private UUID id;
   
    //@JoinColumn(name = "veiculo_id", nullable = false) 
    @OneToOne
    @JoinColumn(name = "veiculo_id", nullable = false)
    private VeiculosModel veiculo;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy")
    private LocalDateTime dtRetirada;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy")
    private LocalDateTime dtDevolucao;
    private String formaPagamento;


    public LocalDateTime getDtDevolucao() {
        return dtDevolucao;
    }
    public LocalDateTime getDtRetirada() {
        return dtRetirada;
    }
    public String getFormaPagamento() {
        return formaPagamento;
    }
    public UUID getId() {
        return id;
    }
    public VeiculosModel getVeiculo() {
        return veiculo;
    }
    public void setDtDevolucao(LocalDateTime dtDevolucao) {
        this.dtDevolucao = dtDevolucao;
    }
    public void setDtRetirada(LocalDateTime dtRetirada) {
        this.dtRetirada = dtRetirada;
    }
    public void setFormaPagamento(String formaPagamento) {
        this.formaPagamento = formaPagamento;
    }
    public void setId(UUID id) {
        this.id = id;
    }
    public void setVeiculo(VeiculosModel veiculo) {
        this.veiculo = veiculo;
    }
    
}
