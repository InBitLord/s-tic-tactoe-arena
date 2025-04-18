
# Tic Tac Toe Game Project Manual

## Project Structure 🗂️
```
src/
├── components/           # Contains all React components
│   ├── GameBoard.tsx    # Main game board component
│   ├── GameCell.tsx     # Individual cell component
│   ├── GameControls.tsx # Game control buttons
│   ├── GameHeader.tsx   # Game header with status
│   └── GameStats.tsx    # Statistics display component
├── utils/               # Helper functions and game logic
│   ├── aiPlayer.ts     # AI opponent logic
│   ├── gameLogic.ts    # Core game rules and state
│   └── scoreManager.ts  # Score handling and storage
├── App.tsx             # Root component
└── index.css           # Global styles
```

## Detailed File Explanations 📑

### 1. Core Game Files

#### `src/App.tsx`
This is the main application file that brings everything together.
- Sets up routing and the game's foundation
- Handles global state management
- Provides toast notifications for game events
- Sets up the QueryClient for data management

#### `src/index.css`
Global styles for the entire application:
- Defines custom CSS variables for colors
- Contains animation keyframes
- Sets up the game's background gradient
- Defines utility classes

### 2. Component Files

#### `src/components/GameBoard.tsx`
The main game board component:
- Renders a 3x3 grid of cells
- Handles the game board's layout
- Manages cell click interactions
- Highlights winning combinations
```typescript
// Key parts explained:
interface GameBoardProps {
  gameState: GameState;  // Current state of the game
  onCellClick: (index: number) => void;  // Handler for cell clicks
}
```

#### `src/components/GameCell.tsx`
Individual cell component for the game board:
- Renders either X, O, or empty space
- Handles click events
- Shows visual feedback for wins
- Manages disabled state
```typescript
// Props explanation:
interface GameCellProps {
  value: CellValue;  // X, O, or null
  onClick: () => void;  // Click handler
  isWinningCell: boolean;  // For highlighting winning cells
  disabled: boolean;  // Prevents clicking when game is over
}
```

#### `src/components/GameControls.tsx`
Game control interface:
- New game button
- Game mode selector
- Stats display trigger
- Uses Lucide icons for better visuals
```typescript
interface GameControlsProps {
  onReset: () => void;  // Starts new game
  onModeChange: (mode: GameMode) => void;  // Changes AI difficulty
  currentMode: GameMode;  // Current game mode
  onShowStats: () => void;  // Shows statistics
}
```

#### `src/components/GameHeader.tsx`
Header component showing game status:
- Displays current player
- Shows game status (win/draw)
- Uses icons for player indicators
```typescript
interface GameHeaderProps {
  gameState: GameState;  // Current game state
}
```

#### `src/components/GameStats.tsx`
Statistics display component:
- Shows game statistics in a modal
- Displays wins, losses, and draws
- Separates stats by game mode
- Uses shadcn/ui components for styling

### 3. Utility Files

#### `src/utils/gameLogic.ts`
Core game logic:
- Defines game state types
- Handles winning combinations
- Manages game state updates
- Contains game rules
```typescript
// Important types:
type CellValue = 'X' | 'O' | null;
type GameMode = 'human' | 'easy' | 'medium' | 'hard';
type GameStatus = 'playing' | 'won' | 'draw';
```

#### `src/utils/aiPlayer.ts`
AI opponent implementation:
- Contains different difficulty levels
- Implements minimax algorithm for hard mode
- Provides random moves for easy mode
- Uses strategic moves for medium mode

Key Functions Explained:
1. `makeEasyAIMove`: Makes random valid moves
2. `makeMediumAIMove`: Blocks wins and takes obvious moves
3. `makeHardAIMove`: Uses minimax for optimal play
```typescript
// Minimax algorithm simplified explanation:
function minimax(board, depth, isMaximizing) {
  // 1. Check if game is over
  // 2. If maximizing player (AI):
  //    - Try all moves and pick highest score
  // 3. If minimizing player (Human):
  //    - Try all moves and pick lowest score
  // 4. Return best score found
}
```

#### `src/utils/scoreManager.ts`
Score and statistics management:
- Handles local storage of game stats
- Manages different statistics for each mode
- Updates scores after each game
- Provides score reset functionality

## Complex Concepts Explained 🤔

### 1. Minimax Algorithm
The minimax algorithm in `aiPlayer.ts` is used for the "hard" AI mode:
- It's a recursive algorithm that simulates all possible moves
- For each move, it alternates between maximizing (AI) and minimizing (player)
- The depth parameter helps prioritize winning in fewer moves
- Scores: Win = +10, Loss = -10, Draw = 0 (adjusted by depth)

### 2. State Management
Game state is managed through React's useState:
- `gameState` contains current board state, player turn, and game status
- State updates are immutable (creates new state objects)
- UseEffect hooks handle AI moves and game end conditions

### 3. Local Storage
Score management uses browser's localStorage:
- Stores statistics persistently
- Separates stats by game mode
- Updates automatically after each game
- Handles data serialization/deserialization

### 4. Responsive Design
The game uses Tailwind CSS for responsive layout:
- Adapts to different screen sizes
- Uses CSS Grid for game board
- Implements flexible spacing
- Provides consistent look across devices

## How to Play 🎮

1. Choose game mode:
   - Human vs Human
   - AI Easy (random moves)
   - AI Medium (basic strategy)
   - AI Hard (unbeatable)

2. Game rules:
   - X always goes first
   - Players alternate turns
   - Three in a row wins
   - Game ends in draw if board fills up

3. Controls:
   - Click/tap cells to make moves
   - Use "New Game" to restart
   - Check stats to view performance

## Troubleshooting 🔧

Common issues and solutions:
1. AI not responding: Check game mode selection
2. Stats not saving: Clear browser cache
3. Animation issues: Refresh the page
4. Game stuck: Use New Game button

## Author
Created by sujith © 2025

