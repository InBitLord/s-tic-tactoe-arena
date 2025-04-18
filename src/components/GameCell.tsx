
import React from 'react';
import { X, Circle } from 'lucide-react';
import { CellValue } from '@/utils/gameLogic';
import { cn } from '@/lib/utils';

interface GameCellProps {
  value: CellValue;
  onClick: () => void;
  isWinningCell: boolean;
  disabled: boolean;
}

const GameCell: React.FC<GameCellProps> = ({ value, onClick, isWinningCell, disabled }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled || value !== null}
      className={cn(
        "w-full aspect-square rounded-lg flex items-center justify-center",
        "transition-all duration-300 transform",
        "bg-white/90 backdrop-blur-sm shadow-lg",
        value === null && !disabled && "hover:bg-white hover:scale-105 hover:shadow-xl",
        isWinningCell && "bg-orange-100 animate-bounce shadow-orange-400/50",
        disabled && "cursor-not-allowed opacity-80"
      )}
      aria-label={value ? `Cell with ${value}` : "Empty cell"}
    >
      {value === 'X' && (
        <X 
          className={cn(
            "w-12 h-12 text-indigo-600 animate-pop-in", 
            isWinningCell && "text-orange-500"
          )} 
          strokeWidth={3} 
        />
      )}
      {value === 'O' && (
        <Circle 
          className={cn(
            "w-12 h-12 text-purple-500 animate-pop-in", 
            isWinningCell && "text-orange-500"
          )} 
          strokeWidth={3} 
        />
      )}
    </button>
  );
};

export default GameCell;
