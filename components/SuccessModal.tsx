import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';

interface SuccessModalProps {
  visible: boolean;
  message: string;
  onClose: () => void;
}

export function SuccessModal({
  visible,
  message,
  onClose,
}: SuccessModalProps) {
  if (!visible) return null;

  return (
    <View style={styles.overlay}>
      <ThemedView style={styles.modal}>
        <ThemedText style={styles.message}>{message}</ThemedText>
        <TouchableOpacity 
          style={styles.button} 
          onPress={onClose}
        >
          <ThemedText style={styles.buttonText}>OK</ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modal: {
    backgroundColor: '#2d2d2d',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    maxWidth: 400,
    alignItems: 'center',
  },
  message: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
    color: '#e0e0e0',
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 