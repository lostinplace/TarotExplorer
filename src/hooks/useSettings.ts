import { useState, useCallback } from 'react';
import type { Settings } from '../types';

const SETTINGS_KEY = 'sr-tarot-settings';

const defaultSettings: Settings = {
  trainingMode: 'name-to-meaning',
  orientation: 'upright',
  filterArcana: 'all',
  filterSuits: ['wands', 'cups', 'swords', 'pentacles'],
  newCardsPerSession: 10,
};

function loadSettings(): Settings {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    return raw ? { ...defaultSettings, ...JSON.parse(raw) } : defaultSettings;
  } catch {
    return defaultSettings;
  }
}

export function useSettings() {
  const [settings, setSettingsState] = useState<Settings>(loadSettings);

  const setSettings = useCallback((update: Partial<Settings>) => {
    setSettingsState(prev => {
      const next = { ...prev, ...update };
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  return { settings, setSettings };
}
