package com.example.CarGO.model;

import java.util.UUID;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "CLIENTES")
public class ClienteModel {
    
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private UUID id;

    private String nome;
    private String endereco;
    private String rg;
    private String cpf;

    public UUID getId() {
        return id;
    }
public String getNome() {
    return nome;
}

public String getEndereco() {
    return endereco;
}
public String getRg() {
    return rg;
}
public String getCpf() { 
    return cpf;
}

public void setCpf(String cpf) {
    this.cpf = cpf;
}
public void setEndereco(String endereco) {
    this.endereco = endereco;
}
public void setId(UUID id) {
    this.id = id;
}
public void setNome(String nome) {
    this.nome = nome;
}
public void setRg(String rg) {
    this.rg = rg;
}



}
