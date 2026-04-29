// api.js
// Arquivo central de comunicação com o servidor
// Todas as chamadas ao backend passam por aqui

// Endereço do servidor
// Durante desenvolvimento usamos o IP da máquina
// IMPORTANTE: troca pelo IP do seu computador na rede
const BASE_URL = 'http://192.168.0.148:3000';
// Função de login
export async function loginUsuario(email, senha) {
  try {
    const resposta = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, senha })
    });
    const dados = await resposta.json();
    return dados;
  } catch (erro) {
    return { erro: 'Servidor indisponível. Tente novamente.' };
  }
}

// Função de cadastro
export async function cadastrarUsuario(nome, email, senha, tipo) {
  try {
    const resposta = await fetch(`${BASE_URL}/auth/cadastro`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome, email, senha, tipo })
    });
    const dados = await resposta.json();
    return dados;
  } catch (erro) {
    return { erro: 'Servidor indisponível. Tente novamente.' };
  }
}

// Função para criar agendamento
export async function criarAgendamento(token, dados) {
  try {
    const resposta = await fetch(`${BASE_URL}/agendamentos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authorization': token
      },
      body: JSON.stringify(dados)
    });
    const resultado = await resposta.json();
    return resultado;
  } catch (erro) {
    return { erro: 'Servidor indisponível. Tente novamente.' };
  }
}

// Função para buscar agendamentos do usuário
export async function buscarAgendamentos(token) {
  try {
    const resposta = await fetch(`${BASE_URL}/agendamentos`, {
      headers: { 'authorization': token }
    });
    const dados = await resposta.json();
    return dados;
  } catch (erro) {
    return [];
  }
}