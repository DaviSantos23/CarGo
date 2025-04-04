package com.example.CarGO.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.CarGO.model.PedidoModel;

public interface PedidoRepository extends JpaRepository<PedidoModel, UUID>{
    /*@Query(value="select * from CLIENTES where email = :email and senha = :senha", nativeQuery = true)
    public ClienteModel login(String email, String senha);*/
}
