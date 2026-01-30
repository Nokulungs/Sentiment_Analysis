import { useState, useMemo } from 'react';
import { SentimentResult, SentimentType, ProviderType } from '@/types/sentiment';

// Mock sentiment analysis for demo purposes
const mockAnalysis = (text: string, provider: ProviderType): SentimentResult => {
  const sentiments: SentimentType[] = ['Positive', 'Negative', 'Neutral'];
  const keywords = [
    ['excellent', 'amazing', 'love', 'great', 'wonderful'],
    ['terrible', 'hate', 'awful', 'disappointing', 'frustrating'],
    ['okay', 'average', 'fine', 'decent', 'normal']
  ];
  
  // Simple sentiment detection based on keywords
  const lowerText = text.toLowerCase();
  let sentiment: SentimentType = 'Neutral';
  let keywordsFound: string[] = [];
  
  if (lowerText.includes('happy') || lowerText.includes('great') || lowerText.includes('love') || 
      lowerText.includes('amazing') || lowerText.includes('excellent') || lowerText.includes('wonderful')) {
    sentiment = 'Positive';
    keywordsFound = keywords[0].slice(0, 3);
  } else if (lowerText.includes('hate') || lowerText.includes('terrible') || lowerText.includes('awful') ||
             lowerText.includes('disappointing') || lowerText.includes('frustrating') || lowerText.includes('bad')) {
    sentiment = 'Negative';
    keywordsFound = keywords[1].slice(0, 3);
  } else {
    keywordsFound = keywords[2].slice(0, 3);
  }
  
  const confidence = 0.7 + Math.random() * 0.25;
  
  const explanations: Record<SentimentType, string> = {
    Positive: "The text contains positive emotional markers and optimistic language patterns.",
    Negative: "The analysis detected negative sentiment indicators and critical language.",
    Neutral: "The text maintains a balanced tone without strong emotional indicators."
  };
  
  const analyses = provider === 'compare' 
    ? [
        { provider: 'Standard', sentiment, confidence, keywords: keywordsFound, explanation: explanations[sentiment] },
        { provider: 'Expert', sentiment, confidence: confidence * 0.95, keywords: keywordsFound.slice(0, 2), explanation: explanations[sentiment] }
      ]
    : [{ provider: provider.toUpperCase(), sentiment, confidence, keywords: keywordsFound, explanation: explanations[sentiment] }];
  
  return {
    id: crypto.randomUUID(),
    text,
    timestamp: new Date().toISOString(),
    analyses
  };
};

export const useSentiment = () => {
  const [results, setResults] = useState<SentimentResult[]>([]);
  const [history, setHistory] = useState<SentimentResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const analyzeSentiment = async (texts: string[], provider: ProviderType) => {
    if (texts.length === 0 || texts.every(t => !t.trim())) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const newResults = texts.map(text => mockAnalysis(text, provider));
      setResults(newResults);
      setHistory(prev => [...newResults, ...prev]);
    } catch (err) {
      setError("Analysis failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  
  const clearHistory = () => setHistory([]);
  const clearError = () => setError(null);
  
  const stats = useMemo(() => {
    const data = results.length > 0 ? results : history;
    const totals: Record<SentimentType, number> = { Positive: 0, Negative: 0, Neutral: 0 };
    data.forEach(r => r.analyses.forEach(a => totals[a.sentiment]++));
    return [
      { name: 'Positive', value: totals.Positive, color: '#a7f3d0' },
      { name: 'Neutral', value: totals.Neutral, color: '#c7d2fe' },
      { name: 'Negative', value: totals.Negative, color: '#fecaca' }
    ];
  }, [results, history]);
  
  const moodBackground = useMemo(() => {
    const data = results.length > 0 ? results : history.slice(0, 1);
    if (data.length === 0) return 'mood-default';
    const primarySentiment = data[0]?.analyses[0]?.sentiment || 'Neutral';
    switch(primarySentiment) {
      case 'Positive': return 'mood-positive';
      case 'Negative': return 'mood-negative';
      case 'Neutral': return 'mood-neutral';
      default: return 'mood-default';
    }
  }, [results, history]);
  
  const timeSeriesData = useMemo(() => {
    return [...history].reverse().slice(-15).map((h, i) => {
      const avgConf = h.analyses.reduce((acc, curr) => acc + curr.confidence, 0) / h.analyses.length;
      return {
        name: `T-${15-i}`,
        confidence: Math.round(avgConf * 100),
        pos: h.analyses.filter(a => a.sentiment === 'Positive').length,
        neg: h.analyses.filter(a => a.sentiment === 'Negative').length,
        neu: h.analyses.filter(a => a.sentiment === 'Neutral').length,
      };
    });
  }, [history]);
  
  const radarData = useMemo(() => {
    const sentiments: SentimentType[] = ['Positive', 'Neutral', 'Negative'];
    return sentiments.map(s => {
      const standardCount = history.filter(h => h.analyses.some(a => a.provider === 'Standard' && a.sentiment === s)).length;
      const expertCount = history.filter(h => h.analyses.some(a => a.provider === 'Expert' && a.sentiment === s)).length;
      return {
        subject: s,
        Standard: standardCount,
        Expert: expertCount,
        fullMark: Math.max(standardCount, expertCount, 10)
      };
    });
  }, [history]);
  
  const keywordBubbleData = useMemo(() => {
    const counts: Record<string, { count: number; conf: number }> = {};
    history.forEach(r => r.analyses.forEach(a => {
      a.keywords.forEach(kw => {
        if (!counts[kw]) counts[kw] = { count: 0, conf: 0 };
        counts[kw].count++;
        counts[kw].conf += a.confidence;
      });
    }));
    return Object.entries(counts).map(([name, val]) => ({
      name,
      x: val.count,
      y: Math.round((val.conf / val.count) * 100),
      z: val.count * 10
    })).sort((a,b) => b.x - a.x).slice(0, 10);
  }, [history]);
  
  const radialData = useMemo(() => {
    const data = results.length > 0 ? results : history;
    const posCount = data.filter(r => r.analyses[0]?.sentiment === 'Positive').length;
    const total = data.length || 1;
    return [
      { name: 'Success Rate', value: Math.round((posCount / total) * 100), fill: '#a7f3d0' }
    ];
  }, [results, history]);
  
  return {
    results,
    history,
    isLoading,
    error,
    analyzeSentiment,
    clearHistory,
    clearError,
    stats,
    moodBackground,
    timeSeriesData,
    radarData,
    keywordBubbleData,
    radialData
  };
};
