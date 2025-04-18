
import React from 'react';
import { Button } from '@/components/ui/button';
import { GameMode } from '@/utils/gameLogic';
import { 
  RotateCw, 
  Users, 
  Cpu,
  BarChart3
} from 'lucide-react';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';

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
    <div className="w-full max-w-md mx-auto mt-6 animate-fade-in">
      <div className="flex flex-wrap gap-4 justify-center">
        <Button 
          onClick={onReset} 
          variant="outline"
          className="bg-white/80 hover:bg-white"
        >
          <RotateCw className="w-4 h-4 mr-2" />
          New Game
        </Button>
        
        <div className="flex items-center">
          <Select 
            value={currentMode} 
            onValueChange={(value) => onModeChange(value as GameMode)}
          >
            <SelectTrigger className="w-36 bg-white/80">
              <SelectValue placeholder="Game Mode" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="human">
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-2" />
                  Human vs Human
                </div>
              </SelectItem>
              <SelectItem value="easy">
                <div className="flex items-center">
                  <Cpu className="w-4 h-4 mr-2" />
                  AI: Easy
                </div>
              </SelectItem>
              <SelectItem value="medium">
                <div className="flex items-center">
                  <Cpu className="w-4 h-4 mr-2" />
                  AI: Medium
                </div>
              </SelectItem>
              <SelectItem value="hard">
                <div className="flex items-center">
                  <Cpu className="w-4 h-4 mr-2" />
                  AI: Hard
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Button 
          onClick={onShowStats}
          variant="outline"
          className="bg-white/80 hover:bg-white"
        >
          <BarChart3 className="w-4 h-4 mr-2" />
          Stats
        </Button>
      </div>
    </div>
  );
};

export default GameControls;
