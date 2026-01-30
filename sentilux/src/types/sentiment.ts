export type SentimentType = 'Positive' | 'Negative' | 'Neutral';
export type ProviderType = 'flash' | 'pro' | 'compare';

export interface SentimentAnalysis {
  provider: string;
  sentiment: SentimentType;
  confidence: number;
  keywords: string[];
  explanation: string;
}

export interface SentimentResult {
  id: string;
  text: string;
  timestamp: string;
  analyses: SentimentAnalysis[];
}

export interface BatchAnalysis {
  id: string;
  name: string;
  results: SentimentResult[];
  date: string;
}

export type ActiveTab = 'dashboard' | 'insights' | 'history';
