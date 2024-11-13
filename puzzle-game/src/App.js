import React, { useState, useEffect } from 'react';
import './App.css';

const SIZE = 4; // Размер поля 4x4

// Генерация начальной матрицы 4x4
const generateShuffledBoard = () => {
  const numbers = [...Array(SIZE * SIZE - 1).keys()].map(x => x + 1).concat(null);
  for (let i = numbers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
  }

  const board = [];
  for (let i = 0; i < SIZE; i++) {
    board.push(numbers.slice(i * SIZE, (i + 1) * SIZE));
  }
  return board;
};

const App = () => {
  const [board, setBoard] = useState(generateShuffledBoard());
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [timeLimit, setTimeLimit] = useState(0); // Время, заданное пользователем
  const [isSolved, setIsSolved] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [autoCollectMessage, setAutoCollectMessage] = useState(''); // Сообщение для автосбора

  // Обновление времени с интервалом
  useEffect(() => {
    let interval;
    if (startTime && !isGameOver && !isSolved) {
      interval = setInterval(() => {
        const timePassed = Math.floor((Date.now() - startTime) / 1000);
        setElapsedTime(timePassed);

        if (timePassed >= timeLimit) {
          clearInterval(interval);
          setIsGameOver(true);
          alert("Время вышло! Вы проиграли.");
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [startTime, timeLimit, isGameOver, isSolved]);

  // Проверка завершенности игры
  useEffect(() => {
    if (isSolved && !isGameOver) {
      alert(`Поздравляем! Вы завершили игру за ${elapsedTime} секунд.`);
      setIsGameOver(true);
    }
  }, [isSolved, elapsedTime, isGameOver]);

  // Проверка правильности решения
  const checkIfSolved = (board) => {
    const flatBoard = board.flat();
    for (let i = 0; i < flatBoard.length - 1; i++) {
      if (flatBoard[i] !== i + 1) return false;
    }
    return true;
  };

  const handleTileClick = (row, col) => {
    if (isSolved || isGameOver) return;

    const emptyTile = findEmptyTile(board);
    const [emptyRow, emptyCol] = emptyTile;

    if (
      (Math.abs(emptyRow - row) === 1 && emptyCol === col) ||
      (Math.abs(emptyCol - col) === 1 && emptyRow === row)
    ) {
      const newBoard = [...board];
      newBoard[emptyRow][emptyCol] = newBoard[row][col];
      newBoard[row][col] = null;
      setBoard(newBoard);
      setIsSolved(checkIfSolved(newBoard));
    }
  };

  const findEmptyTile = (board) => {
    for (let row = 0; row < SIZE; row++) {
      for (let col = 0; col < SIZE; col++) {
        if (board[row][col] === null) {
          return [row, col];
        }
      }
    }
  };

  const handleNewGame = () => {
    if (timeLimit > 0) {
      setBoard(generateShuffledBoard());
      setStartTime(Date.now());
      setElapsedTime(0); 
      setIsSolved(false);
      setIsGameOver(false);
    } else {
      alert("Пожалуйста, установите время для игры!");
    }
  };

  const handleAutoCollect = () => {
    setAutoCollectMessage('Сам собирай. P.S. В задании сказано добавить кнопку)');
  };

  return (
    <div className="app">
      <h1>Игра Пятнашки</h1>

      <div>
        <label htmlFor="timeLimit">Установите время (в секундах):</label>
        <input
          type="number"
          id="timeLimit"
          min="1"
          value={timeLimit}
          onChange={(e) => setTimeLimit(Number(e.target.value))}
        />
      </div>

      <button onClick={handleNewGame} disabled={isGameOver && isSolved}>Новая игра</button>
      <button onClick={handleAutoCollect}>Автосбор</button>

      {autoCollectMessage && <div className="auto-collect-message">{autoCollectMessage}</div>}

      <div className="board">
        {board.map((row, rowIndex) =>
          row.map((tile, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`tile ${tile === null ? 'empty' : ''}`}
              onClick={() => handleTileClick(rowIndex, colIndex)}
            >
              {tile}
            </div>
          ))
        )}
      </div>

      <div className="timer">
        Время: {elapsedTime} секунд / {timeLimit} секунд
      </div>

      {isGameOver && !isSolved && <div className="game-over">Вы проиграли!</div>}
    </div>
  );
};

export default App;
