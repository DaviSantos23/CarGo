package com.example.CarGO.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.CarGO.model.ClienteModel;

@Repository
public interface ClienteRepository extends JpaRepository<ClienteModel, UUID> {
    

    @Query(value="select * from CLIENTES where email = :email and senha = :senha", nativeQuery = true)
    public ClienteModel login(String email, String senha);

}
