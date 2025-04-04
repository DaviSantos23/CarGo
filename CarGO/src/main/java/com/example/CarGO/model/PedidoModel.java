package com.example.CarGO.model;

import java.sql.Timestamp;
import java.util.Date;
import java.util.List;
import java.util.UUID;
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
    @ManyToOne
    @JoinColumn(name = "veiculo_id", nullable = false)
    private VeiculosModel veiculo;

    private Timestamp dtRetirada;
    private Timestamp dtDevolucao;
    private String formaPagamento;


    public Timestamp getDtDevolucao() {
        return dtDevolucao;
    }
    public Timestamp getDtRetirada() {
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
    public void setDtDevolucao(Timestamp dtDevolucao) {
        this.dtDevolucao = dtDevolucao;
    }
    public void setDtRetirada(Timestamp dtRetirada) {
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
