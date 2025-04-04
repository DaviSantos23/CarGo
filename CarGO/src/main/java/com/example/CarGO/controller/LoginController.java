package com.example.CarGO.controller;

import java.io.UnsupportedEncodingException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.example.CarGO.model.ClienteModel;
import com.example.CarGO.repository.ClienteRepository;
import com.example.CarGO.service.CookieService;


import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;

@Controller
public class LoginController {
    
    @Autowired
    private ClienteRepository cr;

    @GetMapping("/login")
    public String login(){
        return "login";
    }

    @PostMapping("/logar")
    @ResponseBody
    public ResponseEntity<?> loginCliente(@RequestBody ClienteModel clienteModel, Model model, HttpServletResponse response) throws UnsupportedEncodingException{
        ClienteModel clienteLogado = this.cr.login(clienteModel.getEmail(), clienteModel.getSenha());
        if(clienteLogado != null){
            CookieService.setCookie(response, "clienteId", String.valueOf(clienteLogado.getId()), 10000);
            CookieService.setCookie(response, "nomeCliente", String.valueOf(clienteLogado.getNome()), 10000);
            return ResponseEntity.ok(clienteLogado);   
        }

        model.addAttribute("erro","Usuario Invalido");
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("{\"erro\": \"Usuário ou senha inválidos\"}");
    }

    @GetMapping("/cadastro")
    public String cadastro(){
        return "cadastro";
    }

    @RequestMapping(value = "/cadastro", method = org.springframework.web.bind.annotation.RequestMethod.POST)
    public String cadastrarCliente(@Valid ClienteModel clienteModel, BindingResult result){
        if(result.hasErrors()){
            return "redirect:/cadastro";
        }
        cr.save(clienteModel);
        return "redirect:/login";
    }

    @GetMapping("/landingPage")
    public String landingPage(Model model, HttpServletRequest request) throws UnsupportedEncodingException{
        model.addAttribute("nome", CookieService.getCookie(request, "nomeCliente"));
        return "landingPage";
    }

    @GetMapping("/")
    public String inicio(Model model, HttpServletRequest request) throws UnsupportedEncodingException{
        model.addAttribute("nome", CookieService.getCookie(request, "nomeCliente"));
        return "landingPage";
    }

    @GetMapping("/contato")
    public String contato(){
        return "contato";
    }

    @GetMapping("/ofertas")
    public String ofertas(){
        return "ofertas";
    }

    @GetMapping("/sistemaUsuario")
    public String sistemaUsuario(){
        return "sistemausuario";
    }

    @GetMapping("/usuarioPedidos")
    public String usuarioPedidos(){
        return "usuarioPedidos";
    }

    @GetMapping("/usuarioVeículos")
    public String usuarioVeículos(){
        return "usuarioVeículos";
    }
    
    @GetMapping("/usuarioVisualizar")
    public String usuarioVisualizar(){
        return "usuarioVisualizar";
    }

    @GetMapping("/sistemaAdmin")
    public String sistemaAdmin(){
        return "sistemaAdmin";
    }

    @GetMapping("/adminContratos")
    public String adminContratos(){
        return "adminContratos";
    }

    @GetMapping("/adminPedidos")
    public String adminPedidos(){
        return "adminPedidos";
    }

    @GetMapping("/adminVeiculos")
    public String adminVeiculos(){
        return "adminVeiculos";
    }

    @GetMapping("/sistemaFinanceiro")
    public String sistemaFinanceiro(){
        return "sistemaFinanceiro";
    }

    @GetMapping("/financeiroPedidos")
    public String financeiroPedidos(){
        return "financeiroPedidos";
    }
    



    
}
