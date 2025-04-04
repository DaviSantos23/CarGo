document.addEventListener("DOMContentLoaded", () => {
    const lista = document.getElementById("listaContratos");
    const pedidosUsuario = JSON.parse(localStorage.getItem("pedidosUsuario")) || [];
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  
    const formatarSalario = (valor) => {
      if (!valor) return "-";
      const numero = parseFloat(valor.replace(/[R$\s.]/g, "").replace(",", "."));
      if (isNaN(numero)) return "-";
      return numero.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });
    };
  
    const pedidosAprovados = pedidosUsuario.filter(p => p.status === "Aprovado");
  
    if (pedidosAprovados.length === 0) {
      lista.innerHTML = "<p style='text-align:center;'>Nenhum contrato disponível no momento.</p>";
      return;
    }
  
    pedidosAprovados.forEach(pedido => {
      const usuario = usuarios.find(u => u.email === pedido.email);
      if (!usuario) return;
  
      const iniciais = usuario.nome?.split(" ").map(n => n[0]).join("").toUpperCase() || "--";
      const jaAssinado = pedido.assinado;
  
      const card = document.createElement("div");
      card.className = "card-contrato";
      card.innerHTML = `
        <h3>${iniciais}</h3>
        <p><strong>RG:</strong> ${usuario.rg}</p>
        <p><strong>CPF:</strong> ${usuario.cpf}</p>
        <p><strong>Endereço:</strong> ${usuario.endereco}</p>
        <p><strong>Profissão:</strong> ${usuario.profissao}</p>
        <p><strong>Entidade:</strong> ${usuario.entidade}</p>
        <p><strong>Veículo:</strong> ${pedido.veiculo}</p>
        <p><strong>Rendimento Auferido:</strong> ${formatarSalario(usuario.salario)}</p>
        <button class="btn-assinar" ${jaAssinado ? "disabled" : ""}>
          <i class="fas ${jaAssinado ? "fa-check" : "fa-pen"}"></i>
          ${jaAssinado ? "Assinado" : "Assinar"}
        </button>
      `;
  
      const botao = card.querySelector(".btn-assinar");
      botao.addEventListener("click", () => {
        if (confirm("Deseja assinar este contrato?")) {
          botao.innerHTML = `<i class='fas fa-check'></i> Assinado`;
          botao.disabled = true;
          pedido.assinado = true;
  
          localStorage.setItem("pedidosUsuario", JSON.stringify(pedidosUsuario));
        }
      });
  
      lista.appendChild(card);
    });
  });
  