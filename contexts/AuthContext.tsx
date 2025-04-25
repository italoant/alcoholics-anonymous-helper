import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Meeting {
  title: string;
  date: string;
  time: string;
  location: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  error: string | null;
  subscribedMeetings: Meeting[];
  subscribeToMeeting: (meeting: Meeting) => Promise<void>;
  unsubscribeFromMeeting: (meeting: Meeting) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('authToken');
      return !!token;
    }
    return false;
  });
  const [error, setError] = useState<string | null>(null);
  const [subscribedMeetings, setSubscribedMeetings] = useState<Meeting[]>([]);

  useEffect(() => {
    loadSubscribedMeetings();
  }, []);

  const loadSubscribedMeetings = async () => {
    try {
      const meetings = await AsyncStorage.getItem('subscribedMeetings');
      if (meetings) {
        setSubscribedMeetings(JSON.parse(meetings));
      }
    } catch (err) {
      console.error('Erro ao carregar reuniões inscritas:', err);
    }
  };

  const saveSubscribedMeetings = async (meetings: Meeting[]) => {
    try {
      await AsyncStorage.setItem('subscribedMeetings', JSON.stringify(meetings));
    } catch (err) {
      console.error('Erro ao salvar reuniões inscritas:', err);
    }
  };

  const subscribeToMeeting = async (meeting: Meeting) => {
    try {
      const isAlreadySubscribed = subscribedMeetings.some(
        m => m.title === meeting.title && m.date === meeting.date
      );

      if (!isAlreadySubscribed) {
        const newMeetings = [...subscribedMeetings, meeting];
        setSubscribedMeetings(newMeetings);
        await saveSubscribedMeetings(newMeetings);
      }
    } catch (err) {
      console.error('Erro ao inscrever na reunião:', err);
    }
  };

  const unsubscribeFromMeeting = async (meeting: Meeting) => {
    try {
      const newMeetings = subscribedMeetings.filter(
        m => !(m.title === meeting.title && m.date === meeting.date)
      );
      setSubscribedMeetings(newMeetings);
      await saveSubscribedMeetings(newMeetings);
    } catch (err) {
      console.error('Erro ao cancelar inscrição na reunião:', err);
    }
  };

  const login = async (username: string, password: string) => {
    try {
      setError(null);
      if (username === 'user' && password === '123') {
        const mockToken = 'mock-token';
        localStorage.setItem('authToken', mockToken);
        setIsAuthenticated(true);
        return true;
      }
      setError('Credenciais inválidas');
      return false;
    } catch (err) {
      setError('Erro ao fazer login. Tente novamente.');
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      login, 
      logout, 
      error,
      subscribedMeetings,
      subscribeToMeeting,
      unsubscribeFromMeeting
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 