package com.example.CarGO.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.CarGO.model.ClienteModel;
import com.example.CarGO.model.VeiculosModel;

public interface VeiculosRepository extends JpaRepository<VeiculosModel, UUID> {
    
/*@Query(value="select * from CLIENTES where email = :email and senha = :senha", nativeQuery = true)
    public ClienteModel login(String email, String senha);*/

}
