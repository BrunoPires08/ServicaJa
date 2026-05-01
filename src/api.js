// api.js
// Comunicação central com o backend

const BASE_URL = 'http://192.168.0.5:3000';

// Guarda o token na memória do app
let tokenAtual = null;

export function salvarToken(token) {
  tokenAtual = token;
}

export function getToken() {
  return tokenAtual;
}

// Login
export async function loginUsuario(email, senha) {
  try {
    const resposta = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, senha })
    });
    const dados = await resposta.json();
    if (dados.token) salvarToken(dados.token);
    return dados;
  } catch (erro) {
    return { erro: 'Servidor indisponível. Tente novamente.' };
  }
}

// Cadastro
export async function cadastrarUsuario(nome, email, senha, tipo) {
  try {
    const resposta = await fetch(`${BASE_URL}/auth/cadastro`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome, email, senha, tipo })
    });
    const dados = await resposta.json();
    if (dados.token) salvarToken(dados.token);
    return dados;
  } catch (erro) {
    return { erro: 'Servidor indisponível. Tente novamente.' };
  }
}

// Criar agendamento
export async function criarAgendamento(dados) {
  try {
    const resposta = await fetch(`${BASE_URL}/agendamentos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authorization': tokenAtual
      },
      body: JSON.stringify(dados)
    });
    return await resposta.json();
  } catch (erro) {
    return { erro: 'Servidor indisponível. Tente novamente.' };
  }
}

// Buscar agendamentos
export async function buscarAgendamentos() {
  try {
    const resposta = await fetch(`${BASE_URL}/agendamentos`, {
      headers: { 'authorization': tokenAtual }
    });
    return await resposta.json();
  } catch (erro) {
    return [];
  }
}

// Cancelar agendamento
export async function cancelarAgendamento(id) {
  try {
    const resposta = await fetch(`${BASE_URL}/agendamentos/${id}/cancelar`, {
      method: 'PATCH',
      headers: { 'authorization': tokenAtual }
    });
    return await resposta.json();
  } catch (erro) {
    return { erro: 'Servidor indisponível. Tente novamente.' };
  }
}