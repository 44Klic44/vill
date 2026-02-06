import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
        <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-blue-600 mb-4">
        Tailwind CSS работает! 🎉
      </h1>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Тестовая кнопка
      </button>
      <div className="mt-4 p-64 bg-green-100 border border-green-400 rounded">
        Если видишь стили — всё настроено правильно!
      </div>
    </div>
  )
}

export default App
