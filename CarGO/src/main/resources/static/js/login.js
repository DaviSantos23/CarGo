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
        window.location.href = "/"; // Redireciona para a página principal após login
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