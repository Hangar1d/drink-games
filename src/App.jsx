import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Home from './components/Home'
import ChooserGame from './components/ChooserGame'
import CardGame from './components/CardGame'

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <main className="p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chooser" element={<ChooserGame />} />
          <Route path="/cardgame" element={<CardGame />} />
        </Routes>
      </main>
    </div>
  )
}

export default App