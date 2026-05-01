import { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, TextInput, Alert, ActivityIndicator
} from 'react-native';

export default function AvaliacaoScreen({ navigation, route }) {

  const agendamento = route.params?.agendamento || {
    prestador_nome: 'Carlos Rocha',
    servico: 'Eletricista',
    data: '28/04/2026',
    hora: '14:00',
  };

  const [nota, setNota] = useState(0);
  const [comentario, setComentario] = useState('');
  const [carregando, setCarregando] = useState(false);

  async function handleAvaliar() {
    if (nota === 0) {
      Alert.alert('Atenção', 'Selecione uma nota de 1 a 5!');
      return;
    }

    setCarregando(true);

    // Simula envio — depois conecta ao backend
    setTimeout(() => {
      setCarregando(false);
      Alert.alert(
        'Avaliação enviada! ⭐',
        'Obrigado pelo seu feedback!',
        [{ text: 'OK', onPress: () => navigation.navigate('Main') }]
      );
    }, 1000);
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.voltar}>← Voltar</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitulo}>Avaliar serviço</Text>
        <View style={{ width: 60 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Card do prestador */}
        <View style={styles.prestadorCard}>
          <View style={styles.prestadorAvatar}>
            <Text style={styles.prestadorAvatarTexto}>
              {agendamento.prestador_nome?.split(' ').map(n => n[0]).join('')}
            </Text>
          </View>
          <View style={styles.prestadorInfo}>
            <Text style={styles.prestadorNome}>{agendamento.prestador_nome}</Text>
            <Text style={styles.prestadorServico}>{agendamento.servico}</Text>
            <Text style={styles.prestadorData}>
              📅 {agendamento.data} às {agendamento.hora}
            </Text>
          </View>
        </View>

        {/* Seleção de estrelas */}
        <Text style={styles.secaoTitulo}>Como foi o serviço?</Text>
        <View style={styles.estrelasContainer}>
          {[1, 2, 3, 4, 5].map((estrela) => (
            <TouchableOpacity
              key={estrela}
              onPress={() => setNota(estrela)}
              style={styles.estrelaBotao}
            >
              <Text style={[
                styles.estrela,
                nota >= estrela && styles.estrelaAtiva
              ]}>
                ★
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Label da nota */}
        {nota > 0 && (
          <Text style={styles.notaLabel}>
            {nota === 1 ? '😞 Péssimo' : ''}
            {nota === 2 ? '😕 Ruim' : ''}
            {nota === 3 ? '😐 Regular' : ''}
            {nota === 4 ? '😊 Bom' : ''}
            {nota === 5 ? '🤩 Excelente!' : ''}
          </Text>
        )}

        {/* Comentário */}
        <Text style={styles.secaoTitulo}>Deixe um comentário</Text>
        <TextInput
          style={styles.comentarioInput}
          placeholder="Conte como foi sua experiência..."
          placeholderTextColor="#9DB5AE"
          value={comentario}
          onChangeText={setComentario}
          multiline
          numberOfLines={4}
          textAlignVertical="top"
        />

        {/* Botão enviar */}
        <TouchableOpacity
          style={[styles.botaoEnviar, nota === 0 && styles.botaoDesabilitado]}
          onPress={handleAvaliar}
          disabled={carregando || nota === 0}
        >
          {carregando
            ? <ActivityIndicator color="#fff" />
            : <Text style={styles.botaoEnviarTexto}>Enviar avaliação</Text>
          }
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  voltar: {
    color: '#1D9E75',
    fontSize: 16,
    width: 60,
  },
  headerTitulo: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  prestadorCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#243D35',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 24,
    marginBottom: 32,
    borderWidth: 1,
    borderColor: '#2E5446',
  },
  prestadorAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#1D9E75',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  prestadorAvatarTexto: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 18,
  },
  prestadorInfo: { flex: 1 },
  prestadorNome: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: 'bold',
  },
  prestadorServico: {
    color: '#9DB5AE',
    fontSize: 14,
    marginTop: 2,
  },
  prestadorData: {
    color: '#9DB5AE',
    fontSize: 12,
    marginTop: 4,
  },
  secaoTitulo: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 16,
    paddingHorizontal: 24,
  },
  estrelasContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    marginBottom: 12,
  },
  estrelaBotao: {
    padding: 8,
  },
  estrela: {
    fontSize: 48,
    color: '#2E5446',
  },
  estrelaAtiva: {
    color: '#EF9F27',
  },
  notaLabel: {
    textAlign: 'center',
    fontSize: 18,
    color: '#FFFFFF',
    marginBottom: 32,
    fontWeight: '500',
  },
  comentarioInput: {
    backgroundColor: '#243D35',
    borderRadius: 12,
    padding: 16,
    fontSize: 15,
    color: '#FFFFFF',
    marginHorizontal: 24,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#2E5446',
    minHeight: 120,
  },
  botaoEnviar: {
    backgroundColor: '#1D9E75',
    padding: 18,
    borderRadius: 14,
    alignItems: 'center',
    marginHorizontal: 24,
  },
  botaoDesabilitado: {
    opacity: 0.5,
  },
  botaoEnviarTexto: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});