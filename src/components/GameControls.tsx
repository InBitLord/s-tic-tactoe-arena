
import React from 'react';
import { Button } from '@/components/ui/button';
import { GameMode } from '@/utils/gameLogic';
import { 
  RotateCw, 
  Users, 
  Cpu,
} from 'lucide-react';

interface GameControlsProps {
  onReset: () => void;
  onModeChange: (mode: GameMode) => void;
  currentMode: GameMode;
  onShowStats: () => void;
}

const GameControls: React.FC<GameControlsProps> = ({ 
  onReset, 
  onModeChange, 
  currentMode,
  onShowStats
}) => {
  return (
    <div className="w-full max-w-md mx-auto mt-6">
      <div className="flex flex-wrap gap-4 justify-center">
        <Button 
          onClick={onReset} 
          variant="outline"
          className="bg-white/80"
        >
          <RotateCw className="w-4 h-4 mr-2" />
          New Game
        </Button>
        
        <select 
          value={currentMode} 
          onChange={(e) => onModeChange(e.target.value as GameMode)}
          className="px-4 py-2 rounded-md bg-white/80"
        >
          <option value="human">Human vs Human</option>
          <option value="easy">AI: Easy</option>
          <option value="medium">AI: Medium</option>
          <option value="hard">AI: Hard</option>
        </select>
        
        <Button 
          onClick={onShowStats}
          variant="outline"
          className="bg-white/80"
        >
          Stats
        </Button>
      </div>
    </div>
  );
};

export default GameControls;
