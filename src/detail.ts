import { TarotCard, CardEdge } from './types';
import { DiscoveryState, isDiscovered } from './discovery';

export function renderDetail(
  card: TarotCard,
  edges: CardEdge[],
  cardMap: Map<string, TarotCard>,
  state: DiscoveryState,
  onNavigate: (cardId: string) => void,
): string {
  const arcanaLabel = card.arcana === 'major'
    ? `Major Arcana · ${card.rank}`
    : `${capitalize(card.suit!)} · ${rankLabel(card.rank)}`;

  const imagePath = `${import.meta.env.BASE_URL}cards/${card.image}`;

  // Find connections where both endpoints are discovered
  const connections = edges.filter(e =>
    (e.from === card.id || e.to === card.id) &&
    isDiscovered(state, e.from) &&
    isDiscovered(state, e.to)
  );

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
        <img src="${imagePath}" alt="${card.name}" class="mx-auto rounded-lg shadow-lg max-h-56 mb-3" />
        <h2 class="text-2xl font-bold text-amber-200">${card.symbol} ${card.name}</h2>
        <p class="text-gray-400 text-sm">${arcanaLabel}</p>
      </div>

      <div class="bg-amber-900/10 border border-amber-900/20 rounded-lg p-4">
        <h3 class="text-amber-300 font-semibold mb-2">☀️ Upright</h3>
        <div class="flex flex-wrap gap-1 mb-2">
          ${card.uprightKeywords.map(k => `<span class="text-xs bg-amber-900/30 text-amber-200 px-2 py-0.5 rounded">${k}</span>`).join('')}
        </div>
        <p class="text-gray-300 text-sm leading-relaxed">${card.uprightDescription}</p>
      </div>

      <div class="bg-purple-900/10 border border-purple-900/20 rounded-lg p-4">
        <h3 class="text-purple-300 font-semibold mb-2">🌙 Reversed</h3>
        <div class="flex flex-wrap gap-1 mb-2">
          ${card.reversedKeywords.map(k => `<span class="text-xs bg-purple-900/30 text-purple-200 px-2 py-0.5 rounded">${k}</span>`).join('')}
        </div>
        <p class="text-gray-300 text-sm leading-relaxed">${card.reversedDescription}</p>
      </div>

      ${connections.length > 0 ? `
        <div class="border-t border-gray-700 pt-3">
          <h3 class="text-gray-400 font-semibold mb-2 text-sm uppercase tracking-wider">Connections</h3>
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
