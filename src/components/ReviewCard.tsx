import { useState } from 'react';
import type { TarotCard, TrainingMode } from '../types';
import type { Grade } from '../utils/fsrs';
import { Rating } from '../utils/fsrs';
import { suitSymbol } from '../utils/helpers';

interface Props {
  card: TarotCard;
  orientation: 'upright' | 'reversed';
  mode: TrainingMode;
  onGrade: (grade: Grade) => void;
}

const gradeButtons: { grade: Grade; label: string; color: string }[] = [
  { grade: Rating.Again, label: 'Again', color: 'bg-red-600 hover:bg-red-500' },
  { grade: Rating.Hard, label: 'Hard', color: 'bg-orange-600 hover:bg-orange-500' },
  { grade: Rating.Good, label: 'Good', color: 'bg-emerald-600 hover:bg-emerald-500' },
  { grade: Rating.Easy, label: 'Easy', color: 'bg-blue-600 hover:bg-blue-500' },
];

export default function ReviewCard({ card, orientation, mode, onGrade }: Props) {
  const [revealed, setRevealed] = useState(false);

  const isUpright = orientation === 'upright';
  const keywords = isUpright ? card.uprightKeywords : card.reversedKeywords;
  const description = isUpright ? card.uprightDescription : card.reversedDescription;

  return (
    <div className="w-full max-w-lg mx-auto">
      {/* Card display */}
      <div className="bg-zinc-800 rounded-2xl p-6 mb-4 min-h-[280px] flex flex-col justify-center">
        {mode === 'name-to-meaning' ? (
          <>
            {/* Show card name, recall meaning */}
            <div className="text-center mb-4">
              <span className="text-4xl mb-2 block">{suitSymbol(card.suit)}</span>
              <h2 className="text-2xl font-bold text-white">{card.name}</h2>
              <span className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-medium ${isUpright ? 'bg-indigo-600/30 text-indigo-300' : 'bg-purple-600/30 text-purple-300'}`}>
                {orientation}
              </span>
            </div>

            {revealed ? (
              <div className="space-y-3 animate-in fade-in">
                <div className="flex flex-wrap gap-2 justify-center">
                  {keywords.map(kw => (
                    <span key={kw} className="px-2 py-1 bg-zinc-700 rounded-lg text-sm text-zinc-200">{kw}</span>
                  ))}
                </div>
                <p className="text-zinc-300 text-sm leading-relaxed text-center">{description}</p>
              </div>
            ) : (
              <button onClick={() => setRevealed(true)}
                className="mt-4 mx-auto block px-6 py-3 bg-zinc-700 hover:bg-zinc-600 rounded-xl text-zinc-300 font-medium transition">
                Reveal Meaning
              </button>
            )}
          </>
        ) : (
          <>
            {/* Show meaning, recall card */}
            <div className="text-center mb-4">
              <span className={`inline-block mb-3 px-3 py-1 rounded-full text-xs font-medium ${isUpright ? 'bg-indigo-600/30 text-indigo-300' : 'bg-purple-600/30 text-purple-300'}`}>
                {orientation}
              </span>
              <div className="flex flex-wrap gap-2 justify-center mb-3">
                {keywords.map(kw => (
                  <span key={kw} className="px-2 py-1 bg-zinc-700 rounded-lg text-sm text-zinc-200">{kw}</span>
                ))}
              </div>
              <p className="text-zinc-300 text-sm leading-relaxed">{description}</p>
            </div>

            {revealed ? (
              <div className="text-center animate-in fade-in">
                <span className="text-4xl mb-2 block">{suitSymbol(card.suit)}</span>
                <h2 className="text-2xl font-bold text-white">{card.name}</h2>
              </div>
            ) : (
              <button onClick={() => setRevealed(true)}
                className="mt-4 mx-auto block px-6 py-3 bg-zinc-700 hover:bg-zinc-600 rounded-xl text-zinc-300 font-medium transition">
                Reveal Card
              </button>
            )}
          </>
        )}
      </div>

      {/* Grade buttons */}
      {revealed && (
        <div className="grid grid-cols-4 gap-2">
          {gradeButtons.map(({ grade, label, color }) => (
            <button key={label} onClick={() => onGrade(grade)}
              className={`py-3 rounded-xl text-white font-medium text-sm transition ${color}`}>
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
