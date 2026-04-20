'use client';

import { useState, useEffect } from 'react';

export default function TriviaGame() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/trivia');
      const data = await res.json();
      setQuestions(data.questions);
      setCurrentQuestionIndex(0);
      setScore(0);
      setGameOver(false);
      setSelectedAnswer(null);
      setIsCorrect(null);
    } catch (error) {
      console.error('Failed to load questions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerClick = (option) => {
    if (selectedAnswer) return; // Prevent multiple clicks

    const currentQuestion = questions[currentQuestionIndex];
    const correct = option === currentQuestion.answer;

    setSelectedAnswer(option);
    setIsCorrect(correct);

    if (correct) {
      setScore((prev) => prev + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setIsCorrect(null);
    } else {
      setGameOver(true);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (gameOver) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8 text-center max-w-md mx-auto">
        <h2 className="text-3xl font-bold mb-4 text-gray-800">¡Juego Terminado!</h2>
        <p className="text-xl mb-6 text-gray-600">
          Tu puntuación: <span className="font-bold text-blue-600">{score}</span> / {questions.length}
        </p>
        <button
          onClick={fetchQuestions}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Jugar de Nuevo
        </button>
      </div>
    );
  }

  const question = questions[currentQuestionIndex];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 max-w-2xl mx-auto border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
          Pregunta {currentQuestionIndex + 1} de {questions.length}
        </span>
        <span className="bg-blue-100 text-blue-800 text-sm font-bold px-3 py-1 rounded-full">
          Puntos: {score}
        </span>
      </div>

      <div className="mb-8 text-center">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">{question.question}</h3>
        
        {question.type === 'futbol' && (
          <div className="bg-gray-100 p-6 rounded-lg mb-4 shadow-inner">
            <span className="text-3xl font-extrabold text-gray-700">{question.text}</span>
          </div>
        )}

        {question.type === 'geografia' && question.image && (
          <div className="flex justify-center mb-4">
            <img 
              src={question.image} 
              alt="Bandera misteriosa" 
              className="w-48 h-auto shadow-md border border-gray-200 rounded"
            />
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {question.options.map((option, index) => {
          let btnClass = "p-4 text-lg font-medium rounded-lg border-2 transition-all duration-200 ";
          
          if (!selectedAnswer) {
            btnClass += "border-gray-200 hover:border-blue-500 hover:bg-blue-50 text-gray-700";
          } else {
            if (option === question.answer) {
              btnClass += "border-green-500 bg-green-100 text-green-800";
            } else if (option === selectedAnswer && !isCorrect) {
              btnClass += "border-red-500 bg-red-100 text-red-800";
            } else {
              btnClass += "border-gray-200 bg-gray-50 text-gray-400 opacity-50";
            }
          }

          return (
            <button
              key={index}
              onClick={() => handleAnswerClick(option)}
              disabled={!!selectedAnswer}
              className={btnClass}
            >
              {option}
            </button>
          );
        })}
      </div>

      {selectedAnswer && (
        <div className="mt-8 flex flex-col items-center animate-fade-in">
          <p className={`text-xl font-bold mb-4 ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
            {isCorrect ? '¡Correcto! 🎉' : `Incorrecto. La respuesta era: ${question.answer}`}
          </p>
          <button
            onClick={nextQuestion}
            className="bg-gray-800 text-white px-8 py-3 rounded-lg font-bold hover:bg-gray-900 transition"
          >
            {currentQuestionIndex < questions.length - 1 ? 'Siguiente Pregunta' : 'Ver Resultados'}
          </button>
        </div>
      )}
    </div>
  );
}
