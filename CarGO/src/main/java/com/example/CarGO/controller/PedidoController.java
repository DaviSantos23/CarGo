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
import com.example.CarGO.enums.StatusPedido;
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
        Optional<VeiculosModel> veiculo = veiculosRepository.findByPlaca(pedidoDto.veiculo());
        if (pedidoDto.veiculo() != null) {
            veiculo = Optional.ofNullable(veiculosRepository.findByPlaca(pedidoDto.veiculo())
                    .orElseThrow(() -> new EntityNotFoundException("Caminhão com placa " + pedidoDto.veiculo() + " não encontrado.")));
        }
        var pedidoModel = new PedidoModel();
        BeanUtils.copyProperties(pedidoDto, pedidoModel);
        pedidoModel.setVeiculo(veiculo.get());
        pedidoModel.setStatus(StatusPedido.AGUARDANDO_VALIDACAO_FINANCEIRO);
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

    @PutMapping("/pedidos/{id}/validarFinanceiro")
    public ResponseEntity<PedidoModel> validarFinanceiro(@PathVariable UUID id) {
    Optional<PedidoModel> optionalPedido = pedidoRepository.findById(id);
    if (optionalPedido.isEmpty()) {
        return ResponseEntity.notFound().build();
    }

    PedidoModel pedido = optionalPedido.get();
    pedido.setStatus(StatusPedido.VALIDADO_FINANCEIRO);
    pedidoRepository.save(pedido);
    return ResponseEntity.ok(pedido);
}

@PutMapping("/pedidos/{id}/validarAdmin")
    public ResponseEntity<PedidoModel> validarAdmin(@PathVariable UUID id) {
    Optional<PedidoModel> optionalPedido = pedidoRepository.findById(id);
    if (optionalPedido.isEmpty()) {
        return ResponseEntity.notFound().build();
    }

    PedidoModel pedido = optionalPedido.get();
    pedido.setStatus(StatusPedido.VALIDADO_ADMIN);
    pedidoRepository.save(pedido);
    return ResponseEntity.ok(pedido);
}

}
