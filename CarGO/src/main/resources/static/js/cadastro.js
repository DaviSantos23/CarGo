function validarIdade() {
    const nascimento = document.getElementById("nascimento").value;
    const dataNasc = new Date(nascimento);
    const hoje = new Date();
    let idade = hoje.getFullYear() - dataNasc.getFullYear();
    const m = hoje.getMonth() - dataNasc.getMonth();
  
    if (m < 0 || (m === 0 && hoje.getDate() < dataNasc.getDate())) {
      idade--;
    }
  
    if (idade < 18) {
      alert("É necessário ter 18 anos ou mais para se cadastrar.");
      return false;
    }
  
    return true;
  }


  function cadastrarCliente(event) {
    event.preventDefault(); // Evita o recarregamento da página

    // Captura os dados do formulário
    const cliente = {
        nome: document.getElementById("nome").value,
        email: document.getElementById("email").value,
        senha: document.getElementById("senha").value,
        endereco: document.getElementById("endereco").value,
        rg: document.getElementById("rg").value,
        cpf: document.getElementById("cpf").value,
        profissao: document.getElementById("profissao").value,  // Campo opcional
        entidades: document.getElementById("entidade").value, // Campo opcional
        salario: document.getElementById("salario").value // Campo opcional
    };

    // Envia a requisição para o backend
    fetch("http://localhost:8080/clientes", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(cliente)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Erro ao cadastrar cliente");
        }
        return response.json();
    })
    .then(data => {
        alert("Cadastro realizado com sucesso!");
        window.location.href = "login"; // Redireciona para a página de login
    })
    .catch(error => {
        console.error("Erro:", error);
        alert("Erro ao cadastrar. Verifique os dados e tente novamente.");
    });
}

// Adiciona o evento ao botão ao carregar a página
document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    form.addEventListener("submit", cadastrarCliente);
});
  