document.addEventListener("DOMContentLoaded", () => {
    const cardsContainer = document.getElementById("cardsContainer");
  
    function carregarVeiculosDoStorage() {
      const armazenados = localStorage.getItem("veiculosCadastrados");
      if (armazenados) {
        const veiculos = JSON.parse(armazenados);
        veiculos.forEach(v => criarCardVeiculo(v.modelo, v.ano, v.local, v.imagem));
      }
    }
  
    function criarCardVeiculo(modelo, ano, local, imagemSrc) {
      const card = document.createElement("div");
      card.classList.add("vehicle-card");
  
      card.innerHTML = `
        <img src="${imagemSrc}" alt="${modelo}">
        <h3>${modelo}</h3>
        <p><strong>Ano:</strong> ${ano}</p>
        <p><strong>Local:</strong> ${local}</p>
      `;
  
      cardsContainer.appendChild(card);
    }
  
    carregarVeiculosDoStorage();
  });