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

document.querySelector("form").addEventListener("submit", function (e) {
  e.preventDefault();

  if (!validarIdade()) return;

  const usuario = {
    nome: document.getElementById("nome").value,
    nascimento: document.getElementById("nascimento").value,
    cpf: document.getElementById("cpf").value,
    rg: document.getElementById("rg").value,
    endereco: document.getElementById("endereco").value,
    email: document.getElementById("email").value,
    senha: document.getElementById("senha").value,
  };

  // localStorage
  let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  const jaExiste = usuarios.some(u => u.email === usuario.email);

  if (jaExiste) {
    alert("Este e-mail já está cadastrado!");
    return;
  }

  usuarios.push(usuario);
  localStorage.setItem("usuarios", JSON.stringify(usuarios));

  alert("Cadastro realizado com sucesso!");
  window.location.href = "login.html";
});