
import React from 'react';
import { GameState } from '@/utils/gameLogic';
import { X, Circle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface GameHeaderProps {
  gameState: GameState;
}

const GameHeader: React.FC<GameHeaderProps> = ({ gameState }) => {
  const { currentPlayer, status, mode } = gameState;

  return (
    <div className="w-full max-w-md mx-auto mb-6 text-center animate-fade-in">
      <h1 className="text-3xl font-bold mb-2 text-white">Tic Tac Toe Arena</h1>
      
      <div className="flex items-center justify-center mb-3">
        <p className="text-white/90 text-sm mr-2">
          {mode === 'human' ? 'Human vs Human' : `Human vs AI (${mode})`}
        </p>
      </div>

      <div className={cn(
        "bg-white/25 rounded-lg p-3 backdrop-blur-sm",
        status === 'playing' && "animate-pulse-slow"
      )}>
        {status === 'playing' && (
          <div className="flex items-center justify-center">
            <span className="mr-2 text-white font-medium">Current Player:</span>
            {currentPlayer === 'X' ? (
              <X className="w-6 h-6 text-indigo-600" strokeWidth={3} />
            ) : (
              <Circle className="w-6 h-6 text-purple-500" strokeWidth={3} />
            )}
          </div>
        )}
        
        {status === 'won' && (
          <div className="flex items-center justify-center font-bold text-white">
            <div className="flex items-center animate-victory">
              <span className="mr-2">Winner:</span>
              {gameState.currentPlayer === 'X' ? (
                <Circle className="w-6 h-6 text-orange-400" strokeWidth={3} />
              ) : (
                <X className="w-6 h-6 text-orange-400" strokeWidth={3} />
              )}
            </div>
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
