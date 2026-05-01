import { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, ActivityIndicator, Alert
} from 'react-native';
import { buscarAgendamentos, cancelarAgendamento } from '../api';

export default function MeusAgendamentosScreen() {

  const [agendamentos, setAgendamentos] = useState([]);
  const [carregando, setCarregando] = useState(true);

  // Busca os agendamentos quando a tela abre
  useEffect(() => {
    carregarAgendamentos();
  }, []);

  async function carregarAgendamentos() {
    setCarregando(true);
    const dados = await buscarAgendamentos();
    setAgendamentos(Array.isArray(dados) ? dados : []);
    setCarregando(false);
  }

  async function handleCancelar(id) {
    Alert.alert(
      'Cancelar agendamento',
      'Tem certeza que deseja cancelar?',
      [
        { text: 'Não', style: 'cancel' },
        {
          text: 'Sim, cancelar',
          style: 'destructive',
          onPress: async () => {
            const resultado = await cancelarAgendamento(id);
            if (resultado.erro) {
              Alert.alert('Erro', resultado.erro);
            } else {
              carregarAgendamentos();
            }
          }
        }
      ]
    );
  }

  if (carregando) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#1D9E75" />
        <Text style={styles.loadingTexto}>Carregando agendamentos...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Meus Agendamentos</Text>

      <ScrollView showsVerticalScrollIndicator={false}>
        {agendamentos.length === 0 ? (
          <View style={styles.vazioContainer}>
            <Text style={styles.vazioIcone}>📅</Text>
            <Text style={styles.vazioTexto}>Nenhum agendamento ainda</Text>
            <Text style={styles.vazioSubtexto}>Agende um serviço na tela inicial!</Text>
          </View>
        ) : (
          agendamentos.map((ag) => (
            <View key={ag.id} style={styles.card}>
              <View style={styles.cardHeader}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarTexto}>
                    {ag.prestador_nome?.split(' ').map(n => n[0]).join('')}
                  </Text>
                </View>
                <View style={styles.info}>
                  <Text style={styles.prestadorNome}>{ag.prestador_nome}</Text>
                  <Text style={styles.servico}>{ag.servico}</Text>
                </View>
                <View style={[
                  styles.badge,
                  ag.status === 'pendente' && styles.badgePendente,
                  ag.status === 'confirmado' && styles.badgeConfirmado,
                  ag.status === 'cancelado' && styles.badgeCancelado,
                ]}>
                  <Text style={styles.badgeTexto}>
                    {ag.status === 'pendente' ? '⏳ Pendente' : ''}
                    {ag.status === 'confirmado' ? '✓ Confirmado' : ''}
                    {ag.status === 'cancelado' ? '✕ Cancelado' : ''}
                  </Text>
                </View>
              </View>

              <View style={styles.cardFooter}>
                <Text style={styles.dataHora}>📅 {ag.data} às {ag.hora}</Text>
                <Text style={styles.preco}>💰 {ag.preco}</Text>
              </View>

              {ag.status === 'pendente' && (
                <TouchableOpacity
                  style={styles.botaoCancelar}
                  onPress={() => handleCancelar(ag.id)}
                >
                  <Text style={styles.botaoCancelarTexto}>Cancelar</Text>
                </TouchableOpacity>
              )}
            </View>
          ))
        )}
        <View style={{ height: 32 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A2E26',
    paddingTop: 60,
    paddingHorizontal: 24,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#1A2E26',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  loadingTexto: {
    color: '#9DB5AE',
    fontSize: 14,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 24,
  },
  vazioContainer: {
    alignItems: 'center',
    marginTop: 80,
    gap: 8,
  },
  vazioIcone: {
    fontSize: 48,
    marginBottom: 8,
  },
  vazioTexto: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  vazioSubtexto: {
    fontSize: 14,
    color: '#9DB5AE',
  },
  card: {
    backgroundColor: '#243D35',
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#2E5446',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#1D9E75',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatarTexto: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  info: { flex: 1 },
  prestadorNome: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
  },
  servico: {
    color: '#9DB5AE',
    fontSize: 13,
    marginTop: 2,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  badgePendente: { background: '#3D2E1A' },
  badgeConfirmado: { backgroundColor: '#1A3D2E' },
  badgeCancelado: { backgroundColor: '#3D1A1A' },
  badgeTexto: {
    fontSize: 11,
    color: '#9DB5AE',
    fontWeight: '500',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#2E5446',
    paddingTop: 10,
    marginBottom: 8,
  },
  dataHora: {
    color: '#9DB5AE',
    fontSize: 13,
  },
  preco: {
    color: '#1D9E75',
    fontSize: 13,
    fontWeight: 'bold',
  },
  botaoCancelar: {
    borderWidth: 1,
    borderColor: '#FF6B6B',
    borderRadius: 8,
    padding: 8,
    alignItems: 'center',
  },
  botaoCancelarTexto: {
    color: '#FF6B6B',
    fontSize: 13,
  },
});