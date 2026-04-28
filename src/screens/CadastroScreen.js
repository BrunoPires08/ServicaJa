// CadastroScreen.js
// Tela de cadastro - o usuário escolhe se é cliente ou prestador
// Isso é importante pois cada perfil tem funcionalidades diferentes

import { useState } from 'react';
import {
  View, Text, TextInput,
  TouchableOpacity, StyleSheet,
  KeyboardAvoidingView, Platform, ScrollView
} from 'react-native';

export default function CadastroScreen({ navigation }) {

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [tipo, setTipo] = useState('usuario'); // 'usuario' ou 'prestador'

  function handleCadastro() {
    if (!nome || !email || !senha) {
      alert('Preencha todos os campos!');
      return;
    }
    // Por enquanto só navega para Home
    // Depois vamos salvar no banco de dados real
    navigation.replace('Home');
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >

        <Text style={styles.titulo}>Criar conta</Text>
        <Text style={styles.subtitulo}>É rápido e gratuito</Text>

        {/* Seletor de tipo de conta */}
        <Text style={styles.label}>Você é:</Text>
        <View style={styles.tipoContainer}>

          <TouchableOpacity
            style={[
              styles.tipoBotao,
              tipo === 'usuario' && styles.tipoBotaoAtivo  // destaca se selecionado
            ]}
            onPress={() => setTipo('usuario')}
          >
            <Text style={styles.tipoIcone}>👤</Text>
            <Text style={[
              styles.tipoTexto,
              tipo === 'usuario' && styles.tipoTextoAtivo
            ]}>
              Cliente
            </Text>
            <Text style={styles.tipoDesc}>Quero contratar serviços</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.tipoBotao,
              tipo === 'prestador' && styles.tipoBotaoAtivo
            ]}
            onPress={() => setTipo('prestador')}
          >
            <Text style={styles.tipoIcone}>🔧</Text>
            <Text style={[
              styles.tipoTexto,
              tipo === 'prestador' && styles.tipoTextoAtivo
            ]}>
              Prestador
            </Text>
            <Text style={styles.tipoDesc}>Quero oferecer serviços</Text>
          </TouchableOpacity>

        </View>

        {/* Campos */}
        <Text style={styles.label}>Nome completo</Text>
        <TextInput
          style={styles.input}
          placeholder="Seu nome"
          placeholderTextColor="#9DB5AE"
          value={nome}
          onChangeText={setNome}
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="seu@email.com"
          placeholderTextColor="#9DB5AE"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text style={styles.label}>Senha</Text>
        <TextInput
          style={styles.input}
          placeholder="mínimo 6 caracteres"
          placeholderTextColor="#9DB5AE"
          value={senha}
          onChangeText={setSenha}
          secureTextEntry={true}
        />

        <TouchableOpacity style={styles.botaoPrincipal} onPress={handleCadastro}>
          <Text style={styles.botaoPrincipalTexto}>Criar conta</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.botaoSecundario}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.botaoSecundarioTexto}>
            Já tem conta? <Text style={styles.link}>Entrar</Text>
          </Text>
        </TouchableOpacity>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A2E26',
  },
  scroll: {
    padding: 32,
    paddingTop: 60,
  },
  titulo: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  subtitulo: {
    fontSize: 16,
    color: '#9DB5AE',
    marginBottom: 32,
  },
  label: {
    fontSize: 14,
    color: '#9DB5AE',
    marginBottom: 8,
  },
  tipoContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  tipoBotao: {
    flex: 1,
    backgroundColor: '#243D35',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2E5446',
  },
  tipoBotaoAtivo: {
    borderColor: '#1D9E75',
    backgroundColor: '#1A3D2E',
  },
  tipoIcone: {
    fontSize: 28,
    marginBottom: 8,
  },
  tipoTexto: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#9DB5AE',
    marginBottom: 4,
  },
  tipoTextoAtivo: {
    color: '#1D9E75',
  },
  tipoDesc: {
    fontSize: 11,
    color: '#9DB5AE',
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#243D35',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#2E5446',
  },
  botaoPrincipal: {
    backgroundColor: '#1D9E75',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  botaoPrincipalTexto: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  botaoSecundario: {
    alignItems: 'center',
    marginTop: 20,
    paddingBottom: 32,
  },
  botaoSecundarioTexto: {
    color: '#9DB5AE',
    fontSize: 14,
  },
  link: {
    color: '#1D9E75',
    fontWeight: 'bold',
  },
});