
export interface GameStats {
  gamesPlayed: number;
  wins: {
    X: number;
    O: number;
  };
  draws: number;
  streak: number;
  lastWinner: 'X' | 'O' | null;
}

export interface ScoreData {
  playerStats: GameStats;
  aiStats: {
    easy: GameStats;
    medium: GameStats;
    hard: GameStats;
  };
  lastUpdated: string;
}

const STORAGE_KEY = 'tic-tac-toe-stats';
const AUTHOR = 'sujith';

const initialStats: GameStats = {
  gamesPlayed: 0,
  wins: {
    X: 0,
    O: 0,
  },
  draws: 0,
  streak: 0,
  lastWinner: null,
};

const initialScoreData: ScoreData = {
  playerStats: { ...initialStats },
  aiStats: {
    easy: { ...initialStats },
    medium: { ...initialStats },
    hard: { ...initialStats },
  },
  lastUpdated: new Date().toISOString(),
};

// Load scores from localStorage
export const loadScores = (): ScoreData => {
  try {
    const storedData = localStorage.getItem(STORAGE_KEY);
    if (storedData) {
      return JSON.parse(storedData);
    }
  } catch (error) {
    console.error('Failed to load scores:', error);
  }
  return { ...initialScoreData };
};

// Save scores to localStorage
export const saveScores = (scoreData: ScoreData): void => {
  try {
    const updatedData = {
      ...scoreData,
      lastUpdated: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedData));
  } catch (error) {
    console.error('Failed to save scores:', error);
  }
};

// Update stats after a game
export const updateStats = (
  mode: 'human' | 'easy' | 'medium' | 'hard',
  winner: 'X' | 'O' | null
): ScoreData => {
  const currentStats = loadScores();
  
  // Determine which stats object to update
  let statsToUpdate: GameStats;
  if (mode === 'human') {
    statsToUpdate = currentStats.playerStats;
  } else {
    statsToUpdate = currentStats.aiStats[mode];
  }
  
  // Update the stats
  statsToUpdate.gamesPlayed += 1;
  
  if (winner) {
    statsToUpdate.wins[winner] += 1;
    
    // Update streak
    if (statsToUpdate.lastWinner === winner) {
      statsToUpdate.streak += 1;
    } else {
      statsToUpdate.streak = 1;
    }
    statsToUpdate.lastWinner = winner;
  } else {
    statsToUpdate.draws += 1;
    statsToUpdate.streak = 0;
    statsToUpdate.lastWinner = null;
  }
  
  // Save updated stats
  saveScores(currentStats);
  
  return currentStats;
};

// Reset all stats
export const resetStats = (): void => {
  saveScores({ ...initialScoreData });
};

// Get author information
export const getAuthor = (): string => {
  return AUTHOR;
};
