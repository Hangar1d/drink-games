// src/components/Home.jsx
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../styles/Bubbles.css'
import bgImage from '/public/bg.png'

const Home = () => {
  // Example bubble config (add as many as you like)
  // Each bubble has a different size, duration, and left offset
  const bubbles = [
    { size: 60, duration: 10, left: '10%' },
    { size: 80, duration: 14, left: '28%' },
    { size: 70, duration: 12, left: '45%' },
    { size: 90, duration: 16, left: '65%' },
    { size: 60, duration: 10, left: '80%' },
  ]

  // ============ 1) LOADING STATE & NAV ===============
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  // Helper to show/hide the overlay
  const showLoadingOverlay = (val) => {
    setLoading(val)
  }

  // ============ 2) RENDERING ==========================
  return (
    <div
      className="fixed inset-0 overflow-hidden select-none"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: '53% center',
        backgroundRepeat: 'no-repeat',
        touchAction: 'none',
        overscrollBehavior: 'none',
        WebkitUserSelect: 'none',
        MsUserSelect: 'none',
        userSelect: 'none',
      }}
    >
      {/* Floating Bubbles */}
      {bubbles.map((b, i) => (
        <div
          key={i}
          className="bubble"
          style={{
            width: `${b.size}px`,
            height: `${b.size}px`,
            left: b.left,
            animationDuration: `${b.duration}s`,
          }}
        />
      ))}

      {/* 3) LOADING OVERLAY (conditionally rendered) */}
      {loading && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <p className="text-white text-xl font-bold">Түр хүлээнэ үү...</p>
        </div>
      )}

      <div className="relative w-full h-full flex items-center justify-center mt-40">
        <div className="flex flex-col space-y-6 items-center">
          {/* 4) OVERRIDE onClick TO SHOW OVERLAY & DELAY NAVIGATION */}
          <Link
            to="/chooser"
            onClick={(e) => {
              e.preventDefault()
              showLoadingOverlay(true)
              // Fake 1s loading, then navigate
              setTimeout(() => {
                showLoadingOverlay(false)
                navigate('/chooser')
              }, 500)
            }}
            className="
              px-8 py-4 
              bg-stone-800/80 
              text-white 
              font-semibold 
              text-xl 
              rounded-xl 
              shadow-xl 
              hover:bg-pink-700/80
              hover:scale-105 
              transform 
              transition 
              duration-200
            "
          >
            Сонгогч Тоглоом
          </Link>

          <Link
            to="/cardgame"
            onClick={(e) => {
              e.preventDefault()
              showLoadingOverlay(true)
              // Fake 1s loading, then navigate
              setTimeout(() => {
                showLoadingOverlay(false)
                navigate('/cardgame')
              }, 500)
            }}
            className="
              px-8 py-4 
              bg-orange-600/80 
              text-white 
              font-semibold 
              text-xl 
              rounded-xl 
              shadow-xl 
              hover:bg-orange-700/80
              hover:scale-105 
              transform 
              transition 
              duration-200
            "
          >
            УУ эсвэл ХИЙ!
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home