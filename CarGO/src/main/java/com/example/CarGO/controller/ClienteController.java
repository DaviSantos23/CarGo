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

import com.example.CarGO.dto.ClienteDto;
import com.example.CarGO.model.ClienteModel;
import com.example.CarGO.repository.ClienteRepository;

import jakarta.validation.Valid;

@RestController
public class ClienteController {
    
    @Autowired
    ClienteRepository clienteRepository;

    @PostMapping("/clientes")
    public ResponseEntity<ClienteModel> criarCliente(@RequestBody @Valid ClienteDto clienteDto){
        var clienteModel = new ClienteModel();
        BeanUtils.copyProperties(clienteDto, clienteModel);
        return ResponseEntity.status(HttpStatus.CREATED).body(clienteRepository.save(clienteModel));
    }

    @GetMapping("/clientes")
    public ResponseEntity<List<ClienteModel>> listarCliente(){
        return ResponseEntity.status(HttpStatus.OK).body(clienteRepository.findAll());
    }

    @PutMapping("/clientes/{id}")
    public ResponseEntity<Object> atualizarCliente(@PathVariable(value="id") UUID id, @RequestBody @Valid ClienteDto clienteDto){
        Optional<ClienteModel> cliente = clienteRepository.findById(id);
        if(cliente.isEmpty()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Cliente não encontrado");
        }
        var clienteModel = cliente.get();
        BeanUtils.copyProperties(clienteDto, clienteModel);
        return ResponseEntity.status(HttpStatus.OK).body(clienteRepository.save(clienteModel));
    }

    @DeleteMapping("/clientes/{id}")
    public ResponseEntity<Object> deletarCliente(@PathVariable(value="id") UUID id){
        Optional<ClienteModel> cliente = clienteRepository.findById(id);
        if(cliente.isEmpty()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Cliente não encontrado");
        }
        clienteRepository.delete(cliente.get());
        return ResponseEntity.status(HttpStatus.OK).body("Cliente deletado");
    }

}
