
import React from 'react';
import { GameState } from '@/utils/gameLogic';
import { X, Circle } from 'lucide-react';

interface GameHeaderProps {
  gameState: GameState;
}

const GameHeader: React.FC<GameHeaderProps> = ({ gameState }) => {
  const { currentPlayer, status, mode } = gameState;

  return (
    <div className="w-full max-w-md mx-auto mb-8 text-center">
      <h1 className="text-4xl font-bold mb-4 text-white">
        Tic Tac Toe Game
      </h1>
      
      <div className="bg-white/20 rounded-xl p-4">
        {status === 'playing' && (
          <div className="flex items-center justify-center space-x-3">
            <span className="text-white">Current Player:</span>
            {currentPlayer === 'X' ? (
              <X className="w-8 h-8 text-indigo-400" />
            ) : (
              <Circle className="w-8 h-8 text-purple-400" />
            )}
          </div>
        )}
        
        {status === 'won' && (
          <div className="font-bold text-white">
            Winner: {gameState.currentPlayer === 'X' ? 'O' : 'X'}
          </div>
        )}
        
        {status === 'draw' && (
          <div className="font-bold text-white">
            Game Draw!
          </div>
        )}
      </div>
    </div>
  );
};

export default GameHeader;
