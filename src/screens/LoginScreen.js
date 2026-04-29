import { useState } from 'react';
import {
  View, Text, TextInput,
  TouchableOpacity, StyleSheet,
  KeyboardAvoidingView, Platform, ActivityIndicator, Alert
} from 'react-native';
import { loginUsuario } from '../api';

export default function LoginScreen({ navigation }) {

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [carregando, setCarregando] = useState(false);

  async function handleLogin() {
    if (!email || !senha) {
      Alert.alert('Atenção', 'Preencha email e senha!');
      return;
    }
    setCarregando(true);
    const resultado = await loginUsuario(email, senha);
    setCarregando(false);

    if (resultado.erro) {
      Alert.alert('Erro', resultado.erro);
    } else {
      // Login OK — vai para o app
      navigation.replace('Main');
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.logoArea}>
        <Text style={styles.logoTexto}>serviç</Text>
        <Text style={styles.logoDestaque}>já</Text>
      </View>

      <Text style={styles.subtitulo}>Bem-vindo de volta!</Text>

      <View style={styles.form}>
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
          placeholder="sua senha"
          placeholderTextColor="#9DB5AE"
          value={senha}
          onChangeText={setSenha}
          secureTextEntry={true}
        />

        <TouchableOpacity
          style={styles.botaoPrincipal}
          onPress={handleLogin}
          disabled={carregando}
        >
          {carregando
            ? <ActivityIndicator color="#fff" />
            : <Text style={styles.botaoPrincipalTexto}>Entrar</Text>
          }
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.botaoSecundario}
          onPress={() => navigation.navigate('Cadastro')}
        >
          <Text style={styles.botaoSecundarioTexto}>
            Não tem conta? <Text style={styles.link}>Criar conta</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A2E26',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  logoArea: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  logoTexto: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  logoDestaque: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#1D9E75',
  },
  subtitulo: {
    fontSize: 16,
    color: '#9DB5AE',
    marginBottom: 40,
  },
  form: {
    width: '100%',
  },
  label: {
    fontSize: 14,
    color: '#9DB5AE',
    marginBottom: 6,
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