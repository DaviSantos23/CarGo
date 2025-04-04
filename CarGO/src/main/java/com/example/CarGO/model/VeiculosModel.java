package com.example.CarGO.model;

import java.util.UUID;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "VEICULOS")
public class VeiculosModel {
    
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private UUID id;

    private String modelo;
    private int ano;
    private String local;
    

    public int getAno() {
        return ano;
    }
    public String getLocal() {
        return local;
    }
    public String getModelo() {
        return modelo;
    }
    public UUID getId() {
        return id;
    }
    public void setAno(int ano) {
        this.ano = ano;
    }
    public void setLocal(String local) {
        this.local = local;
    }
    public void setModelo(String modelo) {
        this.modelo = modelo;
    }
    public void setId(UUID id) {
        this.id = id;
    }

}
