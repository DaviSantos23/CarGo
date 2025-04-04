document.addEventListener("DOMContentLoaded", () => {
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
});
