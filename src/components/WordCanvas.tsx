import React, { useEffect, useRef } from 'react';
import { useGame } from '../context/GameContext';

const WordCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { words, gameState } = useGame();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const render = () => {
      if (gameState !== 'playing') return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      words.forEach((word) => {
        // Set different colors for completed and active words
        ctx.fillStyle = word.completed ? '#4ade80' : 'white';
        ctx.font = '24px Arial';
        ctx.fillText(word.text, word.x, word.y);
      });
    };

    const animationFrame = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animationFrame);
  }, [words, gameState]);

  return (
    <canvas
      ref={canvasRef}
      width={800}
      height={400}
      className="w-full bg-black/20 rounded-lg"
    />
  );
};

export default WordCanvas;