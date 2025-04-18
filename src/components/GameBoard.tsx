
import React from 'react';
import GameCell from './GameCell';
import { GameState } from '@/utils/gameLogic';

interface GameBoardProps {
  gameState: GameState;
  onCellClick: (index: number) => void;
}

const GameBoard: React.FC<GameBoardProps> = ({ gameState, onCellClick }) => {
  const { board, status, winningLine } = gameState;
  const disabled = status !== 'playing';

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="grid grid-cols-3 gap-4 p-4 rounded-xl bg-white/10 backdrop-blur-sm animate-fade-in">
        {board.map((cell, index) => (
          <GameCell
            key={index}
            value={cell}
            onClick={() => onCellClick(index)}
            isWinningCell={winningLine ? winningLine.includes(index) : false}
            disabled={disabled}
          />
        ))}
      </div>
    </div>
  );
};

export default GameBoard;
