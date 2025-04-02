function validarIdade() {
    const nascimento = document.getElementById("nascimento").value;
    const dataNasc = new Date(nascimento);
    const hoje = new Date();
    let idade = hoje.getFullYear() - dataNasc.getFullYear();
    const m = hoje.getMonth() - dataNasc.getMonth();
  
    if (m < 0 || (m === 0 && hoje.getDate() < dataNasc.getDate())) {
      idade--;
    }
  
    if (idade < 18) {
      alert("É necessário ter 18 anos ou mais para se cadastrar.");
      return false;
    }
  
    return true;
  }