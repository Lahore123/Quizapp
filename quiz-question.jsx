"use client"

import { useEffect } from "react"
import { LightbulbIcon, ArrowRightIcon, XIcon } from "lucide-react"

export default function QuizQuestion({
  question,
  questionNumber,
  totalQuestions,
  selectedAnswer,
  onSelectAnswer,
  onNextQuestion,
  timer,
  setTimer,
  score,
}) {
  useEffect(() => {
    if (!selectedAnswer) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer <= 1) {
            clearInterval(interval)
            // Auto-select a wrong answer if time runs out
            const wrongAnswer = question.options.find((option) => option !== question.correctAnswer)
            if (wrongAnswer) onSelectAnswer(wrongAnswer)
            return 0
          }
          return prevTimer - 1
        })
      }, 1000)

      return () => clearInterval(interval)
    }
  }, [selectedAnswer, setTimer, question.options, question.correctAnswer, onSelectAnswer])

  const getOptionClass = (option) => {
    if (!selectedAnswer) return "border-2 border-gray-300 hover:border-gray-500"

    if (option === question.correctAnswer) {
      return "border-2 border-green-600 bg-green-50 text-green-800"
    }

    if (option === selectedAnswer && option !== question.correctAnswer) {
      return "border-2 border-red-600 bg-red-50 text-red-800"
    }

    return "border-2 border-gray-300 opacity-50"
  }

  return (
    <div>
      <div className="border-b p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Fruit or Vegetable? A Quiz</h1>
        <div className="flex items-center gap-6">
          <div className="relative w-12 h-12">
            <div className="absolute inset-0 rounded-full border-4 border-red-600 flex items-center justify-center text-xl font-bold">
              {timer}
            </div>
          </div>
          <div className="text-lg">
            {questionNumber} of {totalQuestions}
          </div>
          <div className="text-lg">Score: {score}</div>
        </div>
      </div>

      <div className="p-8">
        <h2 className="text-2xl text-center mb-8">Fruit or vegetable: {question.question}</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {question.options.map((option) => (
            <button
              key={option}
              onClick={() => !selectedAnswer && onSelectAnswer(option)}
              className={`p-4 rounded-md text-center text-lg font-medium transition-all relative ${getOptionClass(option)}`}
              disabled={selectedAnswer !== null}
            >
              {option}
              {selectedAnswer && option !== question.correctAnswer && option === selectedAnswer && (
                <span className="absolute right-2 top-2">
                  <XIcon className="h-6 w-6 text-red-600" />
                </span>
              )}
            </button>
          ))}
        </div>

        {selectedAnswer && (
          <div className="mb-8">
            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-md">
              <LightbulbIcon className="h-6 w-6 text-gray-800 mt-0.5 flex-shrink-0" />
              <p>{question.explanation}</p>
            </div>
          </div>
        )}

        {selectedAnswer && (
          <div className="flex justify-center">
            <button
              onClick={onNextQuestion}
              className="bg-blue-800 hover:bg-blue-900 text-white font-semibold py-2 px-6 rounded-md flex items-center gap-2 transition-colors"
            >
              Next <ArrowRightIcon className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

