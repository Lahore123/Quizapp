"use client"

export default function QuizStart({ onStart }) {
  return (
    <div className="p-8 text-center">
      <h1 className="text-3xl font-bold mb-6">Fruit or Vegetable? A Quiz</h1>
      <p className="mb-8 text-gray-600">
        Test your knowledge about fruits and vegetables. Can you correctly identify which is which?
      </p>
      <button
        onClick={onStart}
        className="bg-blue-800 hover:bg-blue-900 text-white font-semibold py-3 px-8 rounded-md text-lg transition-colors"
      >
        Start Quiz
      </button>
    </div>
  )
}

