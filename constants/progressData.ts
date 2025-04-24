import AsyncStorage from '@react-native-async-storage/async-storage';

const PROGRESS_KEY = '@aa_progress';

export interface ProgressData {
  lastUpdate: string;
  daysSober: number;
}

export const saveProgress = async (data: ProgressData) => {
  try {
    await AsyncStorage.setItem(PROGRESS_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Erro ao salvar progresso:', error);
  }
};

export const loadProgress = async (): Promise<ProgressData | null> => {
  try {
    const data = await AsyncStorage.getItem(PROGRESS_KEY);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Erro ao carregar progresso:', error);
    return null;
  }
}; 