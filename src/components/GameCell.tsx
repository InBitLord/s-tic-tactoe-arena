
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
        "w-full aspect-square rounded-md flex items-center justify-center bg-white/90 text-4xl font-bold",
        "transition-all duration-300 cell-shadow hover-scale",
        value === null && !disabled && "hover:bg-white/100",
        isWinningCell && "winner-shadow bg-orange-100",
        disabled && "cursor-not-allowed opacity-80"
      )}
      aria-label={value ? `Cell with ${value}` : "Empty cell"}
    >
      {value === 'X' && (
        <X 
          className={cn(
            "w-10 h-10 text-indigo-600 animate-pop-in", 
            isWinningCell && "text-orange-500"
          )} 
          strokeWidth={3} 
        />
      )}
      {value === 'O' && (
        <Circle 
          className={cn(
            "w-10 h-10 text-purple-500 animate-pop-in", 
            isWinningCell && "text-orange-500"
          )} 
          strokeWidth={3} 
        />
      )}
    </button>
  );
};

export default GameCell;
