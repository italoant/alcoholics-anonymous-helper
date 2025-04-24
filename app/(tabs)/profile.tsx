import { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useAuth } from '@/contexts/AuthContext';

export default function ProfileScreen() {
  const { logout } = useAuth();
  const [name, setName] = useState('João Silva');
  const [address, setAddress] = useState('Rua das Flores, 123');
  const [phone, setPhone] = useState('(11) 99999-9999');

  const handleUpdatePassword = () => {
    router.push('/update-password');
  };

  const handleLogout = () => {
    logout();
  };

  const subscribedMeetings = [
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
    }
  ];

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

      <ThemedView style={styles.section}>
        <ThemedView style={styles.sectionDivider} />
        <ThemedText type="title" style={styles.sectionTitle}>Minhas Reuniões</ThemedText>
        
        {subscribedMeetings.map((meeting, index) => (
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
          </ThemedView>
        ))}
      </ThemedView>

      <TouchableOpacity 
        style={styles.logoutButton}
        onPress={handleLogout}
      >
        <ThemedText style={styles.logoutButtonText}>
          Sair
        </ThemedText>
      </TouchableOpacity>
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
  },
  meetingInfo: {
    fontSize: 14,
    marginTop: 5,
    color: '#e0e0e0',
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