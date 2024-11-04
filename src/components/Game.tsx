import React, { useEffect, useRef, useState } from 'react';
import { useGame } from '../context/GameContext';
import GameOver from './GameOver';
import StartScreen from './StartScreen';
import WordCanvas from './WordCanvas';

const Game: React.FC = () => {
  const { 
    gameState,
    difficulty,
    wpm,
    currentWord,
    setCurrentWord,
    score,
    resetGame,
    submitWord,
    wordsTyped,
    totalWords
  } = useGame();
  
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (gameState === 'playing') {
      inputRef.current?.focus();
    }
  }, [gameState]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (input.trim()) {
        submitWord(input.trim());
        setInput('');
      }
    }
  };

  if (gameState === 'gameover') {
    return <GameOver />;
  }

  if (gameState === 'start') {
    return <StartScreen />;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-black/30 rounded-lg p-6 backdrop-blur-sm">
        <div className="flex justify-between mb-4">
          <div className="text-lg">
            <span className="font-semibold">WPM:</span> {wpm}
          </div>
          <div className="text-lg">
            <span className="font-semibold">Progress:</span> {wordsTyped}/{totalWords}
          </div>
          <div className="text-lg">
            <span className="font-semibold">Difficulty:</span>{' '}
            <span className="capitalize">{difficulty}</span>
          </div>
        </div>

        <WordCanvas />

        <div className="mt-6">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
            placeholder="Type words and press Enter or Space to submit..."
            autoFocus
          />
        </div>

        <button
          onClick={resetGame}
          className="mt-4 px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg transition-colors"
        >
          Reset Game
        </button>
      </div>
    </div>
  );
};

export default Game;