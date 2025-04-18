
import { CellValue, GameState, checkWinner, isBoardFull, WINNING_COMBINATIONS } from './gameLogic';

// Easy AI - makes random moves
export const makeEasyAIMove = (gameState: GameState): number => {
  const availableMoves = gameState.board
    .map((cell, index) => cell === null ? index : null)
    .filter((index): index is number => index !== null);
  
  // Return a random available cell
  return availableMoves[Math.floor(Math.random() * availableMoves.length)];
};

// Medium AI - blocks immediate wins or takes winning moves, otherwise random
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

// Hard AI - uses minimax algorithm for optimal play
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

// Minimax algorithm implementation
const minimax = (board: CellValue[], depth: number, isMaximizing: boolean, aiPlayer: CellValue): number => {
  const humanPlayer = aiPlayer === 'X' ? 'O' : 'X';
  
  // Check terminal states
  const { winner } = checkWinner(board);
  if (winner === aiPlayer) return 10 - depth;
  if (winner === humanPlayer) return depth - 10;
  if (isBoardFull(board)) return 0;
  
  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < board.length; i++) {
      if (board[i] === null) {
        board[i] = aiPlayer;
        const score = minimax(board, depth + 1, false, aiPlayer);
        board[i] = null;
        bestScore = Math.max(score, bestScore);
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < board.length; i++) {
      if (board[i] === null) {
        board[i] = humanPlayer;
        const score = minimax(board, depth + 1, true, aiPlayer);
        board[i] = null;
        bestScore = Math.min(score, bestScore);
      }
    }
    return bestScore;
  }
};

export const makeAIMove = (gameState: GameState): number => {
  switch (gameState.mode) {
    case 'easy':
      return makeEasyAIMove(gameState);
    case 'medium':
      return makeMediumAIMove(gameState);
    case 'hard':
      return makeHardAIMove(gameState);
    default:
      return -1; // Human mode, shouldn't happen
  }
};
