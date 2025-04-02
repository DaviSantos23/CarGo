document.getElementById("form-suporte").addEventListener("submit", function (e) {
    e.preventDefault();
    alert("Sua mensagem foi enviada com sucesso! Em breve entraremos em contato.");
    this.reset();
  });