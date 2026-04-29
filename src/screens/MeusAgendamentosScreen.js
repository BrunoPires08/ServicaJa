// MeusAgendamentosScreen.js
// Lista de agendamentos do usuário

import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity
} from 'react-native';

const AGENDAMENTOS = [
  {
    id: 1,
    prestador: 'Carlos Rocha',
    servico: 'Eletricista',
    data: '28/04/2026',
    hora: '14:00',
    status: 'confirmado',
  },
  {
    id: 2,
    prestador: 'Marta Lima',
    servico: 'Limpeza',
    data: '29/04/2026',
    hora: '09:00',
    status: 'pendente',
  },
  {
    id: 3,
    prestador: 'João Fix',
    servico: 'Encanador',
    data: '24/04/2026',
    hora: '11:00',
    status: 'concluido',
  },
];

export default function MeusAgendamentosScreen() {
  return (
    <View style={styles.container}>

      <Text style={styles.titulo}>Meus Agendamentos</Text>

      <ScrollView showsVerticalScrollIndicator={false}>
        {AGENDAMENTOS.map((ag) => (
          <View key={ag.id} style={styles.card}>

            {/* Linha superior */}
            <View style={styles.cardHeader}>
              <View style={styles.avatar}>
                <Text style={styles.avatarTexto}>
                  {ag.prestador.split(' ').map(n => n[0]).join('')}
                </Text>
              </View>
              <View style={styles.info}>
                <Text style={styles.prestadorNome}>{ag.prestador}</Text>
                <Text style={styles.servico}>{ag.servico}</Text>
              </View>
              <View style={[
                styles.badge,
                ag.status === 'confirmado' && styles.badgeConfirmado,
                ag.status === 'pendente' && styles.badgePendente,
                ag.status === 'concluido' && styles.badgeConcluido,
              ]}>
                <Text style={styles.badgeTexto}>
                  {ag.status === 'confirmado' ? '✓ Confirmado' : ''}
                  {ag.status === 'pendente' ? '⏳ Pendente' : ''}
                  {ag.status === 'concluido' ? '✅ Concluído' : ''}
                </Text>
              </View>
            </View>

            {/* Linha inferior */}
            <View style={styles.cardFooter}>
              <Text style={styles.dataHora}>📅 {ag.data} às {ag.hora}</Text>
              {ag.status === 'concluido' && (
                <TouchableOpacity style={styles.botaoAvaliar}>
                  <Text style={styles.botaoAvaliarTexto}>⭐ Avaliar</Text>
                </TouchableOpacity>
              )}
              {ag.status === 'confirmado' && (
                <TouchableOpacity style={styles.botaoCancelar}>
                  <Text style={styles.botaoCancelarTexto}>Cancelar</Text>
                </TouchableOpacity>
              )}
            </View>

          </View>
        ))}
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
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 24,
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
  info: {
    flex: 1,
  },
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
  badgeConfirmado: {
    backgroundColor: '#1A3D2E',
  },
  badgePendente: {
    backgroundColor: '#3D2E1A',
  },
  badgeConcluido: {
    backgroundColor: '#1A2A3D',
  },
  badgeTexto: {
    fontSize: 11,
    color: '#9DB5AE',
    fontWeight: '500',
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#2E5446',
    paddingTop: 10,
  },
  dataHora: {
    color: '#9DB5AE',
    fontSize: 13,
  },
  botaoAvaliar: {
    backgroundColor: '#1D9E75',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 8,
  },
  botaoAvaliarTexto: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  botaoCancelar: {
    borderWidth: 1,
    borderColor: '#FF6B6B',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 8,
  },
  botaoCancelarTexto: {
    color: '#FF6B6B',
    fontSize: 12,
  },
});