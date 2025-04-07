/*document.addEventListener("DOMContentLoaded", () => {
    const lista = document.getElementById("listaPedidos");
    const pedidos = JSON.parse(localStorage.getItem("pedidosUsuario")) || [];
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const veiculos = JSON.parse(localStorage.getItem("veiculosCadastrados")) || [];
  
    const formatarData = data => {
      const [ano, mes, dia] = data.split("-");
      return `${dia}/${mes}/${ano}`;
    };
  
    const formatarSalario = valor => {
      if (!valor) return "-";
      const numero = parseFloat(valor.replace(/[R$\s.]/g, "").replace(",", "."));
      if (isNaN(numero)) return "-";
      return numero.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
    };
  
    const formatarValor = modelo => {
      const veiculo = veiculos.find(v => v.modelo === modelo);
      if (!veiculo || !veiculo.valor) return "-";
      return parseFloat(veiculo.valor.replace(/[R$\s.]/g, "").replace(",", ".")).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
      });
    };
  
    if (pedidos.length === 0) {
      lista.innerHTML = "<p style='text-align:center;'>Nenhum pedido encontrado.</p>";
      return;
    }
  
    const tabela = document.createElement("table");
    tabela.style.width = "100%";
    tabela.style.borderCollapse = "collapse";
    tabela.innerHTML = `
      <thead>
        <tr style="background-color: #333; color: white;">
          <th style="padding: 12px; border: 1px solid #444;">Usuário</th>
          <th style="padding: 12px; border: 1px solid #444; width: 140px;">CPF</th>
          <th style="padding: 12px; border: 1px solid #444;">Profissão</th>
          <th style="padding: 12px; border: 1px solid #444;">Salário</th>
          <th style="padding: 12px; border: 1px solid #444;">Veículo</th>
          <th style="padding: 12px; border: 1px solid #444;">Valor Diária</th>
          <th style="padding: 12px; border: 1px solid #444;">Retirada</th>
          <th style="padding: 12px; border: 1px solid #444;">Devolução</th>
          <th style="padding: 12px; border: 1px solid #444;">Pagamento</th>
          <th style="padding: 12px; border: 1px solid #444;">Ações</th>
        </tr>
      </thead>
      <tbody>
        ${pedidos.map((pedido, index) => {
          const usuario = usuarios.find(u => u.email === pedido.email) || {};
          return `
          <tr data-index="${index}" style="text-align: center;">
            <td style="padding: 10px; border: 1px solid #444;">${pedido.email}</td>
            <td style="padding: 10px; border: 1px solid #444;">${usuario.cpf || '-'}</td>
            <td style="padding: 10px; border: 1px solid #444;">${usuario.profissao || '-'}</td>
            <td style="padding: 10px; border: 1px solid #444;">${formatarSalario(usuario.salario)}</td>
            <td style="padding: 10px; border: 1px solid #444;">${pedido.veiculo}</td>
            <td style="padding: 10px; border: 1px solid #444;">${formatarValor(pedido.veiculo)}</td>
            <td style="padding: 10px; border: 1px solid #444;">${formatarData(pedido.retirada)}</td>
            <td style="padding: 10px; border: 1px solid #444;">${formatarData(pedido.devolucao)}</td>
            <td style="padding: 10px; border: 1px solid #444;">${pedido.pagamento}</td>
            <td style="padding: 10px; border: 1px solid #444;">
              <div style="display: flex; gap: 10px; justify-content: center;">
                <button class="btn-aprovar" data-index="${index}">Aprovar</button>
                <button class="btn-recusar" data-index="${index}">Recusar</button>
              </div>
            </td>
          </tr>
          `;
        }).join("")}
      </tbody>
    `;
  
    lista.appendChild(tabela);
  
    // Eventos
    document.querySelectorAll(".btn-aprovar").forEach(button => {
      button.addEventListener("click", () => {
        const index = parseInt(button.getAttribute("data-index"));
        const confirmar = confirm("Deseja aprovar este pedido?");
        if (!confirmar) return;
  
        const pedido = pedidos[index];
        const pedidosFinanceiro = JSON.parse(localStorage.getItem("pedidosFinanceiro")) || [];
        pedidosFinanceiro.push(pedido);
        localStorage.setItem("pedidosFinanceiro", JSON.stringify(pedidosFinanceiro));
  
        pedidos.splice(index, 1);
        localStorage.setItem("pedidosUsuario", JSON.stringify(pedidos));
        location.reload();
      });
    });
  
    document.querySelectorAll(".btn-recusar").forEach(button => {
      button.addEventListener("click", () => {
        const index = parseInt(button.getAttribute("data-index"));
        const confirmar = confirm("Deseja recusar este pedido?");
        if (!confirmar) return;
  
        const pedido = pedidos[index];
        pedido.status = "Reprovado";
  
        const pedidosReprovados = JSON.parse(localStorage.getItem("pedidosReprovados")) || [];
        pedidosReprovados.push(pedido);
        localStorage.setItem("pedidosReprovados", JSON.stringify(pedidosReprovados));
  
        pedidos.splice(index, 1);
        localStorage.setItem("pedidosUsuario", JSON.stringify(pedidos));
        location.reload();
      });
    });
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
        const pendentes = pedidos.filter(p => p.status === "AGUARDANDO_VALIDACAO_FINANCEIRO");
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

      fetch(`http://localhost:8080/pedidos/${pedidoId}/validarFinanceiro`, {
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