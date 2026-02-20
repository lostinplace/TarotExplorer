import { TarotCard, CardEdge } from './types';

export function renderDetail(
  card: TarotCard,
  edges: CardEdge[],
  cardMap: Map<string, TarotCard>,
  onNavigate: (cardId: string) => void,
): string {
  const arcanaLabel = card.arcana === 'major'
    ? `Major Arcana · ${card.rank}`
    : `${capitalize(card.suit!)} · ${rankLabel(card.rank)}`;

  const imagePath = `${import.meta.env.BASE_URL}cards/${card.image}`;

  // Find connections involving this card
  const connections = edges.filter(e => e.from === card.id || e.to === card.id);

  const connectionsHtml = connections.map(e => {
    const otherId = e.from === card.id ? e.to : e.from;
    const other = cardMap.get(otherId);
    if (!other) return '';
    return `
      <div class="connection-link cursor-pointer hover:text-amber-300 transition-colors py-1" data-card-id="${otherId}">
        <span class="text-amber-600 mr-1">→</span>
        <span class="font-medium">${other.name}</span>
        <span class="text-gray-500 text-xs ml-1">(${e.description})</span>
      </div>
    `;
  }).join('');

  return `
    <div class="flex flex-col gap-4">
      <div class="text-center">
        <img src="${imagePath}" alt="${card.name}" class="mx-auto rounded-lg shadow-lg max-h-[89em] mb-3" />
        <h2 class="text-2xl font-bold text-amber-200">${card.symbol} ${card.name}</h2>
        <p class="text-gray-400 text-sm">${arcanaLabel}</p>
      </div>

      <div class="bg-amber-900/10 border border-amber-900/20 rounded-lg p-4">
        <h3 class="text-amber-300 font-semibold mb-2">☀️ Upright</h3>
        <div class="flex flex-wrap gap-1 mb-2">
          ${card.upright.keywords.map(k => `<span class="text-xs bg-amber-900/30 text-amber-200 px-2 py-0.5 rounded">${k}</span>`).join('')}
        </div>
        <p class="text-gray-300 text-sm leading-relaxed">${card.upright.meaning}</p>
      </div>

      <div class="bg-purple-900/10 border border-purple-900/20 rounded-lg p-4">
        <h3 class="text-purple-300 font-semibold mb-2">🌙 Reversed</h3>
        <div class="flex flex-wrap gap-1 mb-2">
          ${card.reversed.keywords.map(k => `<span class="text-xs bg-purple-900/30 text-purple-200 px-2 py-0.5 rounded">${k}</span>`).join('')}
        </div>
        <p class="text-gray-300 text-sm leading-relaxed">${card.reversed.meaning}</p>
      </div>

      ${card.personality ? `
        <div class="bg-indigo-900/10 border border-indigo-900/20 rounded-lg p-4 mt-2">
          <h3 class="text-indigo-300 font-semibold mb-3 uppercase tracking-wider text-sm flex items-center gap-2">
            <span class="text-lg">🎭</span> Personality Profile
          </h3>
          <div class="space-y-3 text-sm text-gray-300">
            <p class="italic text-gray-200">${card.personality.summary}</p>
            <div><span class="text-indigo-400 font-semibold">Elemental Dignity:</span> ${card.personality.elemental_dignity}</div>
            <div><span class="text-indigo-400 font-semibold">As a Person:</span> ${card.personality.as_a_person}</div>
            <div><span class="text-indigo-400 font-semibold">As an Energy:</span> ${card.personality.as_an_energy}</div>
            <div class="bg-red-900/20 border-l-2 border-red-900/50 p-2 mt-2">
              <span class="text-red-400 font-semibold">Shadow Expression:</span> ${card.personality.shadow}
            </div>
          </div>
        </div>
      ` : ''}

      ${card.imagery && card.imagery.length > 0 ? `
        <div class="border-t border-gray-700 pt-3 mt-2">
          <h3 class="text-gray-400 font-semibold mb-2 text-sm uppercase tracking-wider">Visual Symbology</h3>
          <ul class="space-y-3">
            ${card.imagery.map(img => `
              <li>
                <div class="text-amber-200 font-medium text-sm">${img.element}</div>
                <div class="text-gray-300 text-sm leading-relaxed">${img.significance}</div>
                <div class="text-gray-500 text-xs italic mt-1">Tradition: ${img.tradition}</div>
              </li>
            `).join('')}
          </ul>
        </div>
      ` : ''}

      ${card.correspondences && Object.values(card.correspondences).some(v => v !== null && (!Array.isArray(v) || v.length > 0)) ? `
        <div class="border-t border-gray-700 pt-3">
          <h3 class="text-gray-400 font-semibold mb-2 text-sm uppercase tracking-wider">Correspondences</h3>
          <div class="grid grid-cols-2 gap-2 text-sm">
            ${card.correspondences.element ? `<div><span class="text-gray-500">Element:</span> <span class="text-gray-300">${card.correspondences.element}</span></div>` : ''}
            ${card.correspondences.planet ? `<div><span class="text-gray-500">Planet:</span> <span class="text-gray-300">${card.correspondences.planet}</span></div>` : ''}
            ${card.correspondences.zodiac ? `<div><span class="text-gray-500">Zodiac:</span> <span class="text-gray-300">${card.correspondences.zodiac}</span></div>` : ''}
            ${card.correspondences.hebrew_letter ? `<div><span class="text-gray-500">Hebrew Letter:</span> <span class="text-gray-300">${card.correspondences.hebrew_letter}</span></div>` : ''}
          </div>
          ${card.correspondences.tree_of_life ? `<div class="text-sm mt-1"><span class="text-gray-500">Tree of Life:</span> <span class="text-gray-300">${card.correspondences.tree_of_life}</span></div>` : ''}
          ${card.correspondences.numerology ? `<div class="text-sm mt-1"><span class="text-gray-500">Numerology:</span> <span class="text-gray-300">${card.correspondences.numerology}</span></div>` : ''}
          ${card.correspondences.colors && card.correspondences.colors.length > 0 ? `<div class="text-sm mt-1"><span class="text-gray-500">Colors:</span> <span class="text-gray-300">${card.correspondences.colors.join(', ')}</span></div>` : ''}
        </div>
      ` : ''}

      ${card.themes && card.themes.length > 0 ? `
        <div class="border-t border-gray-700 pt-3">
          <h3 class="text-gray-400 font-semibold mb-2 text-sm uppercase tracking-wider">Themes</h3>
          <ul class="list-disc list-inside text-sm text-gray-300 space-y-1">
            ${card.themes.map(t => `<li>${t}</li>`).join('')}
          </ul>
        </div>
      ` : ''}

      ${card.questions && card.questions.length > 0 ? `
        <div class="border-t border-gray-700 pt-3">
          <h3 class="text-gray-400 font-semibold mb-2 text-sm uppercase tracking-wider">Questions for Contemplation</h3>
          <ul class="list-disc list-inside text-sm text-gray-300 space-y-1">
            ${card.questions.map(q => `<li>${q}</li>`).join('')}
          </ul>
        </div>
      ` : ''}

      ${card.references && card.references.length > 0 ? `
        <div class="border-t border-gray-700 pt-3">
          <h3 class="text-gray-400 font-semibold mb-2 text-sm uppercase tracking-wider">References</h3>
          <ul class="space-y-3">
            ${card.references.map(ref => `
              <li class="text-sm">
                <div class="text-amber-200 font-medium">${ref.title} <span class="text-gray-400 font-normal">by ${ref.author}</span></div>
                ${ref.section ? `<div class="text-gray-400 text-xs mt-0.5">${ref.section}</div>` : ''}
                <div class="text-gray-300 mt-1 leading-relaxed">${ref.relevance}</div>
              </li>
            `).join('')}
          </ul>
        </div>
      ` : ''}

      ${card.connections && card.connections.length > 0 ? `
        <div class="border-t border-gray-700 pt-3">
          <h3 class="text-gray-400 font-semibold mb-2 text-sm uppercase tracking-wider">Symbolic Connections</h3>
          <ul class="space-y-2">
            ${card.connections.map(conn => `
              <li class="text-sm">
                <div class="flex items-center gap-2">
                  <span class="text-amber-500 font-medium uppercase text-xs tracking-wider">${conn.relationship}</span>
                  <span class="text-gray-300 font-semibold cursor-pointer connection-link hover:text-amber-300 transition-colors" data-card-id="${conn.card}">→ ${cardMap.get(conn.card)?.name || conn.card}</span>
                </div>
                <div class="text-gray-400 mt-0.5 leading-relaxed">${conn.description}</div>
              </li>
            `).join('')}
          </ul>
        </div>
      ` : ''}

      ${connections.length > 0 ? `
        <div class="border-t border-gray-700 pt-3">
          <h3 class="text-gray-400 font-semibold mb-2 text-sm uppercase tracking-wider">Map Connections</h3>
          <div class="text-sm text-gray-300" id="connections-list">
            ${connectionsHtml}
          </div>
        </div>
      ` : ''}
    </div>
  `;
}

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function rankLabel(rank: number): string {
  if (rank === 1) return 'Ace';
  if (rank <= 10) return String(rank);
  if (rank === 11) return 'Page';
  if (rank === 12) return 'Knight';
  if (rank === 13) return 'Queen';
  if (rank === 14) return 'King';
  return String(rank);
}

export function bindConnectionClicks(
  container: HTMLElement,
  onNavigate: (cardId: string) => void,
): void {
  container.querySelectorAll('.connection-link').forEach(el => {
    el.addEventListener('click', () => {
      const id = (el as HTMLElement).dataset.cardId;
      if (id) onNavigate(id);
    });
  });
}
