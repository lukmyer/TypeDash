import React from 'react';
import Game from './components/Game';
import { GameProvider } from './context/GameContext';
import { Keyboard } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Keyboard className="w-8 h-8" />
            <h1 className="text-4xl font-bold">TypeDash</h1>
          </div>
          <p className="text-gray-300">Race against time, type with precision</p>
        </header>
        
        <GameProvider>
          <Game />
        </GameProvider>
      </div>
    </div>
  );
}

export default App;