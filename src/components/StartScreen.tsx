import React from 'react';
import { useGame } from '../context/GameContext';
import { Gamepad2 } from 'lucide-react';

const StartScreen: React.FC = () => {
  const { setGameState, setDifficulty } = useGame();

  const handleStart = (selectedDifficulty: 'easy' | 'normal' | 'hard') => {
    setDifficulty(selectedDifficulty);
    setGameState('playing');
  };

  return (
    <div className="max-w-md mx-auto bg-black/30 rounded-lg p-8 text-center backdrop-blur-sm">
      <Gamepad2 className="w-16 h-16 mx-auto mb-4" />
      <h2 className="text-3xl font-bold mb-6">Select Difficulty</h2>
      
      <div className="space-y-4">
        <button
          onClick={() => handleStart('easy')}
          className="w-full px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg transition-colors text-lg font-semibold"
        >
          Easy
        </button>
        <button
          onClick={() => handleStart('normal')}
          className="w-full px-6 py-3 bg-yellow-600 hover:bg-yellow-700 rounded-lg transition-colors text-lg font-semibold"
        >
          Normal
        </button>
        <button
          onClick={() => handleStart('hard')}
          className="w-full px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg transition-colors text-lg font-semibold"
        >
          Hard
        </button>
      </div>

      <div className="mt-6 text-sm text-gray-300">
        <p>Easy: Slower words, simple vocabulary</p>
        <p>Normal: Medium speed, moderate vocabulary</p>
        <p>Hard: Fast words, challenging vocabulary</p>
      </div>
    </div>
  );
};

export default StartScreen;