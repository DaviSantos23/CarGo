document.addEventListener("DOMContentLoaded", () => {
    const lista = document.getElementById("listaPedidos");
    let pedidos = JSON.parse(localStorage.getItem("pedidosUsuario")) || [];
  
    // Garante que todos os pedidos tenham status definido
    pedidos = pedidos.map(p => {
      if (!p.status) p.status = "Pendente";
      return p;
    });
    localStorage.setItem("pedidosUsuario", JSON.stringify(pedidos));
  
    if (pedidos.length === 0) {
      lista.innerHTML = "<p style='text-align:center;'>Nenhum pedido encontrado.</p>";
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
            <th style="padding: 12px; border: 1px solid #444; width: 20%;">Veículo</th>
            <th style="padding: 12px; border: 1px solid #444;">Retirada</th>
            <th style="padding: 12px; border: 1px solid #444;">Devolução</th>
            <th style="padding: 12px; border: 1px solid #444;">Pagamento</th>
            <th style="padding: 12px; border: 1px solid #444;">Status</th>
            <th style="padding: 12px; border: 1px solid #444;">Ações</th>
          </tr>
        </thead>
        <tbody>
          ${pedidos.map((pedido, index) => pedido.status === "Pendente" ? `
            <tr data-index="${index}" style="text-align: center;">
              <td style="padding: 10px; border: 1px solid #444;">${pedido.email}</td>
              <td style="padding: 10px; border: 1px solid #444;">${pedido.veiculo}</td>
              <td style="padding: 10px; border: 1px solid #444;">${formatarData(pedido.retirada)}</td>
              <td style="padding: 10px; border: 1px solid #444;">${formatarData(pedido.devolucao)}</td>
              <td style="padding: 10px; border: 1px solid #444; text-transform: capitalize;">${pedido.pagamento}</td>
              <td style="padding: 10px; border: 1px solid #444;">${pedido.status}</td>
              <td style="padding: 10px; border: 1px solid #444; display: flex; gap: 10px; justify-content: center;">
                <button class="btn-aprovar" data-index="${index}">Aprovar</button>
                <button class="btn-recusar" data-index="${index}">Recusar</button>
              </td>
            </tr>
          ` : "").join('')}
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
  
          pedidos[index].status = "Aprovado";
          localStorage.setItem("pedidosUsuario", JSON.stringify(pedidos));
          renderTabela();
        });
      });
  
      document.querySelectorAll(".btn-recusar").forEach(button => {
        button.addEventListener("click", () => {
          const index = parseInt(button.getAttribute("data-index"));
          const confirmar = confirm("Tem certeza que deseja recusar este pedido?");
          if (!confirmar) return;
  
          pedidos[index].status = "Recusado";
          localStorage.setItem("pedidosUsuario", JSON.stringify(pedidos));
          renderTabela();
        });
      });
    };
  
    renderTabela();
  });