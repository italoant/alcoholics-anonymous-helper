import { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useAuth } from '@/contexts/AuthContext';
import { ConfirmationModal } from '@/components/ConfirmationModal';
import { SuccessModal } from '@/components/SuccessModal';

export default function ProfileScreen() {
  const { logout, subscribedMeetings, unsubscribeFromMeeting } = useAuth();
  const [name, setName] = useState('João Silva');
  const [address, setAddress] = useState('Rua das Flores, 123');
  const [phone, setPhone] = useState('(11) 99999-9999');
  const [showUnsubscribeModal, setShowUnsubscribeModal] = useState(false);
  const [showMotivationalModal, setShowMotivationalModal] = useState(false);
  const [selectedMeeting, setSelectedMeeting] = useState<any>(null);

  const handleUpdatePassword = () => {
    router.push('/update-password');
  };

  const handleLogout = () => {
    logout();
  };

  const handleUnsubscribe = (meeting: any) => {
    setSelectedMeeting(meeting);
    setShowUnsubscribeModal(true);
  };

  const confirmUnsubscribe = async () => {
    try {
      await unsubscribeFromMeeting(selectedMeeting);
      setShowUnsubscribeModal(false);
      setShowMotivationalModal(true);
    } catch (error) {
      console.error('Erro ao desistir da reunião:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <ThemedView style={styles.section}>
        <ThemedText type="title">Meus Dados</ThemedText>
        
        <ThemedView style={styles.inputContainer}>
          <ThemedText style={styles.label}>Nome</ThemedText>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholderTextColor="#666"
          />
        </ThemedView>

        <ThemedView style={styles.inputContainer}>
          <ThemedText style={styles.label}>Endereço</ThemedText>
          <TextInput
            style={styles.input}
            value={address}
            onChangeText={setAddress}
            placeholderTextColor="#666"
          />
        </ThemedView>

        <ThemedView style={styles.inputContainer}>
          <ThemedText style={styles.label}>Telefone</ThemedText>
          <TextInput
            style={styles.input}
            value={phone}
            onChangeText={setPhone}
            placeholderTextColor="#666"
            keyboardType="phone-pad"
          />
        </ThemedView>

        <TouchableOpacity 
          style={styles.updatePasswordButton}
          onPress={handleUpdatePassword}
        >
          <ThemedText style={styles.updatePasswordButtonText}>
            Atualizar Senha
          </ThemedText>
        </TouchableOpacity>
      </ThemedView>

      <ThemedView style={styles.sectionDivider} />
      <ThemedText type="title" style={styles.sectionTitle}>Minhas Reuniões</ThemedText>
      
      {subscribedMeetings.length > 0 ? (
        subscribedMeetings.map((meeting, index) => (
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
              style={styles.unsubscribeButton}
              onPress={() => handleUnsubscribe(meeting)}
            >
              <ThemedText style={styles.unsubscribeButtonText}>
                Desistir da Reunião
              </ThemedText>
            </TouchableOpacity>
          </ThemedView>
        ))
      ) : (
        <ThemedView style={styles.emptyMeetings}>
          <ThemedText style={styles.emptyMeetingsText}>
            Você ainda não está inscrito em nenhuma reunião.
          </ThemedText>
        </ThemedView>
      )}

      <TouchableOpacity 
        style={styles.logoutButton}
        onPress={handleLogout}
      >
        <ThemedText style={styles.logoutButtonText}>
          Sair
        </ThemedText>
      </TouchableOpacity>

      <ConfirmationModal
        visible={showUnsubscribeModal}
        title="Confirmar Desistência"
        message={`Tem certeza que deseja desistir da reunião "${selectedMeeting?.title}"?`}
        confirmText="Sim, quero desistir"
        cancelText="Não, quero continuar"
        onConfirm={confirmUnsubscribe}
        onCancel={() => setShowUnsubscribeModal(false)}
      />

      <SuccessModal
        visible={showMotivationalModal}
        message="Lembre-se que cada passo é importante na sua jornada. Se precisar de apoio, estamos aqui para você. Você sempre será bem-vindo(a) quando se sentir pronto(a) para voltar!"
        onClose={() => setShowMotivationalModal(false)}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  section: {
    padding: 20,
    marginBottom: 20,
  },
  sectionDivider: {
    height: 1,
    backgroundColor: '#2d2d2d',
    marginBottom: 30,
  },
  sectionTitle: {
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#e0e0e0',
  },
  input: {
    backgroundColor: '#2d2d2d',
    padding: 15,
    borderRadius: 10,
    color: '#e0e0e0',
    fontSize: 16,
  },
  updatePasswordButton: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  updatePasswordButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  meetingCard: {
    backgroundColor: '#2d2d2d',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    marginHorizontal: 20,
  },
  meetingInfo: {
    fontSize: 14,
    marginTop: 5,
    color: '#e0e0e0',
  },
  unsubscribeButton: {
    backgroundColor: '#e74c3c',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 15,
  },
  unsubscribeButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  emptyMeetings: {
    padding: 20,
    alignItems: 'center',
  },
  emptyMeetingsText: {
    color: '#666',
    fontSize: 16,
    textAlign: 'center',
  },
  logoutButton: {
    backgroundColor: '#e74c3c',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    margin: 20,
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 