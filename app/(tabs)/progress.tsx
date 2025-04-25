import { StyleSheet, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { ProgressData, loadProgress, saveProgress } from '@/constants/progressData';
import { useEffect, useState } from 'react';

export default function ProgressScreen() {
  const [progress, setProgress] = useState<ProgressData | null>(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  useEffect(() => {
    loadProgressData();
  }, []);

  const loadProgressData = async () => {
    const data = await loadProgress();
    setProgress(data);
    // Verifica se já registrou hoje
    const today = new Date().toISOString().split('T')[0];
    setIsButtonDisabled(data?.lastUpdate === today);
  };

  const handleTodaySober = async () => {
    const today = new Date().toISOString().split('T')[0];
    const currentDays = progress?.daysSober || 0;
    
    // Verifica se já registrou hoje
    if (progress?.lastUpdate === today) {
      return;
    }

    const newProgress: ProgressData = {
      lastUpdate: today,
      daysSober: currentDays + 1
    };

    try {
      await saveProgress(newProgress);
      setProgress(newProgress);
      setIsButtonDisabled(true);
    } catch (error) {
      console.error('Erro ao salvar progresso:', error);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.counterContainer}>
        <ThemedText style={styles.daysText}>
          {progress?.daysSober || 0}
        </ThemedText>
        <ThemedText style={styles.labelText}>
          dias sóbrio
        </ThemedText>
      </ThemedView>

      <TouchableOpacity 
        style={[
          styles.button,
          isButtonDisabled ? styles.disabledButton : null
        ]}
        onPress={handleTodaySober}
        disabled={isButtonDisabled}
      >
        <ThemedText style={styles.buttonText}>
          {isButtonDisabled ? 'Você é incrível! 💪' : 'Hoje eu não bebi'}
        </ThemedText>
      </TouchableOpacity>

      <ThemedView style={styles.messageContainer}>
        <ThemedText style={styles.messageText}>
          {isButtonDisabled 
            ? 'Parabéns por mais um dia de vitória! 🎉' 
            : 'Cada dia é uma vitória! Continue assim!'}
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
  counterContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  daysText: {
    fontSize: 72,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  labelText: {
    fontSize: 24,
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    marginBottom: 30,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  messageContainer: {
    alignItems: 'center',
  },
  messageText: {
    fontSize: 16,
    textAlign: 'center',
  },
  disabledButton: {
    backgroundColor: '#666',
  },
}); 