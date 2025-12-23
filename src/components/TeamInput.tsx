import { useState } from 'react';
import { Search, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface TeamInputProps {
  onAnalyze: (team1: string, team2: string) => void;
  isLoading: boolean;
}

export function TeamInput({ onAnalyze, isLoading }: TeamInputProps) {
  const [team1, setTeam1] = useState('Arsenal');
  const [team2, setTeam2] = useState('Crystal Palace');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (team1.trim() && team2.trim()) {
      onAnalyze(team1.trim(), team2.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-4xl mx-auto">
      <div className="glass-card p-6 md:p-8">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="flex-1 w-full">
            <label className="block text-sm font-medium text-muted-foreground mb-2">
              Time da Casa
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                value={team1}
                onChange={(e) => setTeam1(e.target.value)}
                placeholder="Ex: Arsenal"
                className="pl-10 bg-secondary/50 border-border/50 h-12 text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/50"
              />
            </div>
          </div>

          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 border border-primary/30 text-primary font-bold text-sm shrink-0 mt-6 md:mt-0">
            VS
          </div>

          <div className="flex-1 w-full">
            <label className="block text-sm font-medium text-muted-foreground mb-2">
              Time Visitante
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                value={team2}
                onChange={(e) => setTeam2(e.target.value)}
                placeholder="Ex: Crystal Palace"
                className="pl-10 bg-secondary/50 border-border/50 h-12 text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/50"
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={isLoading || !team1.trim() || !team2.trim()}
            className="w-full md:w-auto h-12 px-8 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold mt-6 md:mt-6 gap-2 glow-border"
          >
            <Zap className="h-4 w-4" />
            {isLoading ? 'Analisando...' : 'Analisar'}
          </Button>
        </div>
      </div>
    </form>
  );
}
