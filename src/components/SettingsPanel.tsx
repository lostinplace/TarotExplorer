import type { Settings, Suit, Orientation, TrainingMode } from '../types';

interface Props {
  settings: Settings;
  setSettings: (update: Partial<Settings>) => void;
  onClose: () => void;
  onReset: () => void;
}

const suits: Suit[] = ['wands', 'cups', 'swords', 'pentacles'];
const suitEmoji: Record<Suit, string> = { wands: '🪄', cups: '🏆', swords: '⚔️', pentacles: '⭐' };

export default function SettingsPanel({ settings, setSettings, onClose, onReset }: Props) {
  const toggleSuit = (s: Suit) => {
    const current = settings.filterSuits;
    const next = current.includes(s) ? current.filter(x => x !== s) : [...current, s];
    if (next.length > 0) setSettings({ filterSuits: next });
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-zinc-800 rounded-2xl p-6 w-full max-w-md space-y-5 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-white">Settings</h2>
          <button onClick={onClose} className="text-zinc-400 hover:text-white text-2xl">&times;</button>
        </div>

        {/* Training Mode */}
        <div>
          <label className="text-sm text-zinc-400 block mb-2">Training Mode</label>
          <div className="flex gap-2">
            {(['name-to-meaning', 'meaning-to-card'] as TrainingMode[]).map(m => (
              <button key={m} onClick={() => setSettings({ trainingMode: m })}
                className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition ${settings.trainingMode === m ? 'bg-indigo-600 text-white' : 'bg-zinc-700 text-zinc-300 hover:bg-zinc-600'}`}>
                {m === 'name-to-meaning' ? 'Name → Meaning' : 'Meaning → Card'}
              </button>
            ))}
          </div>
        </div>

        {/* Orientation */}
        <div>
          <label className="text-sm text-zinc-400 block mb-2">Orientation</label>
          <div className="flex gap-2">
            {(['upright', 'reversed', 'both'] as Orientation[]).map(o => (
              <button key={o} onClick={() => setSettings({ orientation: o })}
                className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium capitalize transition ${settings.orientation === o ? 'bg-indigo-600 text-white' : 'bg-zinc-700 text-zinc-300 hover:bg-zinc-600'}`}>
                {o}
              </button>
            ))}
          </div>
        </div>

        {/* Filter Arcana */}
        <div>
          <label className="text-sm text-zinc-400 block mb-2">Filter by Arcana</label>
          <div className="flex gap-2">
            {(['all', 'major', 'minor'] as const).map(a => (
              <button key={a} onClick={() => setSettings({ filterArcana: a })}
                className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium capitalize transition ${settings.filterArcana === a ? 'bg-indigo-600 text-white' : 'bg-zinc-700 text-zinc-300 hover:bg-zinc-600'}`}>
                {a}
              </button>
            ))}
          </div>
        </div>

        {/* Filter Suits */}
        {(settings.filterArcana === 'all' || settings.filterArcana === 'minor') && (
          <div>
            <label className="text-sm text-zinc-400 block mb-2">Suits</label>
            <div className="flex gap-2">
              {suits.map(s => (
                <button key={s} onClick={() => toggleSuit(s)}
                  className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition ${settings.filterSuits.includes(s) ? 'bg-indigo-600 text-white' : 'bg-zinc-700 text-zinc-300 hover:bg-zinc-600'}`}>
                  {suitEmoji[s]} {s.charAt(0).toUpperCase() + s.slice(1)}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* New cards per session */}
        <div>
          <label className="text-sm text-zinc-400 block mb-2">New Cards Per Session: {settings.newCardsPerSession}</label>
          <input type="range" min={1} max={30} value={settings.newCardsPerSession}
            onChange={e => setSettings({ newCardsPerSession: Number(e.target.value) })}
            className="w-full accent-indigo-500" />
        </div>

        {/* Reset */}
        <button onClick={() => { if (confirm('Reset all progress? This cannot be undone.')) { onReset(); onClose(); } }}
          className="w-full py-2 px-4 rounded-lg bg-red-600/20 text-red-400 hover:bg-red-600/30 text-sm font-medium transition">
          Reset All Progress
        </button>
      </div>
    </div>
  );
}
