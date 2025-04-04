/*document.querySelector("form").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;

  const loginsFixos = [
    {
      email: "admin@cargo.com",
      senha: "admin123",
      tipo: "admin"
    },
    {
      email: "financeiro@cargo.com",
      senha: "fin123",
      tipo: "financeiro"
    }
  ];

  const loginFixo = loginsFixos.find(user => user.email === email && user.senha === senha);
  if (loginFixo) {
    redirecionarParaPainel(loginFixo.tipo);
    return;
  }

  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  const usuario = usuarios.find(u => u.email === email && u.senha === senha);

  if (usuario) {
    localStorage.setItem("usuarioLogado", usuario.email); 
    redirecionarParaPainel(usuario.tipo);
  } else {
    alert("E-mail ou senha incorretos.");
  }
});

function redirecionarParaPainel(tipo) {
  switch (tipo) {
    case "admin":
      window.location.href = "sistemaAdmin.html";
      break;
    case "financeiro":
      window.location.href = "sistemaFinanceiro.html";
      break;
    case "usuario":
      window.location.href = "sistemaUsuario.html";
      break;
    default:
      alert("Tipo de usuário desconhecido.");
  }
}*/

function login(event) {
  event.preventDefault(); // Evita o recarregamento da página

  // Captura os valores digitados pelo usuário
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;

  // Monta o objeto com as credenciais
  const credenciais = {
      email: email,
      senha: senha
  };

  // Envia os dados para o backend
  fetch("http://localhost:8080/logar", {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(credenciais)
  })
  .then(response => {
      if (!response.ok) {
          throw new Error("Email ou senha inválidos");
      }
      return response.json();
  })
  .then(data => {
      alert("Login realizado com sucesso!");
      localStorage.setItem("usuario", JSON.stringify(data)); // Salva os dados no navegador

      /*if (data.role === "ADMIN") {
        window.location.href = "/sistemaAdmin"; // Página exclusiva do Admin
    } else {
        window.location.href = "/sistemaUsuario"; // Página comum para usuários normais
    }*/
      window.location.href = "/sistemaUsuario"; // Redireciona para a página principal após login
  })
  .catch(error => {
      console.error("Erro:", error);
      alert("Erro ao fazer login. Verifique suas credenciais.");
  });
}

// Adiciona o evento ao botão de login
document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  form.addEventListener("submit", login);
});
