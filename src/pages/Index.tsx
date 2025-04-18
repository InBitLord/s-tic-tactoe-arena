
import React, { useState, useEffect } from 'react';
import GameBoard from '@/components/GameBoard';
import GameHeader from '@/components/GameHeader';
import GameControls from '@/components/GameControls';
import GameStats from '@/components/GameStats';
import { initialGameState, makeMove, resetGame, GameMode, GameState } from '@/utils/gameLogic';
import { makeAIMove } from '@/utils/aiPlayer';
import { loadScores, updateStats, ScoreData } from '@/utils/scoreManager';
import { useToast } from '@/components/ui/use-toast';

const Index = () => {
  const [gameState, setGameState] = useState<GameState>(initialGameState);
  const [scores, setScores] = useState<ScoreData>(loadScores());
  const [showStats, setShowStats] = useState(false);
  const { toast } = useToast();

  // Handle AI moves
  useEffect(() => {
    if (
      gameState.status === 'playing' &&
      gameState.mode !== 'human' &&
      gameState.currentPlayer === 'O'
    ) {
      // Add a small delay to make the AI move feel more natural
      const timeoutId = setTimeout(() => {
        const aiMoveIndex = makeAIMove(gameState);
        if (aiMoveIndex >= 0) {
          handleCellClick(aiMoveIndex);
        }
      }, 600);
      
      return () => clearTimeout(timeoutId);
    }
  }, [gameState]);

  // Update scores when game ends
  useEffect(() => {
    if (gameState.status !== 'playing' && gameState.winningLine !== null) {
      const winner = gameState.currentPlayer === 'X' ? 'O' : 'X'; // Previous player won
      const updatedScores = updateStats(gameState.mode, winner);
      setScores(updatedScores);
      
      // Show toast notification
      toast({
        title: `${winner} Wins!`,
        description: gameState.mode !== 'human' 
          ? `You ${winner === 'X' ? 'won against' : 'lost to'} the ${gameState.mode} AI`
          : "Game over",
        duration: 3000,
      });
    } else if (gameState.status === 'draw') {
      const updatedScores = updateStats(gameState.mode, null);
      setScores(updatedScores);
      
      toast({
        title: "It's a draw!",
        description: "No winner this time",
        duration: 3000,
      });
    }
  }, [gameState.status]);

  const handleCellClick = (cellIndex: number) => {
    setGameState((prevState) => makeMove(prevState, cellIndex));
  };

  const handleReset = () => {
    setGameState(resetGame(gameState.mode));
  };

  const handleModeChange = (mode: GameMode) => {
    setGameState(resetGame(mode));
  };

  return (
    <div className="min-h-screen game-background flex flex-col items-center justify-center py-8 px-4">
      <div className="w-full max-w-md mx-auto">
        <GameHeader gameState={gameState} />
        <GameBoard gameState={gameState} onCellClick={handleCellClick} />
        <GameControls 
          onReset={handleReset}
          onModeChange={handleModeChange}
          currentMode={gameState.mode}
          onShowStats={() => setShowStats(true)}
        />
        
        <div className="mt-8 text-center">
          <p className="text-white/80 text-xs">
            Created by sujith © 2025
          </p>
        </div>
      </div>
      
      <GameStats 
        scoreData={scores}
        isOpen={showStats}
        onClose={() => setShowStats(false)}
      />
    </div>
  );
};

export default Index;
