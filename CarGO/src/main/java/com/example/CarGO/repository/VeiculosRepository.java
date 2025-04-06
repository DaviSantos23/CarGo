package com.example.CarGO.repository;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.CarGO.model.VeiculosModel;

public interface VeiculosRepository extends JpaRepository<VeiculosModel, UUID> {
    Optional<VeiculosModel> findByPlaca(String placa);
/*@Query(value="select * from CLIENTES where email = :email and senha = :senha", nativeQuery = true)
    public ClienteModel login(String email, String senha);*/

}
