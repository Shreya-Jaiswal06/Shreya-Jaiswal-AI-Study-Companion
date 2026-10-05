import { useState } from 'react'

function App() {
  const [activePage, setActivePage] = useState('Dashboard')
  const [materials, setMaterials] = useState([])
  const [question, setQuestion] = useState('')
  const [messages, setMessages] = useState([])

  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState('')
  const [score, setScore] = useState(0)
  const [quizFinished, setQuizFinished] = useState(false)

  const quizQuestions = [
    {
      question: 'What does CPU stand for?',
      options: [
        'Central Processing Unit',
        'Computer Personal Unit',
        'Central Program Utility',
        'Computer Processing User'
      ],
      answer: 'Central Processing Unit'
    },
    {
      question: 'Which language is mainly used for styling web pages?',
      options: [
        'Python',
        'CSS',
        'C++',
        'Java'
      ],
      answer: 'CSS'
    },
    {
      question: 'What does HTML stand for?',
      options: [
        'Hyper Text Markup Language',
        'High Text Machine Language',
        'Hyper Transfer Markup Language',
        'Home Tool Markup Language'
      ],
      answer: 'Hyper Text Markup Language'
    }
  ]

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0]

    if (selectedFile) {
      setMaterials([...materials, selectedFile])
    }
  }

  const handleSendMessage = () => {
    if (question.trim() === '') {
      return
    }

    const userMessage = {
      type: 'user',
      text: question
    }

    const aiMessage = {
      type: 'ai',
      text: 'This is a demo AI response. Later, we will connect the AI Tutor with the backend and RAG system.'
    }

    setMessages([...messages, userMessage, aiMessage])
    setQuestion('')
  }

  const handleNextQuestion = () => {
    if (selectedAnswer === '') {
      return
    }

    if (selectedAnswer === quizQuestions[currentQuestion].answer) {
      setScore(score + 1)
    }

    if (currentQuestion === quizQuestions.length - 1) {
      setQuizFinished(true)
    } else {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer('')
    }
  }

  const restartQuiz = () => {
    setCurrentQuestion(0)
    setSelectedAnswer('')
    setScore(0)
    setQuizFinished(false)
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">

      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-6">

        <h1 className="text-2xl font-bold text-blue-600 mb-10">
          AI Study Companion
        </h1>

        <nav className="space-y-3">

          <button
            onClick={() => setActivePage('Dashboard')}
            className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-100"
          >
            🏠 Dashboard
          </button>

          <button
            onClick={() => setActivePage('My Materials')}
            className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-100"
          >
            📚 My Materials
          </button>

          <button
            onClick={() => setActivePage('AI Tutor')}
            className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-100"
          >
            🤖 AI Tutor
          </button>

          <button
            onClick={() => setActivePage('Quiz')}
            className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-100"
          >
            📝 Quiz
          </button>

          <button
            onClick={() => setActivePage('My Progress')}
            className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-100"
          >
            📊 My Progress
          </button>

        </nav>
      </aside>


      {/* Main Content */}
      <main className="flex-1 p-8">

        {/* Dashboard */}
        {activePage === 'Dashboard' && (
          <>
            <h2 className="text-3xl font-bold text-gray-800">
              Welcome, Student 👋
            </h2>

            <p className="text-gray-600 mt-2 mb-8">
              What would you like to study today?
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="text-4xl mb-4">📚</div>
                <h3 className="text-xl font-semibold text-gray-800">
                  My Materials
                </h3>
                <p className="text-gray-500 mt-2">
                  Access your study materials.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="text-4xl mb-4">🤖</div>
                <h3 className="text-xl font-semibold text-gray-800">
                  AI Tutor
                </h3>
                <p className="text-gray-500 mt-2">
                  Ask questions and learn with AI.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="text-4xl mb-4">📝</div>
                <h3 className="text-xl font-semibold text-gray-800">
                  Quiz
                </h3>
                <p className="text-gray-500 mt-2">
                  Test your knowledge with quizzes.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="text-4xl mb-4">📊</div>
                <h3 className="text-xl font-semibold text-gray-800">
                  My Progress
                </h3>
                <p className="text-gray-500 mt-2">
                  Track your learning progress.
                </p>
              </div>

            </div>


            {/* Upload */}
            <div className="mt-10 bg-white p-8 rounded-xl shadow-sm">

              <h3 className="text-2xl font-bold text-gray-800">
                Upload Study Material
              </h3>

              <p className="text-gray-500 mt-2">
                Upload your notes, textbooks, slides, or lecture materials.
              </p>

              <label className="inline-block mt-5 bg-blue-600 text-white px-6 py-3 rounded-lg cursor-pointer hover:bg-blue-700">
                📤 Upload Material

                <input
                  type="file"
                  accept=".pdf,.ppt,.pptx,.doc,.docx"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>

            </div>
          </>
        )}


        {/* My Materials */}
        {activePage === 'My Materials' && (
          <>
            <h2 className="text-3xl font-bold text-gray-800">
              My Materials 📚
            </h2>

            <p className="text-gray-600 mt-2 mb-8">
              Here are your uploaded study materials.
            </p>

            {materials.length === 0 ? (
              <div className="bg-white p-8 rounded-xl shadow-sm">
                <p className="text-gray-500">
                  No study materials uploaded yet.
                </p>
              </div>
            ) : (
              <div className="space-y-4">

                {materials.map((file, index) => (
                  <div
                    key={index}
                    className="bg-white p-5 rounded-xl shadow-sm flex items-center justify-between"
                  >

                    <div>
                      <h3 className="font-semibold text-gray-800">
                        📄 {file.name}
                      </h3>

                      <p className="text-gray-500 text-sm mt-1">
                        Study Material
                      </p>
                    </div>

                    <span className="text-blue-600 font-medium">
                      {file.name.split('.').pop().toUpperCase()}
                    </span>

                  </div>
                ))}

              </div>
            )}
          </>
        )}


        {/* AI Tutor */}
        {activePage === 'AI Tutor' && (
          <>
            <h2 className="text-3xl font-bold text-gray-800">
              AI Tutor 🤖
            </h2>

            <p className="text-gray-600 mt-2 mb-6">
              Ask questions and learn with your AI study companion.
            </p>

            <div className="bg-white rounded-xl shadow-sm p-6">

              <div className="h-96 overflow-y-auto space-y-4 mb-6">

                {messages.length === 0 && (
                  <div className="text-center text-gray-500 mt-20">
                    <div className="text-5xl mb-4">🤖</div>
                    <p>
                      Hello! Ask me anything about your study material.
                    </p>
                  </div>
                )}

                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={
                      message.type === 'user'
                        ? 'flex justify-end'
                        : 'flex justify-start'
                    }
                  >

                    <div
                      className={
                        message.type === 'user'
                          ? 'bg-blue-600 text-white px-4 py-3 rounded-xl max-w-md'
                          : 'bg-gray-100 text-gray-800 px-4 py-3 rounded-xl max-w-md'
                      }
                    >

                      <p className="text-sm font-semibold mb-1">
                        {message.type === 'user' ? 'You' : '🤖 AI Tutor'}
                      </p>

                      <p>{message.text}</p>

                    </div>

                  </div>
                ))}

              </div>

              <div className="flex gap-3">

                <input
                  type="text"
                  value={question}
                  onChange={(event) => setQuestion(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                      handleSendMessage()
                    }
                  }}
                  placeholder="Ask your question..."
                  className="flex-1 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <button
                  onClick={handleSendMessage}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
                >
                  Send
                </button>

              </div>

            </div>
          </>
        )}


        {/* Quiz */}
        {activePage === 'Quiz' && (
          <>
            <h2 className="text-3xl font-bold text-gray-800">
              Quiz 📝
            </h2>

            <p className="text-gray-600 mt-2 mb-6">
              Test your knowledge.
            </p>

            {!quizFinished ? (
              <div className="bg-white p-8 rounded-xl shadow-sm max-w-2xl">

                <p className="text-sm text-gray-500 mb-3">
                  Question {currentQuestion + 1} of {quizQuestions.length}
                </p>

                <h3 className="text-2xl font-bold text-gray-800 mb-6">
                  {quizQuestions[currentQuestion].question}
                </h3>

                <div className="space-y-3">

                  {quizQuestions[currentQuestion].options.map(
                    (option, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedAnswer(option)}
                        className={
                          selectedAnswer === option
                            ? 'w-full text-left p-4 rounded-lg border-2 border-blue-600 bg-blue-50'
                            : 'w-full text-left p-4 rounded-lg border border-gray-300 hover:bg-gray-50'
                        }
                      >
                        {option}
                      </button>
                    )
                  )}

                </div>

                <button
                  onClick={handleNextQuestion}
                  className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
                >
                  {currentQuestion === quizQuestions.length - 1
                    ? 'Finish Quiz'
                    : 'Next Question'}
                </button>

              </div>
            ) : (
              <div className="bg-white p-8 rounded-xl shadow-sm max-w-2xl text-center">

                <div className="text-6xl mb-4">🎉</div>

                <h3 className="text-3xl font-bold text-gray-800">
                  Quiz Completed!
                </h3>

                <p className="text-xl text-gray-600 mt-4">
                  Your Score: {score} / {quizQuestions.length}
                </p>

                <button
                  onClick={restartQuiz}
                  className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
                >
                  Try Again
                </button>

              </div>
            )}

          </>
        )}


        {/* My Progress */}
{activePage === 'My Progress' && (
  <>
    <h2 className="text-3xl font-bold text-gray-800">
      My Progress 📊
    </h2>

    <p className="text-gray-600 mt-2 mb-8">
      Track your learning progress and performance.
    </p>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

      {/* Study Materials */}
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <div className="text-4xl mb-4">📚</div>

        <h3 className="text-lg font-semibold text-gray-800">
          Study Materials
        </h3>

        <p className="text-3xl font-bold text-blue-600 mt-3">
          {materials.length}
        </p>

        <p className="text-gray-500 mt-1">
          Materials added
        </p>
      </div>


      {/* Quiz Score */}
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <div className="text-4xl mb-4">📝</div>

        <h3 className="text-lg font-semibold text-gray-800">
          Quiz Score
        </h3>

        <p className="text-3xl font-bold text-blue-600 mt-3">
          {score} / {quizQuestions.length}
        </p>

        <p className="text-gray-500 mt-1">
          Latest quiz score
        </p>
      </div>


      {/* Accuracy */}
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <div className="text-4xl mb-4">🎯</div>

        <h3 className="text-lg font-semibold text-gray-800">
          Accuracy
        </h3>

        <p className="text-3xl font-bold text-blue-600 mt-3">
          {quizFinished
            ? Math.round((score / quizQuestions.length) * 100)
            : 0}%
        </p>

        <p className="text-gray-500 mt-1">
          Quiz accuracy
        </p>
      </div>

    </div>


    {/* Progress Bar */}
    <div className="bg-white p-8 rounded-xl shadow-sm mt-8">

      <h3 className="text-xl font-bold text-gray-800">
        Learning Progress
      </h3>

      <p className="text-gray-500 mt-2 mb-4">
        Your current quiz performance.
      </p>

      <div className="w-full bg-gray-200 rounded-full h-4">

        <div
          className="bg-blue-600 h-4 rounded-full"
          style={{
            width: quizFinished
              ? `${(score / quizQuestions.length) * 100}%`
              : '0%'
          }}
        ></div>

      </div>

    </div>
  </>
)}
      </main>

    </div>
  )
}

export default App