package com.example.CarGO.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.example.CarGO.model.ClienteModel;
import com.example.CarGO.repository.ClienteRepository;

import ch.qos.logback.core.joran.spi.HttpUtil.RequestMethod;
import jakarta.validation.Valid;

@Controller
public class LoginController {
    
    @Autowired
    private ClienteRepository cr;

    @GetMapping("/login")
    public String login(){
        return "login";
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
}
