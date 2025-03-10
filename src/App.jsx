import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Home from './components/Home'
import ChooserGame from './components/ChooserGame'
import CardGame from './components/CardGame'
import NeverHaveIEver from './components/NeverHaveIEver'
import GuessSongs from './components/GuessTheSongs'

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <main className="p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chooser" element={<ChooserGame />} />
          <Route path="/cardgame" element={<CardGame />} />
          <Route path="/neverhaveiever" element={<NeverHaveIEver />} />
          <Route path="/guesssongs" element={<GuessSongs />} />
        </Routes>
      </main>
    </div>
  )
}

export default App