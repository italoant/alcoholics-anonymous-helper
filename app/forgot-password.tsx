import { StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { SuccessModal } from '@/components/SuccessModal';

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const validateEmail = (email: string) => {
    // Expressão regular para validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleRecoverPassword = () => {
    if (!email) {
      return;
    }

    if (!validateEmail(email)) {
      return;
    }

    // Aqui você implementaria a lógica de envio de email
    console.log('Email para recuperação:', email);
    setShowSuccessModal(true);
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <Ionicons name="arrow-back" size={24} color="#e0e0e0" />
        <ThemedText style={styles.backButtonText}>Voltar</ThemedText>
      </TouchableOpacity>

      <ThemedView style={styles.content}>
        <ThemedText type="title" style={styles.title}>Recuperar Senha</ThemedText>
        
        <ThemedText style={styles.description}>
          Digite seu email cadastrado para receber as instruções de recuperação de senha.
        </ThemedText>

        <ThemedView style={styles.inputContainer}>
          <ThemedText style={styles.label}>Email</ThemedText>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Digite seu email"
            placeholderTextColor="#666"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </ThemedView>

        <TouchableOpacity 
          style={[
            styles.recoverButton,
            !email || !validateEmail(email) ? styles.disabledButton : null
          ]}
          onPress={handleRecoverPassword}
          disabled={!email || !validateEmail(email)}
        >
          <ThemedText style={styles.recoverButtonText}>
            Enviar Instruções
          </ThemedText>
        </TouchableOpacity>
      </ThemedView>

      <SuccessModal
        visible={showSuccessModal}
        message="Se o email informado estiver cadastrado em nosso sistema, você receberá as instruções para recuperar sua senha. Verifique sua caixa de entrada e spam."
        onClose={() => {
          setShowSuccessModal(false);
          router.back();
        }}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    marginTop: 20,
  },
  backButtonText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#e0e0e0',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    marginBottom: 30,
    textAlign: 'center',
    color: '#e0e0e0',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#e0e0e0',
  },
  input: {
    backgroundColor: '#2d2d2d',
    padding: 15,
    borderRadius: 10,
    color: '#e0e0e0',
    fontSize: 16,
  },
  recoverButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  recoverButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  disabledButton: {
    backgroundColor: '#666',
  },
}); 