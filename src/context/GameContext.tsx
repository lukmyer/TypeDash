import React, { createContext, useContext, useState, useEffect } from 'react';

type GameState = 'start' | 'playing' | 'gameover';
type Difficulty = 'easy' | 'normal' | 'hard';

interface Word {
  id: string;
  text: string;
  x: number;
  y: number;
  speed: number;
  completed?: boolean;
  missed?: boolean;
}

interface GameContextType {
  gameState: GameState;
  setGameState: (state: GameState) => void;
  difficulty: Difficulty;
  setDifficulty: (difficulty: Difficulty) => void;
  words: Word[];
  currentWord: string;
  setCurrentWord: (word: string) => void;
  score: number;
  wpm: number;
  accuracy: number;
  wordsTyped: number;
  totalWords: number;
  resetGame: () => void;
  submitWord: (word: string) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

const WORD_LISTS = {
  easy: ['the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have', 'it', 'for', 'not', 'on', 'with', 'he', 'as', 'you', 'do', 'at', 'this'],
  normal: ['program', 'computer', 'software', 'internet', 'developer', 'coding', 'website', 'database', 'network', 'server', 'browser', 'system', 'design', 'mobile', 'cloud'],
  hard: ['algorithm', 'development', 'programming', 'javascript', 'typescript', 'framework', 'container', 'deployment', 'interface', 'component', 'middleware', 'kubernetes', 'microservice'],
};

const SPEED_MULTIPLIERS = {
  easy: 1,
  normal: 1.5,
  hard: 2,
};

const TOTAL_WORDS = 30;

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [gameState, setGameState] = useState<GameState>('start');
  const [difficulty, setDifficulty] = useState<Difficulty>('normal');
  const [words, setWords] = useState<Word[]>([]);
  const [currentWord, setCurrentWord] = useState('');
  const [score, setScore] = useState(0);
  const [wpm, setWpm] = useState(0);
  const [startTime, setStartTime] = useState(Date.now());
  const [wordsTyped, setWordsTyped] = useState(0);
  const [correctWords, setCorrectWords] = useState(0);
  const [totalWordsGenerated, setTotalWordsGenerated] = useState(0);

  const getRandomWord = () => {
    const wordList = WORD_LISTS[difficulty];
    return wordList[Math.floor(Math.random() * wordList.length)];
  };

  const createWord = (): Word => ({
    id: Math.random().toString(36).substr(2, 9),
    text: getRandomWord(),
    x: 0,
    y: 50 + Math.random() * 300,
    speed: 2 * SPEED_MULTIPLIERS[difficulty],
    completed: false,
    missed: false,
  });

  const submitWord = (typedWord: string) => {
    setWords((currentWords) => {
      const matchingWordIndex = currentWords.findIndex(
        (word) => word.text === typedWord && !word.completed && !word.missed
      );

      if (matchingWordIndex !== -1) {
        const newWords = [...currentWords];
        newWords[matchingWordIndex] = {
          ...newWords[matchingWordIndex],
          completed: true,
        };
        setScore((prev) => prev + typedWord.length);
        setCorrectWords((prev) => prev + 1);
        setWordsTyped((prev) => prev + 1);
        return newWords.filter((word) => !word.completed);
      }
      return currentWords;
    });
  };

  useEffect(() => {
    if (gameState !== 'playing') return;

    const gameLoop = setInterval(() => {
      setWords((currentWords) => {
        // Move existing words
        const updatedWords = currentWords.map((word) => ({
          ...word,
          x: word.x + word.speed,
        }));

        // Check for words that hit the right side
        const rightSideWords = updatedWords.filter((word) => word.x >= 700 && !word.completed && !word.missed);
        if (rightSideWords.length > 0) {
          rightSideWords.forEach((word) => {
            word.missed = true;
            setWordsTyped((prev) => prev + 1);
          });
        }

        // Check if we've reached the word limit
        if (wordsTyped >= TOTAL_WORDS) {
          setGameState('gameover');
          return currentWords;
        }

        // Add new word occasionally if we haven't reached the limit
        if (Math.random() < 0.02 && updatedWords.length < 5 && totalWordsGenerated < TOTAL_WORDS) {
          updatedWords.push(createWord());
          setTotalWordsGenerated((prev) => prev + 1);
        }

        return updatedWords.filter((word) => !word.completed && !word.missed);
      });
    }, 1000 / 60);

    return () => clearInterval(gameLoop);
  }, [gameState, difficulty, wordsTyped, totalWordsGenerated]);

  useEffect(() => {
    if (gameState === 'playing') {
      const interval = setInterval(() => {
        const timeElapsed = (Date.now() - startTime) / 1000 / 60; // in minutes
        const calculatedWpm = Math.round(score / timeElapsed);
        setWpm(calculatedWpm || 0);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [gameState, score, startTime]);

  const accuracy = wordsTyped > 0 ? Math.round((correctWords / wordsTyped) * 100) : 0;

  const resetGame = () => {
    setGameState('start');
    setWords([]);
    setCurrentWord('');
    setScore(0);
    setWpm(0);
    setStartTime(Date.now());
    setWordsTyped(0);
    setCorrectWords(0);
    setTotalWordsGenerated(0);
  };

  const value = {
    gameState,
    setGameState,
    difficulty,
    setDifficulty,
    words,
    currentWord,
    setCurrentWord,
    score,
    wpm,
    accuracy,
    wordsTyped,
    totalWords: TOTAL_WORDS,
    resetGame,
    submitWord,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};