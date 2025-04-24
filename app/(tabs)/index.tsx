import { StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { supportPhrases } from '@/constants/supportPhrases';
import { useEffect, useState } from 'react';

export default function HomeScreen() {
  const [randomPhrase, setRandomPhrase] = useState('');

  useEffect(() => {
    // Seleciona uma frase aleatória quando o componente é montado
    const randomIndex = Math.floor(Math.random() * supportPhrases.length);
    setRandomPhrase(supportPhrases[randomIndex]);
  }, []);

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Bem-vindo ao Alcoólicos Anônimos</ThemedText>
      </ThemedView>
      <ThemedView style={styles.messageContainer}>
        <ThemedText style={styles.message}>
          "{randomPhrase}"
        </ThemedText>
        <ThemedText style={styles.subMessage}>
          Você não está sozinho nesta jornada. Juntos, podemos encontrar força e esperança.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.helpContainer}>
        <ThemedText style={styles.helpText}>
          Se precisar de ajuda imediata, entre em contato com:
        </ThemedText>
        <ThemedText style={styles.contactText}>
          Central de Atendimento AA: (11) 3315-9333
        </ThemedText>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleContainer: {
    marginBottom: 30,
  },
  messageContainer: {
    marginBottom: 40,
    alignItems: 'center',
  },
  message: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 15,
    fontStyle: 'italic',
  },
  subMessage: {
    fontSize: 18,
    textAlign: 'center',
  },
  helpContainer: {
    alignItems: 'center',
  },
  helpText: {
    fontSize: 16,
    marginBottom: 10,
  },
  contactText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
