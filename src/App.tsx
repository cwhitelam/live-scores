import React from 'react';
import { Header } from './components/Header';
import { AutoScrollContainer } from './components/AutoScrollContainer';
import { ScoreCard } from './components/ScoreCard';
import { useSportsData } from './hooks/useSportsData';
import { AutoScrollProvider } from './context/AutoScrollContext';
import { GlobalGameProvider } from './context/GlobalGameContext';
import { SportProvider } from './context/SportContext';
import { useSport } from './context/SportContext';

function GameContainer() {
  const { currentSport } = useSport();
  const { games, loading, error } = useSportsData(currentSport);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 p-4 flex items-center justify-center">
        <div className="text-white text-xl">Loading {currentSport} games...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 p-4 flex items-center justify-center">
        <div className="text-red-500 text-xl">{error}</div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-4 px-4 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {games.map((game) => (
          <ScoreCard key={game.id} {...game} />
        ))}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <SportProvider>
      <GlobalGameProvider>
        <AutoScrollProvider>
          <div className="min-h-screen bg-gray-900">
            <Header />
            <AutoScrollContainer speed={40}>
              <GameContainer />
            </AutoScrollContainer>
          </div>
        </AutoScrollProvider>
      </GlobalGameProvider>
    </SportProvider>
  );
}