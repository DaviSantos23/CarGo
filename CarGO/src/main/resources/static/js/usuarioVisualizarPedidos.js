/*
document.addEventListener("DOMContentLoaded", () => {
    const lista = document.getElementById("listaPedidos");
    const usuarioLogado = localStorage.getItem("usuarioLogado");
  

    const todosPedidos = JSON.parse(localStorage.getItem("pedidosUsuario")) || [];
    const pedidos = todosPedidos.filter(p => p.email === usuarioLogado);
  
    if (pedidos.length === 0) {
      lista.innerHTML = "<p style='text-align:center;'>Nenhum pedido encontrado.</p>";
      return;
    }
  
    const formatarData = data => {
      const [ano, mes, dia] = data.split("-");
      return `${dia}/${mes}/${ano}`;
    };
  
    const tabela = document.createElement("table");
    tabela.style.width = "100%";
    tabela.style.borderCollapse = "collapse";
    tabela.innerHTML = `
      <thead>
        <tr style="background-color: #333; color: white;">
          <th style="padding: 12px; border: 1px solid #444; width: 20%;">Veículo</th>
          <th style="padding: 12px; border: 1px solid #444;">Retirada</th>
          <th style="padding: 12px; border: 1px solid #444;">Devolução</th>
          <th style="padding: 12px; border: 1px solid #444;">Pagamento</th>
          <th style="padding: 12px; border: 1px solid #444;">Status</th>
          <th style="padding: 12px; border: 1px solid #444;">Ações</th>
        </tr>
      </thead>
      <tbody>
        ${pedidos.map((pedido, index) => `
          <tr data-index="${index}" style="text-align: center;">
            <td style="padding: 10px; border: 1px solid #444;">${pedido.veiculo}</td>
            <td style="padding: 10px; border: 1px solid #444;">${formatarData(pedido.retirada)}</td>
            <td style="padding: 10px; border: 1px solid #444;">${formatarData(pedido.devolucao)}</td>
            <td style="padding: 10px; border: 1px solid #444; text-transform: capitalize;">${pedido.pagamento}</td>
            <td style="padding: 10px; border: 1px solid #444;">${pedido.status || "Pendente"}</td>
            <td style="padding: 10px; border: 1px solid #444;">
              <button class="btn-acao btn-cancelar" data-index="${index}">Cancelar</button>
              <button class="btn-acao btn-editar" data-index="${index}">Editar</button>
            </td>
          </tr>
        `).join('')}
      </tbody>
    `;
  
    lista.appendChild(tabela);
  
    document.querySelectorAll(".btn-cancelar").forEach(button => {
      button.addEventListener("click", () => {
        const index = button.getAttribute("data-index");
        const atualizados = todosPedidos.filter(p => p.email === usuarioLogado);
        atualizados.splice(index, 1);
        const outros = todosPedidos.filter(p => p.email !== usuarioLogado);
        localStorage.setItem("pedidosUsuario", JSON.stringify([...outros, ...atualizados]));
        location.reload();
      });
    });
  
    document.querySelectorAll(".btn-editar").forEach(button => {
      button.addEventListener("click", () => {
        const index = button.getAttribute("data-index");
        const linha = document.querySelector(`tr[data-index='${index}']`);
        const pedido = pedidos[index];
  
        linha.innerHTML = `
          <td style="padding: 10px; border: 1px solid #444;"><input style="width: 100%; padding: 6px; border-radius: 6px; border: none; background-color: #555; color: #ccc;" type="text" value="${pedido.veiculo}" disabled></td>
          <td style="padding: 10px; border: 1px solid #444;"><input style="width: 100%; padding: 6px; border-radius: 6px; border: none;" type="date" value="${pedido.retirada}" min="${new Date().toISOString().split("T")[0]}" required></td>
          <td style="padding: 10px; border: 1px solid #444;"><input style="width: 100%; padding: 6px; border-radius: 6px; border: none;" type="date" value="${pedido.devolucao}" min="${pedido.retirada}" required></td>
          <td style="padding: 10px; border: 1px solid #444;">
            <select style="width: 100%; padding: 6px; border-radius: 6px; border: none;">
              <option value="credito" ${pedido.pagamento === "credito" ? "selected" : ""}>Crédito</option>
              <option value="debito" ${pedido.pagamento === "debito" ? "selected" : ""}>Débito</option>
              <option value="boleto" ${pedido.pagamento === "boleto" ? "selected" : ""}>Boleto</option>
              <option value="pix" ${pedido.pagamento === "pix" ? "selected" : ""}>Pix</option>
            </select>
          </td>
          <td style="padding: 10px; border: 1px solid #444;">${pedido.status || "Pendente"}</td>
          <td style="padding: 10px; border: 1px solid #444; display: flex; flex-direction: column; gap: 5px;">
            <button class="btn-acao btn-salvar" data-index="${index}">Salvar</button>
            <button class="btn-acao btn-cancelar-edicao" data-index="${index}">Cancelar</button>
          </td>
        `;
  
        linha.querySelector(".btn-salvar").addEventListener("click", () => {
          const novaRetirada = linha.querySelectorAll("input[type='date']")[0].value;
          const novaDevolucao = linha.querySelectorAll("input[type='date']")[1].value;
          const novoPagamento = linha.querySelector("select").value;
  
          let count = -1;
          const indexGlobal = todosPedidos.findIndex(p => {
            if (p.email === usuarioLogado) {
              count++;
              return count === parseInt(index);
            }
            return false;
          });
  
          if (indexGlobal !== -1) {
            todosPedidos[indexGlobal].retirada = novaRetirada;
            todosPedidos[indexGlobal].devolucao = novaDevolucao;
            todosPedidos[indexGlobal].pagamento = novoPagamento;
            localStorage.setItem("pedidosUsuario", JSON.stringify(todosPedidos));
            location.reload();
          }
        });
  
        linha.querySelector(".btn-cancelar-edicao").addEventListener("click", () => {
          location.reload();
        });
      });
    });
  });
  

  document.addEventListener("DOMContentLoaded", () => {
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
});
*/

//alert("TESTE JAVASCRIPT");

function carregarPedidos() {
  fetch("http://localhost:8080/pedidos")
    .then(response => {
      if (!response.ok) {
        throw new Error("Erro ao carregar pedidos");
      }
      return response.json();
    })
    .then(pedidos => {
      exibirPedidos(pedidos); // Exibir os veículos na tela
    })
    .catch(error => {
      console.error("Erro:", error);
      alert("Erro ao carregar pedidos.");
    });
}

function exibirPedidos(pedidos) {
  const container = document.getElementById("cardsContainer");
  container.innerHTML = ""; // Limpa os cards antigos

  pedidos.forEach(pedido => {
    const card = document.createElement("div");
    card.classList.add("vehicle-card");

    card.innerHTML = `
      <h3>${pedido.veiculo.modelo}</h3>
      <p><strong>Data Retirada:</strong> ${pedido.dtRetirada}</p>
      <p><strong>Data Devolução:</strong> ${pedido.dtDevolucao}</p>
      <p><strong>Forma Pagamento:</strong> ${pedido.formaPagamento}</p>
    `;

    container.appendChild(card);
  });
}

document.addEventListener("DOMContentLoaded", function () {
  carregarPedidos(); // Chama a função ao carregar a página
});