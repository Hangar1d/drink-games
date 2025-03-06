// src/components/ChooserGame.jsx
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ChooserGame = () => {
  // === States ===
  const [touches, setTouches] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [countdown, setCountdown] = useState(null);
  const [gameEnded, setGameEnded] = useState(false);

  // === Refs & Navigation ===
  const containerRef = useRef(null);
  const timerRef = useRef(null);
  const countdownTimerRef = useRef(null);
  const lastTapTimeRef = useRef(0); // For detecting double/triple taps
  const tapCountRef = useRef(0);
  const navigate = useNavigate();   // React Router navigation

  // A ref to always hold the latest touches
  const touchesRef = useRef([]);
  useEffect(() => {
    touchesRef.current = touches;
  }, [touches]);

  // === Reset the entire game state & clear timers ===
  const resetGame = () => {
    setTouches([]);
    setSelectedId(null);
    setCountdown(null);
    setGameEnded(false);

    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    if (countdownTimerRef.current) {
      clearInterval(countdownTimerRef.current);
      countdownTimerRef.current = null;
    }
  };

  // === Convert each active touch to { id, x%, y% } for circle positioning ===
  const updateTouches = (touchList) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();

    const newTouches = Array.from(touchList).map((t) => ({
      id: t.identifier,
      x: ((t.clientX - rect.left) / rect.width) * 100,
      y: ((t.clientY - rect.top) / rect.height) * 100,
    }));

    setTouches(newTouches);
  };

  // === Touch handlers ===
  const handleTouchStart = (event) => {
    event.preventDefault();
    // No auto‐reset here—only double‐tap resets the game.
    updateTouches(event.touches);
  };

  const handleTouchMove = (event) => {
    event.preventDefault();
    updateTouches(event.touches);
  };

  /**
   * Detect "tap" gestures on touch end:
   * - Double-tap => Reset
   * - Triple-tap => Back
   */
  const handleTouchEnd = (event) => {
    event.preventDefault();
    updateTouches(event.touches);

    // If all fingers are lifted, consider it a "tap" attempt
    if (event.touches.length === 0) {
      const now = Date.now();
      // If user taps again within 300ms, increment tapCount; otherwise reset it to 1
      if (now - lastTapTimeRef.current < 300) {
        tapCountRef.current += 1;
      } else {
        tapCountRef.current = 1;
      }
      lastTapTimeRef.current = now;

      // Check for double or triple tap
      if (tapCountRef.current === 2) {
        // Double tap => Reset
        resetGame();
      } else if (tapCountRef.current === 3) {
        // Triple tap => Navigate back
        tapCountRef.current = 0; // Reset tap count
        navigate('/');
      }
    }
  };

  // Cancel any touches
  const handleTouchCancel = (event) => {
    event.preventDefault();
    updateTouches(event.touches);
  };

  // === Start or cancel the countdown based on # of touches ===
  useEffect(() => {
    // If we have >= 2 touches, no selection yet, and no existing timer => start countdown
    if (touches.length >= 2 && selectedId === null && !timerRef.current) {
      // 1) Set up the countdown in state
      setCountdown(3);

      // 2) Update countdown display every second
      countdownTimerRef.current = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(countdownTimerRef.current);
            countdownTimerRef.current = null;
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      // 3) After 3 seconds, pick from the latest touches (using touchesRef)
      timerRef.current = setTimeout(() => {
        const latestTouches = touchesRef.current;
        if (latestTouches && latestTouches.length > 0) {
          const randomIndex = Math.floor(Math.random() * latestTouches.length);
          const chosenTouch = latestTouches[randomIndex];
          setSelectedId(chosenTouch.id);

          // Keep only the chosen circle
          setTouches([chosenTouch]);
        }
        setCountdown(null);
        timerRef.current = null;
        setGameEnded(true);
      }, 3000);
    }
    // If touches drop below two before time is up and no one is chosen => cancel countdown
    else if (touches.length < 2 && selectedId === null) {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      if (countdownTimerRef.current) {
        clearInterval(countdownTimerRef.current);
        countdownTimerRef.current = null;
      }
      setCountdown(null);
    }
  }, [touches, selectedId]);

  return (
    <div
      ref={containerRef}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchCancel}
      className="
        fixed inset-0
        overflow-hidden
        bg-gradient-to-br from-pink-500 via-red-500 to-orange-500
        select-none
      "
      style={{
        touchAction: 'none',       // Disable pinch-zoom
        overscrollBehavior: 'none',// Disable pull-to-refresh
        WebkitUserSelect: 'none',  // Disable text selection on iOS Safari
        MsUserSelect: 'none',      // Disable text selection on IE/Edge
        userSelect: 'none',        // Disable text selection on modern browsers
      }}
    >
      {/* Title Section */}
      <div className="absolute top-0 left-0 right-0 text-center mt-6 px-4 z-10">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white drop-shadow-lg">
          СОНГОГЧ
        </h1>
        <p className="text-md sm:text-lg text-white/90 mt-2">
          Хоёр болон түүнээс дээш тоглогчид дэлгэцэн дээр дарж тоглоомыг эхлүүлнэ. Санамсаргүй байдлаар нэг тоглогч сонгогдоно.
        </p>
        <p className="text-sm text-white/80 mt-2">
          <strong>2 товшиж</strong> дахин эхлүүл, <strong>3 товшиж</strong> буцна.
        </p>
      </div>

      {/* Active Touch Circles */}
      {touches.map((touch) => (
        <div
          key={touch.id}
          className={`
            absolute
            w-32 h-32
            -ml-16 -mt-16
            rounded-full border-8
            flex items-center justify-center
            transition-all duration-200
            ${selectedId === touch.id
              ? 'bg-green-200 border-green-300 animate-none'
              : 'border-white/60 bg-transparent animate-pulse'
            }
          `}
          style={{
            left: `${touch.x}%`,
            top: `${touch.y}%`,
            zIndex: 20,
          }}
        />
      ))}

      {/* Countdown Overlay */}
      {countdown !== null && (
        <div className="absolute inset-0 flex items-center justify-center z-30">
          <div className="text-8xl font-black text-white drop-shadow-lg">
            {countdown}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChooserGame;