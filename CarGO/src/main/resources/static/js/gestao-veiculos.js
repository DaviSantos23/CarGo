document.addEventListener("DOMContentLoaded", () => {
  const btnAdicionar = document.getElementById("btnAdicionar");
  const btnCancelar = document.getElementById("btnCancelar");
  const modal = document.getElementById("modalAdicionar");
  const form = document.getElementById("formAdicionar");
  const cardsContainer = document.getElementById("cardsContainer");
  const inputModelo = document.getElementById("modelo");
  const inputAno = document.getElementById("ano");
  const inputLocal = document.getElementById("local");
  const inputValor = document.getElementById("valor");
  const inputImagem = document.getElementById("imagem");
  const modalTitle = modal.querySelector("h2");

  let cardEditando = null;

  function salvarVeiculosNoStorage() {
    const veiculos = Array.from(cardsContainer.children).map(card => {
      return {
        modelo: card.querySelector("h3").textContent,
        ano: card.querySelector("p:nth-of-type(1)").textContent.replace("Ano:", "").trim(),
        local: card.querySelector("p:nth-of-type(2)").textContent.replace("Local:", "").trim(),
        valor: card.querySelector("p:nth-of-type(3)").textContent.replace("Valor:", "").trim(),
        imagem: card.querySelector("img").src
      };
    });
    localStorage.setItem("veiculosCadastrados", JSON.stringify(veiculos));
  }

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
      <p><strong>Valor:</strong> ${valor}</p>
      <div class="card-buttons">
        <button class="edit-btn" style="background-color: #ff7a3d; color: #fff; padding: 8px 12px; border: none; border-radius: 6px; font-weight: bold; cursor: pointer; margin-right: 10px;">Editar</button>
        <button class="delete-btn" style="background-color: #ff7a3d; color: #fff; padding: 8px 12px; border: none; border-radius: 6px; font-weight: bold; cursor: pointer;">Remover</button>
      </div>
    `;

    card.querySelector(".delete-btn").addEventListener("click", () => {
      cardsContainer.removeChild(card);
      salvarVeiculosNoStorage();
    });

    card.querySelector(".edit-btn").addEventListener("click", () => {
      inputLocal.value = card.querySelector("p:nth-of-type(2)").textContent.replace("Local:", "").trim();
      inputValor.value = card.querySelector("p:nth-of-type(3)").textContent.replace("Valor:", "").trim();
      modalTitle.textContent = "Editando Veículo";
      cardEditando = card;
      modal.classList.add("show");
    });

    cardsContainer.appendChild(card);
  }

  btnAdicionar.addEventListener("click", () => {
    modal.classList.add("show");
    modalTitle.textContent = "Adicionar Novo Veículo";
    form.reset();
    cardEditando = null;
  });

  btnCancelar.addEventListener("click", () => {
    modal.classList.remove("show");
    form.reset();
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const modelo = inputModelo.value;
    const ano = inputAno.value;
    const local = inputLocal.value;
    const valor = inputValor.value;
    const imagem = inputImagem.files[0];

    const reader = new FileReader();
    reader.onload = function () {
      if (cardEditando) {
        const imgTag = cardEditando.querySelector("img");
        const pLocal = cardEditando.querySelector("p:nth-of-type(2)");
        const pValor = cardEditando.querySelector("p:nth-of-type(3)");

        if (imagem) {
          imgTag.src = reader.result;
        }
        pLocal.innerHTML = `<strong>Local:</strong> ${local}`;
        pValor.innerHTML = `<strong>Valor:</strong> ${valor}`;

        modal.classList.remove("show");
        form.reset();
        cardEditando = null;
        salvarVeiculosNoStorage();
      } else {
        criarCardVeiculo(modelo, ano, local, valor, reader.result);
        modal.classList.remove("show");
        form.reset();
        salvarVeiculosNoStorage();
      }
    };

    if (imagem || cardEditando) {
      if (imagem) {
        reader.readAsDataURL(imagem);
      } else {
        reader.onload();
      }
    }
  });

  inputValor.addEventListener("input", function (e) {
    let value = e.target.value.replace(/\D/g, "");
    value = (Number(value) / 100).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL"
    });
    e.target.value = value;
  });

  carregarVeiculosDoStorage();
});
