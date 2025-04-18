
import React from 'react';
import { ScoreData } from '@/utils/scoreManager';
import { X, Circle, Trophy, Award, Hash } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

interface GameStatsProps {
  scoreData: ScoreData;
  isOpen: boolean;
  onClose: () => void;
}

const StatCard = ({ title, value, icon }: { title: string; value: number; icon: React.ReactNode }) => (
  <div className="bg-white/90 rounded-lg p-3 flex flex-col items-center shadow-sm">
    <div className="text-purple-500 mb-1">{icon}</div>
    <h3 className="text-sm font-medium text-gray-600">{title}</h3>
    <p className="text-2xl font-bold text-gray-800">{value}</p>
  </div>
);

const GameStatsContent = ({ stats }: { stats: ScoreData['playerStats'] }) => (
  <div className="space-y-4">
    <div className="grid grid-cols-3 gap-3">
      <StatCard
        title="Games"
        value={stats.gamesPlayed}
        icon={<Hash className="h-5 w-5" />}
      />
      <StatCard
        title="Streak"
        value={stats.streak}
        icon={<Trophy className="h-5 w-5" />}
      />
      <StatCard
        title="Draws"
        value={stats.draws}
        icon={<Award className="h-5 w-5" />}
      />
    </div>

    <div className="bg-white/90 rounded-lg p-4 shadow-sm">
      <h3 className="text-sm font-medium text-gray-600 mb-3">Wins by Player</h3>
      <div className="flex justify-around items-center">
        <div className="flex flex-col items-center">
          <X className="h-6 w-6 text-indigo-600 mb-1" strokeWidth={2.5} />
          <p className="text-2xl font-bold text-gray-800">{stats.wins.X}</p>
        </div>
        <span className="text-gray-400">vs</span>
        <div className="flex flex-col items-center">
          <Circle className="h-6 w-6 text-purple-500 mb-1" strokeWidth={2.5} />
          <p className="text-2xl font-bold text-gray-800">{stats.wins.O}</p>
        </div>
      </div>
    </div>
  </div>
);

const GameStats: React.FC<GameStatsProps> = ({ scoreData, isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={cn(
        "bg-gradient-to-br from-purple-100 to-indigo-100 border-none",
        "max-w-md mx-auto"
      )}>
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-bold text-purple-800">
            Game Statistics
          </DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="player" className="mt-2">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="player">Human</TabsTrigger>
            <TabsTrigger value="easy">Easy AI</TabsTrigger>
            <TabsTrigger value="medium">Medium AI</TabsTrigger>
            <TabsTrigger value="hard">Hard AI</TabsTrigger>
          </TabsList>
          
          <TabsContent value="player">
            <GameStatsContent stats={scoreData.playerStats} />
          </TabsContent>
          
          <TabsContent value="easy">
            <GameStatsContent stats={scoreData.aiStats.easy} />
          </TabsContent>
          
          <TabsContent value="medium">
            <GameStatsContent stats={scoreData.aiStats.medium} />
          </TabsContent>
          
          <TabsContent value="hard">
            <GameStatsContent stats={scoreData.aiStats.hard} />
          </TabsContent>
        </Tabs>
        
        <div className="text-center text-xs text-gray-500 mt-4">
          Created by sujith
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GameStats;
