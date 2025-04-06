package com.example.CarGO.model;


import java.time.LocalDate;
import java.util.UUID;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy")
    private LocalDate dtRetirada;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy")
    private LocalDate dtDevolucao;
    private String formaPagamento;


    public LocalDate getDtDevolucao() {
        return dtDevolucao;
    }
    public LocalDate getDtRetirada() {
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
    public void setDtDevolucao(LocalDate dtDevolucao) {
        this.dtDevolucao = dtDevolucao;
    }
    public void setDtRetirada(LocalDate dtRetirada) {
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
