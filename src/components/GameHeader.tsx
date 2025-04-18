
import React from 'react';
import { GameState } from '@/utils/gameLogic';
import { X, Circle, Trophy } from 'lucide-react';
import { cn } from '@/lib/utils';

interface GameHeaderProps {
  gameState: GameState;
}

const GameHeader: React.FC<GameHeaderProps> = ({ gameState }) => {
  const { currentPlayer, status, mode } = gameState;

  return (
    <div className="w-full max-w-md mx-auto mb-8 text-center animate-fade-in">
      <h1 className="text-4xl font-bold mb-4 text-white text-gradient">
        Tic Tac Toe Arena
      </h1>
      
      <div className="flex items-center justify-center mb-4">
        <p className="text-white/90 text-sm px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm">
          {mode === 'human' ? 'Human vs Human' : `Human vs AI (${mode})`}
        </p>
      </div>

      <div className={cn(
        "bg-white/20 rounded-xl p-4 backdrop-blur-md shadow-lg",
        status === 'playing' && "animate-pulse-slow"
      )}>
        {status === 'playing' && (
          <div className="flex items-center justify-center space-x-3">
            <span className="text-white font-medium">Current Player:</span>
            {currentPlayer === 'X' ? (
              <X className="w-8 h-8 text-indigo-400" strokeWidth={3} />
            ) : (
              <Circle className="w-8 h-8 text-purple-400" strokeWidth={3} />
            )}
          </div>
        )}
        
        {status === 'won' && (
          <div className="flex items-center justify-center font-bold text-white">
            <div className="flex items-center space-x-2 animate-victory">
              <Trophy className="w-6 h-6 text-yellow-400" />
              <span>Winner:</span>
              {gameState.currentPlayer === 'X' ? (
                <Circle className="w-8 h-8 text-orange-400" strokeWidth={3} />
              ) : (
                <X className="w-8 h-8 text-orange-400" strokeWidth={3} />
              )}
            </div>
          </div>
        )}
        
        {status === 'draw' && (
          <div className="font-bold text-white flex items-center justify-center space-x-2">
            <span>Game Draw!</span>
            <span className="text-2xl">🤝</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default GameHeader;
