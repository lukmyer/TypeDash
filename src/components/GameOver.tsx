import React from 'react';
import { useGame } from '../context/GameContext';
import { Trophy } from 'lucide-react';

const GameOver: React.FC = () => {
  const { score, wpm, accuracy, resetGame, wordsTyped, totalWords } = useGame();

  return (
    <div className="max-w-md mx-auto bg-black/30 rounded-lg p-8 text-center backdrop-blur-sm">
      <Trophy className="w-16 h-16 mx-auto mb-4 text-yellow-400" />
      <h2 className="text-3xl font-bold mb-4">Game Complete!</h2>
      
      <div className="space-y-3 mb-6">
        <p className="text-xl">
          Words Completed: <span className="font-bold">{wordsTyped}/{totalWords}</span>
        </p>
        <p className="text-xl">
          WPM: <span className="font-bold">{wpm}</span>
        </p>
        <p className="text-xl">
          Accuracy: <span className="font-bold">{accuracy}%</span>
        </p>
        <p className="text-xl">
          Score: <span className="font-bold">{score}</span>
        </p>
      </div>

      <button
        onClick={resetGame}
        className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors text-lg font-semibold"
      >
        Play Again
      </button>
    </div>
  );
};

export default GameOver;