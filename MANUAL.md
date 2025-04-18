# Tic Tac Toe Game Project Manual

## Project Structure 🗂️
```
src/
├── components/           # All React components live here
│   ├── GameBoard.tsx    # Main game grid
│   ├── GameCell.tsx     # Individual square
│   ├── GameControls.tsx # Game buttons
│   ├── GameHeader.tsx   # Status display
│   └── GameStats.tsx    # Score display
├── utils/               # Helper functions
│   ├── aiPlayer.ts      # Computer opponent
│   ├── gameLogic.ts     # Game rules
│   └── scoreManager.ts  # Score tracking
├── App.tsx             # Main app file
└── index.css           # Styling
```

## Line-by-Line File Explanations 📝

### 1. `src/App.tsx`
This is like the main entrance of our app:
```typescript
// Imports needed tools for notifications and routing
import { Toaster } from "@/components/ui/toaster";
import { QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Sets up data management
const queryClient = new QueryClient();

// Main app structure that wraps everything
const App = () => (
  <QueryClientProvider client={queryClient}>
    <Toaster />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </QueryClientProvider>
);
```

### 2. `src/components/GameBoard.tsx`
The game grid component:
```typescript
// Defines what info GameBoard needs
interface GameBoardProps {
  gameState: GameState;  // Current game situation
  onCellClick: (index: number) => void;  // What happens when clicked
}

// The actual game board layout:
return (
  <div className="grid grid-cols-3 gap-4">
    {board.map((cell, index) => (
      // Creates 9 cells in a 3x3 grid
      <GameCell
        key={index}
        value={cell}  // X, O, or empty
        onClick={() => onCellClick(index)}
        isWinningCell={winningLine?.includes(index)}
        disabled={status !== 'playing'}
      />
    ))}
  </div>
);
```

### 3. `src/components/GameCell.tsx`
Each clickable square:
```typescript
// What each cell needs to work
interface GameCellProps {
  value: CellValue;  // X, O, or empty
  onClick: () => void;  // Click handler
  isWinningCell: boolean;  // For highlighting winners
  disabled: boolean;  // Prevents invalid clicks
}

// The button that shows X, O, or nothing
return (
  <button
    onClick={onClick}
    disabled={disabled}
    className="bg-white/90 rounded-lg"
  >
    {value === 'X' ? <X /> : value === 'O' ? <Circle /> : null}
  </button>
);
```

### 4. `src/components/GameHeader.tsx`
Shows game status:
```typescript
// Header needs to know game state
interface GameHeaderProps {
  gameState: GameState;
}

// Shows whose turn it is or who won
return (
  <div className="text-center">
    <h1>Tic Tac Toe Game</h1>
    {status === 'playing' ? (
      <div>Current Player: {currentPlayer}</div>
    ) : status === 'won' ? (
      <div>Winner: {gameState.currentPlayer === 'X' ? 'O' : 'X'}</div>
    ) : (
      <div>Game Draw!</div>
    )}
  </div>
);
```

### 5. `src/utils/gameLogic.ts`
The rules of the game:
```typescript
// Defines what values can be in each cell
type CellValue = 'X' | 'O' | null;

// All possible winning lines (rows, columns, diagonals)
export const WINNING_COMBINATIONS = [
  [0, 1, 2], // Top row
  [3, 4, 5], // Middle row
  [6, 7, 8], // Bottom row
  [0, 3, 6], // Left column
  [1, 4, 7], // Middle column
  [2, 5, 8], // Right column
  [0, 4, 8], // Diagonal top-left to bottom-right
  [2, 4, 6]  // Diagonal top-right to bottom-left
];

// Checks if someone won
export const checkWinner = (board: CellValue[]): { winner: CellValue, winningLine: number[] | null } => {
  for (const line of WINNING_COMBINATIONS) {
    const [a, b, c] = line;
    // If three cells match and aren't empty, we have a winner
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a], winningLine: line };
    }
  }
  return { winner: null, winningLine: null };
};
```

### 6. `src/utils/aiPlayer.ts`
Computer opponent logic:
```typescript
// Easy mode: just picks random empty spots
export const makeEasyAIMove = (gameState: GameState): number => {
  const availableMoves = gameState.board
    .map((cell, index) => cell === null ? index : null)
    .filter((index): index is number => index !== null);
  
  // Return a random available cell
  return availableMoves[Math.floor(Math.random() * availableMoves.length)];
};

// Medium mode: tries to win or block wins
export const makeMediumAIMove = (gameState: GameState): number => {
  const board = gameState.board;
  const aiPlayer = gameState.currentPlayer;
  const humanPlayer = aiPlayer === 'X' ? 'O' : 'X';
  
  // Check if AI can win in one move
  for (let i = 0; i < board.length; i++) {
    if (board[i] === null) {
      const boardCopy = [...board];
      boardCopy[i] = aiPlayer;
      const { winner } = checkWinner(boardCopy);
      
      if (winner === aiPlayer) {
        return i; // Winning move
      }
    }
  }
  
  // Block human player if they can win in one move
  for (let i = 0; i < board.length; i++) {
    if (board[i] === null) {
      const boardCopy = [...board];
      boardCopy[i] = humanPlayer;
      const { winner } = checkWinner(boardCopy);
      
      if (winner === humanPlayer) {
        return i; // Blocking move
      }
    }
  }
  
  // Try to take the center
  if (board[4] === null) {
    return 4;
  }
  
  // Take a random move
  return makeEasyAIMove(gameState);
};

// Hard mode: uses minimax algorithm
export const makeHardAIMove = (gameState: GameState): number => {
  const board = [...gameState.board];
  const aiPlayer = gameState.currentPlayer;
  
  let bestScore = -Infinity;
  let bestMove = -1;
  
  // Try each available move and choose the best one
  for (let i = 0; i < board.length; i++) {
    if (board[i] === null) {
      board[i] = aiPlayer;
      const score = minimax(board, 0, false, aiPlayer);
      board[i] = null;
      
      if (score > bestScore) {
        bestScore = score;
        bestMove = i;
      }
    }
  }
  
  return bestMove;
};
```

### 7. `src/utils/scoreManager.ts`
Keeps track of wins and losses:
```typescript
// What stats we track
interface GameStats {
  gamesPlayed: number;
  wins: { X: number, O: number };
  draws: number;
  streak: number;
  lastWinner: 'X' | 'O' | null;
}

// Saves scores to browser storage
export const saveScores = (data: ScoreData): void => {
  localStorage.setItem('tic-tac-toe-stats', JSON.stringify(data));
};

// Updates stats after each game
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
```

### 8. `src/index.css`
Styles the game:
```css
/* Basic colors and background */
:root {
  --background: #ffffff;
  --primary: #9b87f5;
  --secondary: #7E69AB;
}

/* Animations for when pieces appear */
@keyframes pop-in {
  from { transform: scale(0); }
  to { transform: scale(1); }
}

/* Makes background look nice */
.game-background {
  background: linear-gradient(135deg, #D6BCFA 0%, #9b87f5 100%);
}
```

## Complex Parts Explained 🤔

### 1. Minimax Algorithm
The hard AI uses this to look ahead at all possible moves:
```typescript
function minimax(board, depth, isMaximizing) {
  // 1. First checks if game is over
  // 2. If AI's turn (maximizing):
  //    - Tries each possible move
  //    - Picks move with highest score
  // 3. If player's turn (minimizing):
  //    - Tries each possible move
  //    - Picks move with lowest score
  // 4. Returns best score found
}
```

### 2. React State Management
The game uses React's useState to track:
- Current board state (X's and O's)
- Whose turn it is
- If someone won
- Game mode (vs human or AI difficulty)

### 3. Local Storage
Saves game stats to your browser:
- Uses localStorage.setItem to save
- Uses localStorage.getItem to load
- Keeps track of different stats for each game mode

## Troubleshooting 🔧

Common issues and solutions:
1. AI not responding: Check game mode selection
2. Stats not saving: Clear browser cache
3. Game stuck: Use New Game button

## Author
Created by sujith © 2025
