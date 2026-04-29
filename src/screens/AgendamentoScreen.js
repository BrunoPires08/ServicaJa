// AgendamentoScreen.js
// Tela de agendamento de serviço
// O usuário escolhe a data, horário e confirma

import { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, Alert
} from 'react-native';

// Horários disponíveis (depois virão do backend)
const HORARIOS = [
  '08:00', '09:00', '10:00', '11:00',
  '13:00', '14:00', '15:00', '16:00', '17:00'
];

// Gera os próximos 7 dias para escolha
function gerarDias() {
  const dias = [];
  const semana = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  for (let i = 0; i < 7; i++) {
    const data = new Date();
    data.setDate(data.getDate() + i);
    dias.push({
      id: i,
      diaSemana: semana[data.getDay()],
      dia: data.getDate(),
      dataCompleta: data.toLocaleDateString('pt-BR'),
    });
  }
  return dias;
}

export default function AgendamentoScreen({ navigation, route }) {

  // Recebe os dados do prestador da tela anterior
  const prestador = route.params?.prestador || {
    nome: 'Carlos Rocha',
    servico: 'Eletricista',
    preco: 'R$ 80/hr'
  };

  const [diaSelecionado, setDiaSelecionado] = useState(null);
  const [horarioSelecionado, setHorarioSelecionado] = useState(null);

  function handleConfirmar() {
    if (!diaSelecionado || !horarioSelecionado) {
      Alert.alert('Atenção', 'Selecione um dia e horário!');
      return;
    }
    Alert.alert(
      'Agendamento confirmado! 🎉',
      `${prestador.nome}\n${diaSelecionado.dataCompleta} às ${horarioSelecionado}`,
      [{ text: 'Ótimo!', onPress: () => navigation.navigate('Home') }]
    );
  }

  return (
    <View style={styles.container}>

      {/* Header com botão voltar */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.voltar}>← Voltar</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitulo}>Agendar serviço</Text>
        <View style={{ width: 60 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Card do prestador */}
        <View style={styles.prestadorCard}>
          <View style={styles.prestadorAvatar}>
            <Text style={styles.prestadorAvatarTexto}>
              {prestador.nome.split(' ').map(n => n[0]).join('')}
            </Text>
          </View>
          <View style={styles.prestadorInfo}>
            <Text style={styles.prestadorNome}>{prestador.nome}</Text>
            <Text style={styles.prestadorServico}>{prestador.servico}</Text>
            <Text style={styles.prestadorPreco}>{prestador.preco}</Text>
          </View>
        </View>

        {/* Seleção de dia */}
        <Text style={styles.secaoTitulo}>Escolha o dia</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.diasContainer}>
            {gerarDias().map((dia) => (
              <TouchableOpacity
                key={dia.id}
                style={[
                  styles.diaCard,
                  diaSelecionado?.id === dia.id && styles.diaCardAtivo
                ]}
                onPress={() => setDiaSelecionado(dia)}
              >
                <Text style={[
                  styles.diaSemana,
                  diaSelecionado?.id === dia.id && styles.textoAtivo
                ]}>
                  {dia.diaSemana}
                </Text>
                <Text style={[
                  styles.diaNumero,
                  diaSelecionado?.id === dia.id && styles.textoAtivo
                ]}>
                  {dia.dia}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        {/* Seleção de horário */}
        <Text style={styles.secaoTitulo}>Escolha o horário</Text>
        <View style={styles.horariosGrid}>
          {HORARIOS.map((hora) => (
            <TouchableOpacity
              key={hora}
              style={[
                styles.horarioCard,
                horarioSelecionado === hora && styles.horarioCardAtivo
              ]}
              onPress={() => setHorarioSelecionado(hora)}
            >
              <Text style={[
                styles.horarioTexto,
                horarioSelecionado === hora && styles.textoAtivo
              ]}>
                {hora}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Resumo */}
        {diaSelecionado && horarioSelecionado && (
          <View style={styles.resumoCard}>
            <Text style={styles.resumoTitulo}>Resumo do agendamento</Text>
            <Text style={styles.resumoTexto}>📅 {diaSelecionado.dataCompleta}</Text>
            <Text style={styles.resumoTexto}>🕐 {horarioSelecionado}</Text>
            <Text style={styles.resumoTexto}>👤 {prestador.nome}</Text>
            <Text style={styles.resumoTexto}>💰 {prestador.preco}</Text>
          </View>
        )}

        {/* Botão confirmar */}
        <TouchableOpacity
          style={[
            styles.botaoConfirmar,
            (!diaSelecionado || !horarioSelecionado) && styles.botaoDesabilitado
          ]}
          onPress={handleConfirmar}
        >
          <Text style={styles.botaoConfirmarTexto}>Confirmar agendamento</Text>
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
    marginBottom: 28,
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
  prestadorInfo: {
    flex: 1,
  },
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
  prestadorPreco: {
    color: '#1D9E75',
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 4,
  },
  secaoTitulo: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 16,
    paddingHorizontal: 24,
  },
  diasContainer: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    gap: 10,
    marginBottom: 28,
  },
  diaCard: {
    width: 60,
    backgroundColor: '#243D35',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2E5446',
  },
  diaCardAtivo: {
    backgroundColor: '#1D9E75',
    borderColor: '#1D9E75',
  },
  diaSemana: {
    color: '#9DB5AE',
    fontSize: 12,
    marginBottom: 4,
  },
  diaNumero: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  textoAtivo: {
    color: '#FFFFFF',
  },
  horariosGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 24,
    gap: 10,
    marginBottom: 28,
  },
  horarioCard: {
    width: '30%',
    backgroundColor: '#243D35',
    borderRadius: 10,
    padding: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2E5446',
  },
  horarioCardAtivo: {
    backgroundColor: '#1D9E75',
    borderColor: '#1D9E75',
  },
  horarioTexto: {
    color: '#9DB5AE',
    fontSize: 15,
    fontWeight: '500',
  },
  resumoCard: {
    backgroundColor: '#243D35',
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 24,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#1D9E75',
    gap: 8,
  },
  resumoTitulo: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  resumoTexto: {
    color: '#9DB5AE',
    fontSize: 14,
  },
  botaoConfirmar: {
    backgroundColor: '#1D9E75',
    padding: 18,
    borderRadius: 14,
    alignItems: 'center',
    marginHorizontal: 24,
  },
  botaoDesabilitado: {
    opacity: 0.5,
  },
  botaoConfirmarTexto: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});