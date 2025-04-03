document.querySelector("form").addEventListener("submit", function (e) {
    e.preventDefault();
  
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;
  
    // Logins fixos
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
  
    // Verifica se é login fixo
    const loginFixo = loginsFixos.find(user => user.email === email && user.senha === senha);
    if (loginFixo) {
      redirecionarParaPainel(loginFixo.tipo);
      return;
    }
  
    // Verifica usuários cadastrados
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const usuario = usuarios.find(u => u.email === email && u.senha === senha);
  
    if (usuario) {
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
  }