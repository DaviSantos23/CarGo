/*document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("formPedido");
  
    form.addEventListener("submit", (e) => {
      e.preventDefault();
  
      const veiculo = document.getElementById("veiculo").value;
      const retirada = document.getElementById("dataRetirada").value;
      const devolucao = document.getElementById("dataDevolucao").value;
      const pagamento = document.getElementById("formaPagamento").value;
  
      if (!veiculo || !retirada || !devolucao || !pagamento) {
        alert("Por favor, preencha todos os campos.");
        return;
      }

      const usuarioLogado = localStorage.getItem("usuarioLogado");

      const novoPedido = {
        veiculo,
        retirada,
        devolucao,
        pagamento,
        email: usuarioLogado
      };
  
      const pedidosSalvos = JSON.parse(localStorage.getItem("pedidosUsuario")) || [];
      pedidosSalvos.push(novoPedido);
      localStorage.setItem("pedidosUsuario", JSON.stringify(pedidosSalvos));
  
      alert("✅ Pedido efetuado com sucesso!");
      form.reset();
    });
  
    const selectVeiculo = document.getElementById("veiculo");
    const veiculos = JSON.parse(localStorage.getItem("veiculosCadastrados")) || [];
    const modelosAdicionados = new Set();
  
    veiculos.forEach(veiculo => {
      const modelo = veiculo.modelo;
      if (!modelosAdicionados.has(modelo)) {
        const option = document.createElement("option");
        option.value = modelo;
        option.textContent = modelo;
        selectVeiculo.appendChild(option);
        modelosAdicionados.add(modelo);
      }
    });
  });
  
const dataRetiradaInput = document.getElementById("dataRetirada");
const dataDevolucaoInput = document.getElementById("dataDevolucao");

dataRetiradaInput.addEventListener("change", () => {
  dataDevolucaoInput.min = dataRetiradaInput.value;
});*/

function cadastrarPedido(event){
  event.preventDefault();

  const pedido = {
    veiculo: document.getElementById("veiculo").value,
    dtRetirada: document.getElementById("dataRetirada").value,
    dtDevolucao: document.getElementById("dataDevolucao").value,
    formaPagamento: document.getElementById("formaPagamento").value
  };

  fetch("http://localhost:8080/pedidos", {
    method: "POST",
    headers: {
        "Content-type": "application/json"
    },
    body: JSON.stringify(pedido)
  })
  .then(response => {
    if(!response.ok){
      throw new Error("Erro ao cadastrar pedido")
    }
    return response.json();
  })
  .then(data => {
    alert("Cadastro realizado com sucesso!");
    
  })
  .catch(error => {
    console.error("Erro: ", error);
    alert("Erro ao cadastrar. Verifique os dados e tente novamente.");
  });

}

function carregarVeiculos() {
  fetch("http://localhost:8080/veiculos") // Ajuste a URL se necessário
    .then(response => {
      if (!response.ok) {
        throw new Error("Erro ao carregar veículos");
      }
      return response.json();
    })
    .then(veiculos => {
      const selectVeiculo = document.getElementById("veiculo");
      selectVeiculo.innerHTML = '<option value="">Selecione um veículo</option>'; // Limpa e adiciona opção padrão

      veiculos.forEach(veiculo => {
        const option = document.createElement("option");
        option.value = veiculo.placa; // O valor será a placa do veículo
        option.textContent = `${veiculo.modelo} - ${veiculo.placa}`; // Exibir modelo + placa
        selectVeiculo.appendChild(option);
      });
    })
    .catch(error => {
      console.error("Erro ao carregar veículos:", error);
      alert("Erro ao carregar veículos. Tente novamente mais tarde.");
    });
}

// Chama a função ao carregar a página
document.addEventListener("DOMContentLoaded", carregarVeiculos);


document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  form.addEventListener("submit", cadastrarPedido);

});
