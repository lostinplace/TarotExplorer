import { useState, useMemo, useCallback } from 'react';
import { tarotCards } from './data/tarotCards';
import { getCardState, reviewCard, isDue, isNew, resetAllProgress } from './utils/fsrs';
import type { Grade } from './utils/fsrs';
import { shuffle } from './utils/helpers';
import { useSettings } from './hooks/useSettings';
import type { TarotCard } from './types';
import ReviewCard from './components/ReviewCard';
import SettingsPanel from './components/SettingsPanel';

interface QueueItem {
  card: TarotCard;
  orientation: 'upright' | 'reversed';
}

function App() {
  const { settings, setSettings } = useSettings();
  const [showSettings, setShowSettings] = useState(false);
  const [sessionReviewed, setSessionReviewed] = useState(0);
  const [queueIndex, setQueueIndex] = useState(0);
  const [queueVersion, setQueueVersion] = useState(0);

  // Filter cards based on settings
  const filteredCards = useMemo(() => {
    return tarotCards.filter(c => {
      if (settings.filterArcana === 'major' && c.arcana !== 'major') return false;
      if (settings.filterArcana === 'minor' && c.arcana !== 'minor') return false;
      if (c.arcana === 'minor' && c.suit && !settings.filterSuits.includes(c.suit)) return false;
      return true;
    });
  }, [settings.filterArcana, settings.filterSuits]);

  // Build queue: due cards first, then new cards (limited)
  const queue = useMemo(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    queueVersion; // dependency trigger
    const orientations: ('upright' | 'reversed')[] =
      settings.orientation === 'both' ? ['upright', 'reversed'] :
      [settings.orientation];

    const items: { item: QueueItem; due: boolean; isNewCard: boolean }[] = [];

    for (const card of filteredCards) {
      for (const o of orientations) {
        const state = getCardState(card.id, settings.trainingMode, o);
        const d = isDue(state);
        const n = isNew(state);
        if (d || n) {
          items.push({ item: { card, orientation: o }, due: d && !n, isNewCard: n });
        }
      }
    }

    const dueItems = shuffle(items.filter(i => i.due)).map(i => i.item);
    const newItems = shuffle(items.filter(i => i.isNewCard)).slice(0, settings.newCardsPerSession).map(i => i.item);

    return [...dueItems, ...newItems];
  }, [filteredCards, settings.orientation, settings.trainingMode, settings.newCardsPerSession, queueVersion]);

  const currentItem = queue[queueIndex];
  const dueCount = queue.length - queueIndex;

  const handleGrade = useCallback((grade: Grade) => {
    if (!currentItem) return;
    reviewCard(currentItem.card.id, settings.trainingMode, currentItem.orientation, grade);
    setSessionReviewed(r => r + 1);
    setQueueIndex(i => i + 1);
  }, [currentItem, settings.trainingMode]);

  const handleReset = useCallback(() => {
    resetAllProgress();
    setQueueIndex(0);
    setSessionReviewed(0);
    setQueueVersion(v => v + 1);
  }, []);

  const handleRefreshQueue = useCallback(() => {
    setQueueIndex(0);
    setQueueVersion(v => v + 1);
  }, []);

  return (
    <div className="min-h-screen bg-zinc-900 text-white">
      {/* Header */}
      <header className="sticky top-0 bg-zinc-900/95 backdrop-blur border-b border-zinc-800 px-4 py-3 z-40">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <h1 className="text-lg font-bold">✨ Tarot Trainer</h1>
          <div className="flex items-center gap-4">
            <div className="text-sm text-zinc-400">
              <span className="text-emerald-400 font-medium">{sessionReviewed}</span> done
              <span className="mx-1">·</span>
              <span className="text-amber-400 font-medium">{dueCount}</span> left
            </div>
            <button onClick={() => setShowSettings(true)}
              className="p-2 rounded-lg hover:bg-zinc-800 transition">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="px-4 py-6">
        {currentItem ? (
          <ReviewCard
            key={`${currentItem.card.id}-${currentItem.orientation}-${queueIndex}`}
            card={currentItem.card}
            orientation={currentItem.orientation}
            mode={settings.trainingMode}
            onGrade={handleGrade}
          />
        ) : (
          <div className="max-w-lg mx-auto text-center py-16">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-2xl font-bold mb-2">All done!</h2>
            <p className="text-zinc-400 mb-6">
              {sessionReviewed > 0
                ? `You reviewed ${sessionReviewed} card${sessionReviewed !== 1 ? 's' : ''} this session.`
                : 'No cards are due right now. Check back later or adjust your settings.'}
            </p>
            <button onClick={handleRefreshQueue}
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 rounded-xl font-medium transition">
              Check for Due Cards
            </button>
          </div>
        )}
      </main>

      {showSettings && (
        <SettingsPanel
          settings={settings}
          setSettings={setSettings}
          onClose={() => { setShowSettings(false); handleRefreshQueue(); }}
          onReset={handleReset}
        />
      )}
    </div>
  );
}

export default App;
