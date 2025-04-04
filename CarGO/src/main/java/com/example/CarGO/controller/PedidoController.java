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

import com.example.CarGO.dto.PedidoDto;
import com.example.CarGO.model.PedidoModel;
import com.example.CarGO.model.VeiculosModel;
import com.example.CarGO.repository.PedidoRepository;
import com.example.CarGO.repository.VeiculosRepository;

import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;

@RestController
public class PedidoController {

    @Autowired
    PedidoRepository pedidoRepository;

    @Autowired
    VeiculosRepository veiculosRepository;

    @PostMapping("/pedidos")
    public ResponseEntity<PedidoModel> criarPedido(@RequestBody @Valid PedidoDto pedidoDto){
        Optional<VeiculosModel> veiculo = veiculosRepository.findByPlaca(pedidoDto.placaVeiculo());
        if (pedidoDto.placaVeiculo() != null) {
            veiculo = Optional.ofNullable(veiculosRepository.findByPlaca(pedidoDto.placaVeiculo())
                    .orElseThrow(() -> new EntityNotFoundException("Caminhão com placa " + pedidoDto.placaVeiculo() + " não encontrado.")));
        }
        var pedidoModel = new PedidoModel();
        BeanUtils.copyProperties(pedidoDto, pedidoModel);
        pedidoModel.setVeiculo(veiculo.get());
        return ResponseEntity.status(HttpStatus.OK).body(pedidoRepository.save(pedidoModel));
    }

    @GetMapping("/pedidos")
    public ResponseEntity<List<PedidoModel>> listarPedido(){
        return ResponseEntity.status(HttpStatus.OK).body(pedidoRepository.findAll());
    }

    @PutMapping("/pedidos/{id}")
    public ResponseEntity<Object> atualizarPedido(@PathVariable(value="id") UUID id, @RequestBody @Valid PedidoDto pedidoDto){
        Optional<PedidoModel> pedido = pedidoRepository.findById(id);
        if(pedido.isEmpty()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Pedido não encontrado");
        }
        var pedidoModel = pedido.get();
        BeanUtils.copyProperties(pedidoDto, pedidoModel);
        return ResponseEntity.status(HttpStatus.OK).body(pedidoRepository.save(pedidoModel));
    }

    @DeleteMapping("/pedidos/{id}")
    public ResponseEntity<Object> deletarPedido(@PathVariable(value="id") UUID id){
        Optional<PedidoModel> pedido = pedidoRepository.findById(id);
        if(pedido.isEmpty()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Pedido nao encontrado");
        }
        pedidoRepository.delete(pedido.get());
        return ResponseEntity.status(HttpStatus.OK).body("Pedido deletado");

    }
}
