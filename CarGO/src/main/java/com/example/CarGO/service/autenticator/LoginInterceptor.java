package com.example.CarGO.service.autenticator;

import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

@Component
public class LoginInterceptor implements HandlerInterceptor {
    
     
    /*@Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws IOException{
        
        if(CookieService.getCookie(request, "clienteId") != null){
            return true;
        }
        
        response.sendRedirect("/login");
        return false;
        
    }*/
}
