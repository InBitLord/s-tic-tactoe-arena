
export type CellValue = 'X' | 'O' | null;
export type GameMode = 'human' | 'easy' | 'medium' | 'hard';
export type GameStatus = 'playing' | 'won' | 'draw';

export interface GameState {
  board: CellValue[];
  currentPlayer: 'X' | 'O';
  status: GameStatus;
  winningLine: number[] | null;
  mode: GameMode;
}

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

export const initialGameState: GameState = {
  board: Array(9).fill(null),
  currentPlayer: 'X',
  status: 'playing',
  winningLine: null,
  mode: 'human'
};

export const checkWinner = (board: CellValue[]): { winner: CellValue, winningLine: number[] | null } => {
  for (const line of WINNING_COMBINATIONS) {
    const [a, b, c] = line;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a], winningLine: line };
    }
  }
  return { winner: null, winningLine: null };
};

export const isBoardFull = (board: CellValue[]): boolean => {
  return !board.includes(null);
};

export const makeMove = (gameState: GameState, cellIndex: number): GameState => {
  if (
    gameState.board[cellIndex] !== null || 
    gameState.status !== 'playing'
  ) {
    return gameState;
  }

  // Create a copy of the current board
  const newBoard = [...gameState.board];
  newBoard[cellIndex] = gameState.currentPlayer;

  // Check for a winner
  const { winner, winningLine } = checkWinner(newBoard);
  
  let newStatus: GameStatus = gameState.status;
  if (winner) {
    newStatus = 'won';
  } else if (isBoardFull(newBoard)) {
    newStatus = 'draw';
  }

  // Switch to the other player
  const nextPlayer = gameState.currentPlayer === 'X' ? 'O' : 'X';

  return {
    ...gameState,
    board: newBoard,
    currentPlayer: nextPlayer,
    status: newStatus,
    winningLine: winningLine,
  };
};

export const resetGame = (mode: GameMode): GameState => {
  return {
    ...initialGameState,
    mode,
  };
};
