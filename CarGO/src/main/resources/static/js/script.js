function buscarCarro() {
    const input = document.querySelector('.hero input');
    alert(`Procurando por: ${input.value}`);
}

function formatarMoeda(valor) {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor);
  }