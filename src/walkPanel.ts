import { WalkData, WalkStep } from './types';
import { cards } from './data/cards';

export function renderWalkStep(walk: WalkData, stepIndex: number) {
  const contentEl = document.getElementById('walk-content');
  if (!contentEl) return;

  const step = walk.steps[stepIndex];
  if (!step) {
    contentEl.innerHTML = '<p class="text-amber-500">Step not found.</p>';
    return;
  }

  // Find the primary card
  const primaryCard = cards.find(c => c.id === step.card);

  // Check which act we're in
  let currentAct = '';
  if (walk.acts) {
    const act = walk.acts.find(a => a.steps.includes(step.id));
    if (act) {
      currentAct = act.name;
    }
  }

  const titleText = step.title || (primaryCard ? primaryCard.name : 'Unknown Card');

  let html = '';

  html += `<div class="mb-6">
    <h2 class="text-2xl font-serif text-amber-500 mb-1">${walk.name}</h2>
    ${currentAct ? `<h3 class="text-sm font-semibold text-amber-700 tracking-wider uppercase mb-2">${currentAct}</h3>` : ''}
    <p class="text-sm text-gray-400">Step ${stepIndex + 1} of ${walk.steps.length}</p>
  </div>`;

  html += `<h4 class="text-xl font-bold text-white mb-4">${titleText}</h4>`;
  
  html += `<div class="prose prose-invert prose-amber max-w-none text-gray-300 leading-relaxed space-y-4 mb-6">
    ${step.narrative.split('\n\n').map(p => `<p>${p}</p>`).join('')}
  </div>`;

  if (step.transition) {
    html += `<div class="mt-8 pt-4 border-t border-amber-900/30">
        <p class="text-amber-200/80 italic leading-relaxed">${step.transition}</p>
    </div>`;
  }

  if (step.reflection) {
    html += `<div class="mt-6 bg-[#ffd764]/10 border border-[#ffd764]/20 p-4 rounded-lg">
      <h5 class="text-[#ffd764] text-xs uppercase tracking-wider font-semibold mb-2">Reflection</h5>
      <p class="text-gray-300 text-sm italic">${step.reflection}</p>
    </div>`;
  }

  if (step.aside) {
    html += `<div class="mt-6 bg-gray-800/50 p-4 rounded-lg text-sm text-gray-400">
      <h5 class="text-gray-500 text-xs uppercase tracking-wider font-semibold mb-2">Notice</h5>
      <p>${step.aside}</p>
    </div>`;
  }

  contentEl.innerHTML = html;

  // Update button states
  const prevBtn = document.getElementById('walk-prev') as HTMLButtonElement | null;
  const nextBtn = document.getElementById('walk-next') as HTMLButtonElement | null;
  
  if (prevBtn) {
    prevBtn.disabled = stepIndex === 0;
  }
  if (nextBtn) {
    nextBtn.disabled = stepIndex === walk.steps.length - 1;
  }
}
