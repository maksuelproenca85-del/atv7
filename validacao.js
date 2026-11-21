
/* ==========================================
   MK2 STUDIO - VALIDAÇÃO DO FORMULÁRIO
========================================== */

function validaCampos() {

    // 01. VALIDAÇÃO DO NOME
    var nome = document.getElementById("nome").value.trim();

    if (nome.length < 3 || nome.length > 100) {
        alert("Nome inválido!");
        return false;
    }


    // 02. VALIDAÇÃO DO E-MAIL
    var email = document.getElementById("email").value.trim();

    if (
        email.length < 10 ||
        email.length > 100 ||
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
        alert("Digite um e-mail válido!");
        return false;
    }


    // 03. VALIDAÇÃO DO TELEFONE
    var telefone = document.getElementById("telefone").value;

    telefone = telefone.replace(/\D/g, '');

    if (telefone.length !== 11) {
        alert("Telefone inválido! Digite 11 números com DDD.");
        return false;
    }


    // 04. VALIDAÇÃO DA MENSAGEM
    var mensagem = document.getElementById("mensagem").value.trim();

    if (mensagem.length < 10) {
        alert("Digite uma mensagem com pelo menos 10 caracteres!");
        return false;
    }


    // 05. CONFIRMAÇÃO DA VALIDAÇÃO
    alert("Formulário validado com sucesso!");

    return false;
}
