import { StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useAuth } from '@/contexts/AuthContext';
import { SuccessModal } from '@/components/SuccessModal';
import { useState } from 'react';

export default function MeetingsScreen() {
  const { isAuthenticated, subscribeToMeeting } = useAuth();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [selectedMeeting, setSelectedMeeting] = useState<any>(null);

  const handleParticipate = async (meeting: any) => {
    if (!isAuthenticated) {
      router.push('/(tabs)/login');
      return;
    }

    try {
      await subscribeToMeeting(meeting);
      setSelectedMeeting(meeting);
      setShowSuccessModal(true);
    } catch (error) {
      console.error('Erro ao se inscrever na reunião:', error);
    }
  };

  const meetings = [
    {
      title: 'Reunião de Apoio',
      date: '25/03/2024',
      time: '19:00',
      location: 'Centro de Apoio'
    },
    {
      title: 'Reunião de Compartilhamento',
      date: '26/03/2024',
      time: '20:00',
      location: 'Igreja São Francisco'
    },
    {
      title: 'Reunião de Estudos',
      date: '27/03/2024',
      time: '18:30',
      location: 'Centro Comunitário'
    },
    {
      title: 'Reunião de Novos Membros',
      date: '28/03/2024',
      time: '19:30',
      location: 'Centro de Apoio'
    },
    {
      title: 'Reunião de Fim de Semana',
      date: '30/03/2024',
      time: '15:00',
      location: 'Paróquia Santa Maria'
    }
  ];

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Reuniões</ThemedText>
      </ThemedView>

      <ScrollView style={styles.scrollView}>
        {meetings.map((meeting, index) => (
          <ThemedView key={index} style={styles.meetingCard}>
            <ThemedText type="subtitle">{meeting.title}</ThemedText>
            <ThemedText style={styles.meetingInfo}>
              Data: {meeting.date}
            </ThemedText>
            <ThemedText style={styles.meetingInfo}>
              Horário: {meeting.time}
            </ThemedText>
            <ThemedText style={styles.meetingInfo}>
              Local: {meeting.location}
            </ThemedText>

            <TouchableOpacity 
              style={styles.participateButton} 
              onPress={() => handleParticipate(meeting)}
            >
              <ThemedText style={styles.participateButtonText}>
                Quero Participar
              </ThemedText>
            </TouchableOpacity>
          </ThemedView>
        ))}
      </ScrollView>

      <SuccessModal
        visible={showSuccessModal}
        message={`A reunião "${selectedMeeting?.title}" foi adicionada à sua lista de "Minhas Reuniões" na aba de perfil.`}
        onClose={() => {
          setShowSuccessModal(false);
          router.push('/(tabs)/profile');
        }}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  titleContainer: {
    padding: 20,
    marginBottom: 20,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  meetingCard: {
    backgroundColor: '#2d2d2d',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  meetingInfo: {
    fontSize: 16,
    marginTop: 10,
    color: '#e0e0e0',
  },
  participateButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  participateButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
}); 