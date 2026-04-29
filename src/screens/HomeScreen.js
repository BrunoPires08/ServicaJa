// HomeScreen.js
import { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, TextInput
} from 'react-native';

const CATEGORIAS = [
  { id: 1, icone: '🔧', nome: 'Reparos' },
  { id: 2, icone: '🧹', nome: 'Limpeza' },
  { id: 3, icone: '⚡', nome: 'Elétrica' },
  { id: 4, icone: '💇', nome: 'Beleza' },
  { id: 5, icone: '🎨', nome: 'Pintura' },
  { id: 6, icone: '🪴', nome: 'Jardim' },
];

const PRESTADORES = [
  { id: 1, nome: 'Carlos Rocha', servico: 'Eletricista', avaliacao: '4.9', preco: 'R$ 80/hr' },
  { id: 2, nome: 'Marta Lima', servico: 'Limpeza', avaliacao: '4.8', preco: 'R$ 60/hr' },
  { id: 3, nome: 'João Fix', servico: 'Encanador', avaliacao: '4.7', preco: 'R$ 70/hr' },
];

export default function HomeScreen({ navigation }) {

  const [busca, setBusca] = useState('');

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        <View style={styles.header}>
          <View>
            <Text style={styles.saudacao}>Olá, Bruno 👋</Text>
            <Text style={styles.pergunta}>O que precisa hoje?</Text>
          </View>
          <View style={styles.avatar}>
            <Text style={styles.avatarTexto}>BP</Text>
          </View>
        </View>

        <View style={styles.buscaContainer}>
          <Text style={styles.buscaIcone}>🔍</Text>
          <TextInput
            style={styles.buscaInput}
            placeholder="Buscar serviço ou profissional..."
            placeholderTextColor="#9DB5AE"
            value={busca}
            onChangeText={setBusca}
          />
        </View>

        <Text style={styles.secaoTitulo}>Categorias</Text>
        <View style={styles.categoriasGrid}>
          {CATEGORIAS.map((cat) => (
            <TouchableOpacity key={cat.id} style={styles.categoriaCard}>
              <Text style={styles.categoriaIcone}>{cat.icone}</Text>
              <Text style={styles.categoriaTexto}>{cat.nome}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.secaoTitulo}>Mais avaliados</Text>

        {/* ✅ onPress adicionado — clica no prestador e vai para Agendamento */}
        {PRESTADORES.map((p) => (
          <TouchableOpacity
            key={p.id}
            style={styles.prestadorCard}
            onPress={() => navigation.navigate('Agendamento', { prestador: p })}
          >
            <View style={styles.prestadorAvatar}>
              <Text style={styles.prestadorAvatarTexto}>
                {p.nome.split(' ').map(n => n[0]).join('')}
              </Text>
            </View>
            <View style={styles.prestadorInfo}>
              <Text style={styles.prestadorNome}>{p.nome}</Text>
              <Text style={styles.prestadorServico}>{p.servico}</Text>
              <Text style={styles.prestadorAvaliacao}>⭐ {p.avaliacao}</Text>
            </View>
            <Text style={styles.prestadorPreco}>{p.preco}</Text>
          </TouchableOpacity>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  saudacao: {
    fontSize: 16,
    color: '#9DB5AE',
  },
  pergunta: {
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
  buscaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#243D35',
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 28,
    borderWidth: 1,
    borderColor: '#2E5446',
  },
  buscaIcone: {
    fontSize: 16,
    marginRight: 8,
  },
  buscaInput: {
    flex: 1,
    padding: 14,
    fontSize: 15,
    color: '#FFFFFF',
  },
  secaoTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  categoriasGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 28,
  },
  categoriaCard: {
    width: '30%',
    backgroundColor: '#243D35',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2E5446',
  },
  categoriaIcone: {
    fontSize: 28,
    marginBottom: 8,
  },
  categoriaTexto: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  prestadorCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#243D35',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#2E5446',
  },
  prestadorAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#1D9E75',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  prestadorAvatarTexto: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  prestadorInfo: {
    flex: 1,
  },
  prestadorNome: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  prestadorServico: {
    fontSize: 13,
    color: '#9DB5AE',
    marginTop: 2,
  },
  prestadorAvaliacao: {
    fontSize: 12,
    color: '#9DB5AE',
    marginTop: 4,
  },
  prestadorPreco: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#1D9E75',
  },
});