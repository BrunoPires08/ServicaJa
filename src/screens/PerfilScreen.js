// PerfilScreen.js
// Tela de perfil do usuário

import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity
} from 'react-native';

export default function PerfilScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Header do perfil */}
        <View style={styles.header}>
          <View style={styles.avatar}>
            <Text style={styles.avatarTexto}>BP</Text>
          </View>
          <Text style={styles.nome}>Bruno Pires</Text>
          <Text style={styles.email}>bruno.pires@email.com</Text>
          <TouchableOpacity style={styles.botaoEditar}>
            <Text style={styles.botaoEditarTexto}>Editar perfil</Text>
          </TouchableOpacity>
        </View>

        {/* Estatísticas */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statNumero}>12</Text>
            <Text style={styles.statLabel}>Serviços</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumero}>4.8</Text>
            <Text style={styles.statLabel}>Avaliação</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumero}>3</Text>
            <Text style={styles.statLabel}>Pendentes</Text>
          </View>
        </View>

        {/* Menu de opções */}
        <View style={styles.menu}>

          {[
            { icone: '📋', titulo: 'Meus agendamentos', subtitulo: 'Veja seu histórico completo' },
            { icone: '❤️', titulo: 'Favoritos', subtitulo: 'Prestadores salvos' },
            { icone: '🔔', titulo: 'Notificações', subtitulo: 'Gerencie seus alertas' },
            { icone: '🔒', titulo: 'Segurança', subtitulo: 'Senha e privacidade' },
            { icone: '❓', titulo: 'Ajuda', subtitulo: 'Suporte e FAQ' },
          ].map((item, index) => (
            <TouchableOpacity key={index} style={styles.menuItem}>
              <Text style={styles.menuIcone}>{item.icone}</Text>
              <View style={styles.menuInfo}>
                <Text style={styles.menuTitulo}>{item.titulo}</Text>
                <Text style={styles.menuSubtitulo}>{item.subtitulo}</Text>
              </View>
              <Text style={styles.menuSeta}>›</Text>
            </TouchableOpacity>
          ))}

        </View>

        {/* Botão sair */}
        <TouchableOpacity
          style={styles.botaoSair}
          onPress={() => navigation.replace('Login')}
        >
          <Text style={styles.botaoSairTexto}>Sair da conta</Text>
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A2E26',
    paddingTop: 60,
  },
  header: {
    alignItems: 'center',
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#1D9E75',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  avatarTexto: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 28,
  },
  nome: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    color: '#9DB5AE',
    marginBottom: 16,
  },
  botaoEditar: {
    borderWidth: 1,
    borderColor: '#1D9E75',
    borderRadius: 20,
    paddingHorizontal: 24,
    paddingVertical: 8,
  },
  botaoEditarTexto: {
    color: '#1D9E75',
    fontSize: 14,
    fontWeight: '500',
  },
  statsRow: {
    flexDirection: 'row',
    marginHorizontal: 24,
    gap: 12,
    marginBottom: 28,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#243D35',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2E5446',
  },
  statNumero: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1D9E75',
  },
  statLabel: {
    fontSize: 12,
    color: '#9DB5AE',
    marginTop: 4,
  },
  menu: {
    marginHorizontal: 24,
    backgroundColor: '#243D35',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#2E5446',
    overflow: 'hidden',
    marginBottom: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#2E5446',
  },
  menuIcone: {
    fontSize: 20,
    marginRight: 14,
  },
  menuInfo: {
    flex: 1,
  },
  menuTitulo: {
    fontSize: 15,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  menuSubtitulo: {
    fontSize: 12,
    color: '#9DB5AE',
    marginTop: 2,
  },
  menuSeta: {
    fontSize: 20,
    color: '#9DB5AE',
  },
  botaoSair: {
    marginHorizontal: 24,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FF6B6B',
    alignItems: 'center',
  },
  botaoSairTexto: {
    color: '#FF6B6B',
    fontSize: 15,
    fontWeight: '500',
  },
});