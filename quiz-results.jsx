"use client"

import { CheckCircleIcon, XCircleIcon } from "lucide-react"

export default function QuizResults({ score, totalQuestions, answers, onRestart }) {
  const percentage = Math.round((score / totalQuestions) * 100)

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Quiz Results</h1>

      <div className="mb-8 text-center">
        <div className="inline-block rounded-full bg-gray-100 p-6 mb-4">
          <div className="text-4xl font-bold">{percentage}%</div>
        </div>
        <p className="text-xl">
          You scored {score} out of {totalQuestions}
        </p>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Your Answers</h2>
        <div className="space-y-4">
          {answers.map((answer, index) => (
            <div key={index} className="border rounded-md p-4">
              <div className="flex justify-between items-start mb-2">
                <div className="font-medium">
                  Question {index + 1}: {answer.question}
                </div>
                {answer.isCorrect ? (
                  <CheckCircleIcon className="h-6 w-6 text-green-600" />
                ) : (
                  <XCircleIcon className="h-6 w-6 text-red-600" />
                )}
              </div>
              <div className="text-sm text-gray-600">
                Your answer:{" "}
                <span className={answer.isCorrect ? "text-green-600 font-medium" : "text-red-600 font-medium"}>
                  {answer.userAnswer}
                </span>
              </div>
              {!answer.isCorrect && (
                <div className="text-sm text-gray-600">
                  Correct answer: <span className="text-green-600 font-medium">{answer.correctAnswer}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center">
        <button
          onClick={onRestart}
          className="bg-blue-800 hover:bg-blue-900 text-white font-semibold py-3 px-8 rounded-md transition-colors"
        >
          Try Again
        </button>
      </div>
    </div>
  )
}

