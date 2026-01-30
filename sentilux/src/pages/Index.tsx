import { useState, useEffect, useRef } from 'react';
import { Sidebar } from '@/components/sentilux/Sidebar';
import { Header } from '@/components/sentilux/Header';
import { WelcomeGuide } from '@/components/sentilux/WelcomeGuide';
import { TextAnalysisCard } from '@/components/sentilux/TextAnalysisCard';
import { FileUploadCard } from '@/components/sentilux/FileUploadCard';
import { ResultsDisplay } from '@/components/sentilux/ResultsDisplay';
import { SentimentPieChart } from '@/components/sentilux/SentimentPieChart';
import { EmptyState } from '@/components/sentilux/EmptyState';
import { KpiCards } from '@/components/sentilux/KpiCards';
import { AnalyticsCharts } from '@/components/sentilux/AnalyticsCharts';
import { HistoryView } from '@/components/sentilux/HistoryView';
import { ReframeModal } from '@/components/sentilux/ReframeModal';
import { ErrorToast } from '@/components/sentilux/ErrorToast';
import { Watermark } from '@/components/sentilux/Watermark';
import { useSentiment } from '@/hooks/useSentiment';
import { ActiveTab, ProviderType } from '@/types/sentiment';

// Custom debounce hook
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
}

const Index = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [inputText, setInputText] = useState('');
  const [selectedProvider, setSelectedProvider] = useState<ProviderType>('compare');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showGuide, setShowGuide] = useState(true);
  
  const [improvingText, setImprovingText] = useState<{ id: string; text: string } | null>(null);
  const [isImproving, setIsImproving] = useState(false);
  const [suggestion, setSuggestion] = useState<{
    improvedText: string;
    wordChanges: { original: string; suggested: string }[];
    reasoning: string;
  } | null>(null);

  const debouncedInput = useDebounce(inputText, 1500);
  const lastAnalyzedText = useRef('');

  const {
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
  } = useSentiment();

  // Auto-analysis on debounced input
  useEffect(() => {
    if (debouncedInput.trim().length > 20 && debouncedInput !== lastAnalyzedText.current) {
      lastAnalyzedText.current = debouncedInput;
      handleAnalysis([debouncedInput]);
    }
  }, [debouncedInput]);

  const handleAnalysis = async (texts: string[]) => {
    await analyzeSentiment(texts, selectedProvider);
    setShowGuide(false);
  };

  const manualAnalyze = () => {
    if (!inputText.trim()) return;
    lastAnalyzedText.current = inputText;
    handleAnalysis([inputText]);
  };

  const handleImproveRequest = async (id: string, text: string) => {
    setImprovingText({ id, text });
    setIsImproving(true);
    setSuggestion(null);
    
    // Simulate AI improvement
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setSuggestion({
      improvedText: text
        .replace(/hate/gi, 'would prefer different')
        .replace(/terrible/gi, 'needs improvement')
        .replace(/awful/gi, 'challenging')
        .replace(/disappointing/gi, 'not as expected')
        .replace(/frustrating/gi, 'requires patience'),
      wordChanges: [
        { original: 'hate', suggested: 'would prefer different' },
        { original: 'terrible', suggested: 'needs improvement' }
      ],
      reasoning: "Replaced emotionally charged words with more constructive alternatives that maintain the core message while fostering productive dialogue."
    });
    setIsImproving(false);
  };

  const onFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      let lines: string[] = [];
      if (file.name.endsWith('.csv')) {
        lines = content.split('\n')
          .map(l => l.split(',')[0].replace(/^"|"$/g, '').trim())
          .filter(l => l.length > 5);
      } else {
        lines = content.split('\n').map(l => l.trim()).filter(l => l.length > 5);
      }
      if (lines.length > 0) handleAnalysis(lines.slice(0, 10));
    };
    reader.readAsText(file);
  };

  const insertExample = () => {
    const examples = [
      "The product quality is absolutely disappointing, and the delivery was late twice.",
      "I am incredibly happy with the new update! Everything works smoothly and fast.",
      "The service was okay, nothing special but it got the job done eventually.",
      "I really hate the new interface, it's confusing and cluttered."
    ];
    const random = examples[Math.floor(Math.random() * examples.length)];
    setInputText(random);
  };

  return (
    <div 
      className={`h-screen w-screen flex flex-col md:flex-row transition-all duration-1000 overflow-hidden relative font-sans ${moodBackground}`}
    >
      {/* Background Blobs */}
      <div className="absolute inset-0 opacity-40 pointer-events-none overflow-hidden">
        <div className="absolute top-[-15%] left-[-15%] w-[80%] h-[80%] bg-sentilux-pink-50 blur-[140px] rounded-full"></div>
        <div className="absolute bottom-[-15%] right-[-15%] w-[70%] h-[70%] bg-sentilux-indigo-50 blur-[130px] rounded-full"></div>
      </div>

      <Sidebar 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        showGuide={showGuide}
        setShowGuide={setShowGuide}
      />

      {/* Main Workspace */}
      <main className="flex-1 overflow-y-auto h-full p-4 md:p-8 custom-scrollbar relative z-10 w-full">
        <Header 
          selectedProvider={selectedProvider}
          setSelectedProvider={setSelectedProvider}
          isLoading={isLoading}
          setShowGuide={setShowGuide}
        />

        {activeTab === 'dashboard' && (
          <div className="space-y-8 slide-in-from-bottom-6 max-w-7xl mx-auto">
            {showGuide && <WelcomeGuide onClose={() => setShowGuide(false)} />}

            <div className="grid grid-cols-1 xl:grid-cols-5 gap-8">
              <TextAnalysisCard 
                inputText={inputText}
                setInputText={setInputText}
                onAnalyze={manualAnalyze}
                onInsertExample={insertExample}
                isLoading={isLoading}
              />
              <FileUploadCard onFileUpload={onFileUpload} />
            </div>

            {results.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 slide-in-from-bottom-6">
                <ResultsDisplay 
                  results={results} 
                  onImproveRequest={handleImproveRequest} 
                />
                <SentimentPieChart stats={stats} />
              </div>
            ) : (
              <EmptyState />
            )}
          </div>
        )}

        {activeTab === 'insights' && (
          <div className="space-y-10 slide-in-from-right-12 pb-16 max-w-7xl mx-auto">
            <KpiCards 
              radialValue={radialData[0]?.value || 0} 
              historyLength={history.length} 
            />
            <AnalyticsCharts 
              timeSeriesData={timeSeriesData}
              radarData={radarData}
              keywordBubbleData={keywordBubbleData}
              radialData={radialData}
            />
          </div>
        )}

        {activeTab === 'history' && (
          <HistoryView 
            history={history}
            onClearHistory={clearHistory}
            onNavigateToDashboard={() => setActiveTab('dashboard')}
          />
        )}

        {/* Reframe Modal */}
        {improvingText && (
          <ReframeModal 
            text={improvingText.text}
            isImproving={isImproving}
            suggestion={suggestion}
            onClose={() => setImprovingText(null)}
          />
        )}

        {/* Error Toast */}
        {error && <ErrorToast message={error} onClose={clearError} />}
      </main>

      <Watermark />
    </div>
  );
};

export default Index;
