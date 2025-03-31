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

    private String email;
    private String senha;
    private String nome;
    private String endereco;
    private String rg;
    private String cpf;
    private String profissao;
    private String entidades;
    private float salario;

    public UUID getId() {
        return id;
    }
public String getNome() {
    return nome;
}

public String getEmail() {
    return email;
}
public String getSenha() {
    return senha;
}

public String getProfissao() {
    return profissao;
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

public String getEntidades() {
    return entidades;
}

public float getSalario() {
    return salario;
}

public void setEmail(String email) {
    this.email = email;
}
public void setSenha(String senha) {
    this.senha = senha;
}
public void setEntidades(String entidades) {
    this.entidades = entidades;
}

public void setSalario(float salario) {
    this.salario = salario;
}

public void setProfissao(String profissao) {
    this.profissao = profissao;
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
