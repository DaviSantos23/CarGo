package com.example.CarGO.controller;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.example.CarGO.dto.VeiculoDto;
import com.example.CarGO.model.VeiculosModel;
import com.example.CarGO.repository.VeiculosRepository;
import jakarta.validation.Valid;

@RestController
public class VeiculosController {
    
    @Autowired
    VeiculosRepository veiculosRepository;

    @PostMapping("/veiculos")
    public ResponseEntity<VeiculosModel> criarVeiculo(@RequestBody @Valid VeiculoDto veiculoDto){
        var veiculoModel = new VeiculosModel();
        BeanUtils.copyProperties(veiculoDto, veiculoModel);
        return ResponseEntity.status(HttpStatus.OK).body(veiculosRepository.save(veiculoModel));
    }

    @GetMapping("/veiculos")
    public ResponseEntity<List<VeiculosModel>> listarVeiculos(){
        return ResponseEntity.status(HttpStatus.OK).body(veiculosRepository.findAll());
    }

    @PutMapping("/veiculos/{id}")
    public ResponseEntity<Object> atualizarVeiculos(@PathVariable(value="id") UUID id, @RequestBody @Valid VeiculoDto veiculoDto){
        Optional<VeiculosModel> veiculo = veiculosRepository.findById(id);
        if(veiculo.isEmpty()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Veiculo não encontrado");
        }
        var veiculoModel = veiculo.get();
        BeanUtils.copyProperties(veiculoDto, veiculoModel);
        return ResponseEntity.status(HttpStatus.OK).body(veiculosRepository.save(veiculoModel));
    }

    @DeleteMapping("/veiculos/{id}")
    public ResponseEntity<Object> deletarVeiculos(@PathVariable(value="id") UUID id){
        Optional<VeiculosModel> veiculo = veiculosRepository.findById(id);
        if(veiculo.isEmpty()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Veiculo nao encontrado");
        }
        veiculosRepository.delete(veiculo.get());
        return ResponseEntity.status(HttpStatus.OK).body("Veiculo deletado");

    }

}
