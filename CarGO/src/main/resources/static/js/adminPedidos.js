/*document.addEventListener("DOMContentLoaded", () => {
  const lista = document.getElementById("listaPedidos");
  let pedidosFinanceiro = JSON.parse(localStorage.getItem("pedidosFinanceiro")) || [];

  if (pedidosFinanceiro.length === 0) {
    lista.innerHTML = "<p style='text-align:center;'>Nenhum pedido aprovado pelo financeiro encontrado.</p>";
    return;
  }

  const formatarData = data => {
    const [ano, mes, dia] = data.split("-");
    return `${dia}/${mes}/${ano}`;
  };

  const renderTabela = () => {
    lista.innerHTML = "";
    const tabela = document.createElement("table");
    tabela.style.width = "100%";
    tabela.style.borderCollapse = "collapse";
    tabela.innerHTML = `
      <thead>
        <tr style="background-color: #333; color: white;">
          <th style="padding: 12px; border: 1px solid #444;">Usuário</th>
          <th style="padding: 12px; border: 1px solid #444;">Veículo</th>
          <th style="padding: 12px; border: 1px solid #444;">Retirada</th>
          <th style="padding: 12px; border: 1px solid #444;">Devolução</th>
          <th style="padding: 12px; border: 1px solid #444;">Pagamento</th>
          <th style="padding: 12px; border: 1px solid #444;">Status</th>
          <th style="padding: 12px; border: 1px solid #444;">Ações</th>
        </tr>
      </thead>
      <tbody>
        ${pedidosFinanceiro.map((pedido, index) => `
          <tr data-index="${index}" style="text-align: center;">
            <td style="padding: 10px; border: 1px solid #444;">${pedido.email}</td>
            <td style="padding: 10px; border: 1px solid #444;">${pedido.veiculo}</td>
            <td style="padding: 10px; border: 1px solid #444;">${formatarData(pedido.retirada)}</td>
            <td style="padding: 10px; border: 1px solid #444;">${formatarData(pedido.devolucao)}</td>
            <td style="padding: 10px; border: 1px solid #444;">${pedido.pagamento}</td>
            <td style="padding: 10px; border: 1px solid #444;">Aprovado F</td>
            <td style="padding: 10px; border: 1px solid #444; display: flex; gap: 10px; justify-content: center;">
              <button class="btn-aprovar" data-index="${index}">Aprovar</button>
              <button class="btn-recusar" data-index="${index}">Recusar</button>
            </td>
          </tr>
        `).join("")}
      </tbody>
    `;

    lista.appendChild(tabela);
    adicionarEventos();
  };

  const adicionarEventos = () => {
    document.querySelectorAll(".btn-aprovar").forEach(button => {
      button.addEventListener("click", () => {
        const index = parseInt(button.getAttribute("data-index"));
        const confirmar = confirm("Tem certeza que deseja aprovar este pedido?");
        if (!confirmar) return;

        const pedido = pedidosFinanceiro[index];
        pedido.status = "Aprovado";

        const pedidosUsuario = JSON.parse(localStorage.getItem("pedidosUsuario")) || [];
        pedidosUsuario.push(pedido);
        localStorage.setItem("pedidosUsuario", JSON.stringify(pedidosUsuario));

        pedidosFinanceiro.splice(index, 1);
        localStorage.setItem("pedidosFinanceiro", JSON.stringify(pedidosFinanceiro));

        renderTabela();
      });
    });

    document.querySelectorAll(".btn-recusar").forEach(button => {
      button.addEventListener("click", () => {
        const index = parseInt(button.getAttribute("data-index"));
        const confirmar = confirm("Tem certeza que deseja recusar este pedido?");
        if (!confirmar) return;

        const pedido = pedidosFinanceiro[index];
        pedido.status = "Recusado";

        const pedidosUsuario = JSON.parse(localStorage.getItem("pedidosUsuario")) || [];
        pedidosUsuario.push(pedido);
        localStorage.setItem("pedidosUsuario", JSON.stringify(pedidosUsuario));

        pedidosFinanceiro.splice(index, 1);
        localStorage.setItem("pedidosFinanceiro", JSON.stringify(pedidosFinanceiro));

        renderTabela();
      });
    });
  };

  renderTabela();
});*/

function carregarPedidos() {
  fetch("http://localhost:8080/pedidos")
    .then(response => {
      if (!response.ok) {
        throw new Error("Erro ao carregar pedidos");
      }
      return response.json();
    })
    .then(pedidos => {
      const pendentes = pedidos.filter(p => p.status === "VALIDADO_FINANCEIRO");
      exibirPedidos(pendentes); // Exibir os veículos na tela
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
      <p><strong>Status:</strong> ${pedido.status}</p>
      <button class="btn-validar" data-id="${pedido.id}">Validar Pedido</button>

    `;

    container.appendChild(card);
  });

  // Adicionar eventos aos botões de validação
document.querySelectorAll(".btn-validar").forEach(button => {
  button.addEventListener("click", () => {
    const pedidoId = button.getAttribute("data-id");
    const confirmar = confirm("Deseja validar este pedido?");
    if (!confirmar) return;

    fetch(`http://localhost:8080/pedidos/${pedidoId}/validarAdmin`, {
      method: "PUT"
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("Erro ao validar pedido");
        }
        alert("Pedido validado com sucesso!");
        carregarPedidos(); // Atualiza a lista
      })
      .catch(error => {
        console.error("Erro:", error);
        alert("Erro ao validar pedido.");
      });
  });
});
}

document.addEventListener("DOMContentLoaded", function () {
  carregarPedidos(); // Chama a função ao carregar a página
});