import { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, ActivityIndicator, Alert
} from 'react-native';

// Dados temporários — depois virão do banco
const PEDIDOS_MOCK = [
  {
    id: 1,
    cliente: 'Ana Silva',
    servico: 'Instalação elétrica',
    data: '01/05/2026',
    hora: '10:00',
    endereco: 'Rua das Flores, 45',
    preco: 'R$ 80/hr',
    status: 'pendente',
  },
  {
    id: 2,
    cliente: 'Roberto Alves',
    servico: 'Troca de disjuntor',
    data: '02/05/2026',
    hora: '14:00',
    endereco: 'Av. Brasil, 200',
    preco: 'R$ 120',
    status: 'pendente',
  },
  {
    id: 3,
    cliente: 'Marcia Santos',
    servico: 'Revisão geral',
    data: '28/04/2026',
    hora: '09:00',
    endereco: 'Rua XV, 78',
    preco: 'R$ 200',
    status: 'concluido',
  },
];

export default function PainelPrestadorScreen() {

  const [pedidos, setPedidos] = useState(PEDIDOS_MOCK);
  const [abaSelecionada, setAbaSelecionada] = useState('pendentes');

  function handleAceitar(id) {
    Alert.alert('Confirmar', 'Aceitar este pedido?', [
      { text: 'Não', style: 'cancel' },
      {
        text: 'Aceitar', onPress: () => {
          setPedidos(prev => prev.map(p =>
            p.id === id ? { ...p, status: 'confirmado' } : p
          ));
        }
      }
    ]);
  }

  function handleRecusar(id) {
    Alert.alert('Confirmar', 'Recusar este pedido?', [
      { text: 'Não', style: 'cancel' },
      {
        text: 'Recusar', style: 'destructive', onPress: () => {
          setPedidos(prev => prev.map(p =>
            p.id === id ? { ...p, status: 'recusado' } : p
          ));
        }
      }
    ]);
  }

  const pedidosFiltrados = pedidos.filter(p => {
    if (abaSelecionada === 'pendentes') return p.status === 'pendente';
    if (abaSelecionada === 'confirmados') return p.status === 'confirmado';
    if (abaSelecionada === 'historico') return ['concluido', 'recusado'].includes(p.status);
    return true;
  });

  // Métricas do painel
  const totalPendentes = pedidos.filter(p => p.status === 'pendente').length;
  const totalConfirmados = pedidos.filter(p => p.status === 'confirmado').length;
  const totalConcluidos = pedidos.filter(p => p.status === 'concluido').length;

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.saudacao}>Olá, Prestador 👋</Text>
            <Text style={styles.titulo}>Seu painel</Text>
          </View>
          <View style={styles.avatar}>
            <Text style={styles.avatarTexto}>BP</Text>
          </View>
        </View>

        {/* Métricas */}
        <View style={styles.metricas}>
          <View style={styles.metricaCard}>
            <Text style={styles.metricaNumero}>{totalPendentes}</Text>
            <Text style={styles.metricaLabel}>Pendentes</Text>
          </View>
          <View style={styles.metricaCard}>
            <Text style={[styles.metricaNumero, { color: '#1D9E75' }]}>{totalConfirmados}</Text>
            <Text style={styles.metricaLabel}>Confirmados</Text>
          </View>
          <View style={styles.metricaCard}>
            <Text style={styles.metricaNumero}>{totalConcluidos}</Text>
            <Text style={styles.metricaLabel}>Concluídos</Text>
          </View>
        </View>

        {/* Abas */}
        <View style={styles.abas}>
          {[
            { key: 'pendentes', label: 'Pendentes' },
            { key: 'confirmados', label: 'Confirmados' },
            { key: 'historico', label: 'Histórico' },
          ].map(aba => (
            <TouchableOpacity
              key={aba.key}
              style={[styles.aba, abaSelecionada === aba.key && styles.abaAtiva]}
              onPress={() => setAbaSelecionada(aba.key)}
            >
              <Text style={[
                styles.abaTexto,
                abaSelecionada === aba.key && styles.abaTextoAtivo
              ]}>
                {aba.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Lista de pedidos */}
        {pedidosFiltrados.length === 0 ? (
          <View style={styles.vazioContainer}>
            <Text style={styles.vazioIcone}>📋</Text>
            <Text style={styles.vazioTexto}>Nenhum pedido aqui</Text>
          </View>
        ) : (
          pedidosFiltrados.map(pedido => (
            <View key={pedido.id} style={styles.pedidoCard}>
              <View style={styles.pedidoHeader}>
                <View style={styles.clienteAvatar}>
                  <Text style={styles.clienteAvatarTexto}>
                    {pedido.cliente.split(' ').map(n => n[0]).join('')}
                  </Text>
                </View>
                <View style={styles.pedidoInfo}>
                  <Text style={styles.clienteNome}>{pedido.cliente}</Text>
                  <Text style={styles.pedidoServico}>{pedido.servico}</Text>
                </View>
                <Text style={styles.pedidoPreco}>{pedido.preco}</Text>
              </View>

              <View style={styles.pedidoDetalhes}>
                <Text style={styles.detalhe}>📅 {pedido.data} às {pedido.hora}</Text>
                <Text style={styles.detalhe}>📍 {pedido.endereco}</Text>
              </View>

              {pedido.status === 'pendente' && (
                <View style={styles.acoes}>
                  <TouchableOpacity
                    style={styles.botaoAceitar}
                    onPress={() => handleAceitar(pedido.id)}
                  >
                    <Text style={styles.botaoAceitarTexto}>✓ Aceitar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.botaoRecusar}
                    onPress={() => handleRecusar(pedido.id)}
                  >
                    <Text style={styles.botaoRecusarTexto}>✕ Recusar</Text>
                  </TouchableOpacity>
                </View>
              )}

              {pedido.status === 'confirmado' && (
                <View style={styles.statusConfirmado}>
                  <Text style={styles.statusConfirmadoTexto}>✓ Confirmado</Text>
                </View>
              )}

              {pedido.status === 'concluido' && (
                <View style={styles.statusConcluido}>
                  <Text style={styles.statusConcluidoTexto}>✅ Concluído</Text>
                </View>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  saudacao: {
    fontSize: 14,
    color: '#9DB5AE',
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 4,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#1D9E75',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarTexto: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  metricas: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  metricaCard: {
    flex: 1,
    backgroundColor: '#243D35',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2E5446',
  },
  metricaNumero: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  metricaLabel: {
    fontSize: 11,
    color: '#9DB5AE',
    marginTop: 4,
  },
  abas: {
    flexDirection: 'row',
    backgroundColor: '#243D35',
    borderRadius: 10,
    padding: 4,
    marginBottom: 20,
  },
  aba: {
    flex: 1,
    padding: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  abaAtiva: {
    backgroundColor: '#1D9E75',
  },
  abaTexto: {
    fontSize: 12,
    color: '#9DB5AE',
    fontWeight: '500',
  },
  abaTextoAtivo: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  vazioContainer: {
    alignItems: 'center',
    marginTop: 60,
    gap: 8,
  },
  vazioIcone: { fontSize: 40 },
  vazioTexto: {
    fontSize: 16,
    color: '#9DB5AE',
  },
  pedidoCard: {
    backgroundColor: '#243D35',
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#2E5446',
  },
  pedidoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  clienteAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1D9E75',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  clienteAvatarTexto: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 13,
  },
  pedidoInfo: { flex: 1 },
  clienteNome: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  pedidoServico: {
    color: '#9DB5AE',
    fontSize: 12,
    marginTop: 2,
  },
  pedidoPreco: {
    color: '#1D9E75',
    fontSize: 13,
    fontWeight: 'bold',
  },
  pedidoDetalhes: {
    gap: 4,
    marginBottom: 12,
    borderTopWidth: 1,
    borderTopColor: '#2E5446',
    paddingTop: 10,
  },
  detalhe: {
    color: '#9DB5AE',
    fontSize: 13,
  },
  acoes: {
    flexDirection: 'row',
    gap: 10,
  },
  botaoAceitar: {
    flex: 1,
    backgroundColor: '#1D9E75',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  botaoAceitarTexto: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 13,
  },
  botaoRecusar: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#FF6B6B',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  botaoRecusarTexto: {
    color: '#FF6B6B',
    fontSize: 13,
  },
  statusConfirmado: {
    backgroundColor: '#1A3D2E',
    padding: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  statusConfirmadoTexto: {
    color: '#1D9E75',
    fontWeight: 'bold',
    fontSize: 13,
  },
  statusConcluido: {
    backgroundColor: '#1A2A3D',
    padding: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  statusConcluidoTexto: {
    color: '#9DB5AE',
    fontSize: 13,
  },
});