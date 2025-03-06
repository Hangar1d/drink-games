// src/components/Home.jsx
import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../styles/Bubbles.css'
import bgImageLandscape from '/public/bg.png'
import bgImagePortrait from '/public/bg-mobile.png'
import { FaRandom, FaGamepad, FaGlassCheers } from 'react-icons/fa'

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
  const [isMobile, setIsMobile] = useState(false)
  const navigate = useNavigate()

  // Helper to show/hide the overlay
  const showLoadingOverlay = (val) => {
    setLoading(val)
  }

  // Check screen size and set background image accordingly
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768); // 768px is a common breakpoint for tablets
    };
    
    // Initial check
    checkScreenSize();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkScreenSize);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // ============ 2) RENDERING ==========================
  return (
    <div
      className="fixed inset-0 overflow-hidden select-none"
      style={{
        backgroundImage: `url(${isMobile ? bgImagePortrait : bgImageLandscape})`,
        backgroundSize: 'cover',
        backgroundPosition: isMobile ? 'center center' : '53% center',
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

      <div className="relative w-full h-full flex items-center justify-center">
        <div className="absolute w-full flex flex-col items-center gap-4 px-8 md:px-20 bottom-32">
          {/* Top row with two buttons */}
          <div className="flex justify-between md:justify-center md:gap-8 w-full">
            <Link
              to="/chooser"
              onClick={(e) => {
                e.preventDefault()
                showLoadingOverlay(true)
                setTimeout(() => {
                  showLoadingOverlay(false)
                  navigate('/chooser')
                }, 500)
              }}
              className="
                px-5 py-3
                bg-indigo-500/80 backdrop-blur-sm
                text-white 
                font-semibold 
                text-base
                rounded-xl 
                shadow-lg
                hover:bg-indigo-600/90
                hover:scale-105 
                transform 
                transition 
                duration-200
                flex flex-col items-center
                w-44
              "
            >
              <FaRandom className="text-xl mb-1" />
              <span>Сонгогч Тоглоом</span>
            </Link>

            <Link
              to="/cardgame"
              onClick={(e) => {
                e.preventDefault()
                showLoadingOverlay(true)
                setTimeout(() => {
                  showLoadingOverlay(false)
                  navigate('/cardgame')
                }, 500)
              }}
              className="
                px-5 py-3
                bg-amber-500/80 backdrop-blur-sm
                text-white 
                font-semibold 
                text-base
                rounded-xl 
                shadow-lg
                hover:bg-amber-600/90
                hover:scale-105 
                transform 
                transition 
                duration-200
                flex flex-col items-center
                w-44
              "
            >
              <FaGamepad className="text-xl mb-1" />
              <span>УУ эсвэл ХИЙ!</span>
            </Link>
          </div>

          {/* Bottom button */}
          <Link
            to="/neverhaveiever"
            onClick={(e) => {
              e.preventDefault()
              showLoadingOverlay(true)
              setTimeout(() => {
                showLoadingOverlay(false)
                navigate('/neverhaveiever')
              }, 500)
            }}
            className="
              px-5 py-3
              bg-emerald-500/80 backdrop-blur-sm
              text-white 
              font-semibold 
              text-base
              rounded-xl 
              shadow-lg
              hover:bg-emerald-600/90
              hover:scale-105 
              transform 
              transition 
              duration-200
              flex flex-col items-center
              w-44
            "
          >
            <FaGlassCheers className="text-xl mb-1" />
            <span>Би Хэзээ Ч</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home