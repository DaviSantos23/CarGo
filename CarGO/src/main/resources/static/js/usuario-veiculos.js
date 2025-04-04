/*document.addEventListener("DOMContentLoaded", () => {
  const cardsContainer = document.getElementById("cardsContainer");

  function carregarVeiculosDoStorage() {
    const armazenados = localStorage.getItem("veiculosCadastrados");
    if (armazenados) {
      const veiculos = JSON.parse(armazenados);
      veiculos.forEach(v => criarCardVeiculo(v.modelo, v.ano, v.local, v.valor, v.imagem));
    }
  }

  function criarCardVeiculo(modelo, ano, local, valor, imagemSrc) {
    const card = document.createElement("div");
    card.classList.add("vehicle-card");

    card.innerHTML = `
      <img src="${imagemSrc}" alt="${modelo}">
      <h3>${modelo}</h3>
      <p><strong>Ano:</strong> ${ano}</p>
      <p><strong>Local:</strong> ${local}</p>
      <p><strong>Valor:</strong> ${valor ? valor : "Não informado"}</p>
    `;

    cardsContainer.appendChild(card);
  }

  carregarVeiculosDoStorage();
});*/

function carregarVeiculos() {
  fetch("http://localhost:8080/veiculos")
    .then(response => {
      if (!response.ok) {
        throw new Error("Erro ao carregar veículos");
      }
      return response.json();
    })
    .then(veiculos => {
      exibirVeiculos(veiculos); // Exibir os veículos na tela
    })
    .catch(error => {
      console.error("Erro:", error);
      alert("Erro ao carregar veículos.");
    });
}

function exibirVeiculos(veiculos) {
  const container = document.getElementById("cardsContainer");
  container.innerHTML = ""; // Limpa os cards antigos

  veiculos.forEach(veiculo => {
    const card = document.createElement("div");
    card.classList.add("vehicle-card");

    card.innerHTML = `
      <h3>${veiculo.modelo}</h3>
      <p><strong>Ano:</strong> ${veiculo.ano}</p>
      <p><strong>Local:</strong> ${veiculo.local}</p>
      <p><strong>Placa:</strong> ${veiculo.placa}</p>
    `;

    container.appendChild(card);
  });
}

document.addEventListener("DOMContentLoaded", function () {
  carregarVeiculos(); // Chama a função ao carregar a página
});