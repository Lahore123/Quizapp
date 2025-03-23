"use client"

import { useState } from "react"
import QuizStart from "@/components/quiz-start"
import QuizQuestion from "@/components/quiz-question"
import QuizResults from "@/components/quiz-results"
import { quizData } from "@/data/quiz-data"

export default function Home() {
  const [quizStarted, setQuizStarted] = useState(false)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [score, setScore] = useState(0)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [timer, setTimer] = useState(30)
  const [answers, setAnswers] = useState([])

  const startQuiz = () => {
    setQuizStarted(true)
    setCurrentQuestionIndex(0)
    setScore(0)
    setQuizCompleted(false)
    setTimer(30)
    setAnswers([])
  }

  const handleAnswerSelect = (answer) => {
    if (selectedAnswer) return // Prevent selecting another answer

    const currentQuestion = quizData[currentQuestionIndex]
    const isCorrect = answer === currentQuestion.correctAnswer

    if (isCorrect) {
      setScore(score + 1)
    }

    setSelectedAnswer(answer)

    setAnswers([
      ...answers,
      {
        question: currentQuestion.question,
        userAnswer: answer,
        correctAnswer: currentQuestion.correctAnswer,
        isCorrect,
      },
    ])
  }

  const goToNextQuestion = () => {
    if (currentQuestionIndex < quizData.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setSelectedAnswer(null)
      setTimer(30)
    } else {
      setQuizCompleted(true)
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gray-50">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg overflow-hidden">
        {!quizStarted ? (
          <QuizStart onStart={startQuiz} />
        ) : quizCompleted ? (
          <QuizResults score={score} totalQuestions={quizData.length} answers={answers} onRestart={startQuiz} />
        ) : (
          <QuizQuestion
            question={quizData[currentQuestionIndex]}
            questionNumber={currentQuestionIndex + 1}
            totalQuestions={quizData.length}
            selectedAnswer={selectedAnswer}
            onSelectAnswer={handleAnswerSelect}
            onNextQuestion={goToNextQuestion}
            timer={timer}
            setTimer={setTimer}
            score={score}
          />
        )}
      </div>
    </main>
  )
}

