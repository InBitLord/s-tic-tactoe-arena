
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
        "bg-white/90 hover:bg-white",
        isWinningCell && "bg-orange-100",
        disabled && "opacity-80"
      )}
    >
      {value === 'X' && (
        <X className="w-12 h-12 text-indigo-600" />
      )}
      {value === 'O' && (
        <Circle className="w-12 h-12 text-purple-500" />
      )}
    </button>
  );
};

export default GameCell;
