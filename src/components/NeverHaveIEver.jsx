import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaWineGlassAlt, FaArrowLeft, FaDice, FaUserPlus, FaRandom } from 'react-icons/fa';

const NeverHaveIEver = () => {
  // =========== STATE MANAGEMENT =============
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);
  const [promptCount, setPromptCount] = useState(0);
  const navigate = useNavigate();
  
  // Player management states
  const [players, setPlayers] = useState([]);
  const [newPlayerName, setNewPlayerName] = useState('');
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [showPlayerSetup, setShowPlayerSetup] = useState(true);
  const [remainingPlayers, setRemainingPlayers] = useState([]);

  // Expanded collection of prompts organized by categories
  const prompts = [
    // Easy and Fun
    "Би хэзээ ч хичээл дээр унтаж байгаагүй",
    
    // Funny & Embarrassing 
    "Би хэзээ ч толины өмнө ганцаараа бүжиглэж байгаагүй",
    "Би хэзээ ч санамсаргүйгээр буруу хүнд ичмээр мессеж явуулж байгаагүй",
    "Би хэзээ ч нээлттэй гэж бодоод шилэн хаалга мөргөж байгаагүй",
    "Би хэзээ ч хэний нэгний instagram руу орж зургийг нь санамсаргүй лайкдаж байгаагүй",
    
    // Relationships & Dating
    "Би хэзээ ч энэ өрөөнд байгаа хүнд дурлаж байгаагүй",
    "Би хэзээ ч хэн нэгэнд удаан хариу өгөлгүй ghost-лож байгаагүй",
    "Би хэзээ ч stalk хийж байгаагүй",
    
    // Travel & Adventure
    "Би хэзээ ч нисэх онгоц эсвэл галт тэрэгнээсээ хоцорч байгаагүй",
    "Би хэзээ ч гадаад улсад ганцаараа аялж байгаагүй",
    "Би хэзээ ч ачаагаа алдаж байгаагүй",
    "Би хэзээ ч өөр улсад төөрч байгаагүй. (Хэрэв байсан бол түүхээ хуваалцаарай.)",
    
    // Party & Nightlife
    "Би хэзээ ч клуб, баар орж байгаагүй",
    "Би хэзээ ч партинд унтаж байгаагүй",
    "Би хэзээ ч насаа хуурамчаар хэлж бааранд орж байгаагүй",
    "Би хэзээ ч согтуугаар караокед дуулж байгаагүй",
    
    // Additional Relationships & Dating
    "Би хэзээ ч хэн нэгнийг үнсээд зугтаж байгаагүй",
    "Би хэзээ ч согтуугаар экс руугаа мессеж бичиж байгаагүй",
    "Би хэзээ ч сохор болзоон хийж байгаагүй",
    
    // Wild & Naughty
    "Би хэзээ ч нүцгэн усанд сэлж байгаагүй",
    "Би хэзээ ч өөрөөсөө наад зах нь 5-аас дээш насны хүнд дурлаж байгаагүй",
    "Би хэзээ ч найзынхаа дүү эсвэл ахтай (эгчтэй) дотносч байгаагүй",
    "Би хэзээ ч болзооны апп ашиглаж байгаагүй",
    
    // Classic Never Have I Ever
    "Би хэзээ ч онгоцоор нисэж байгаагүй",
    "Би хэзээ ч машин жолоодож байгаагүй",
    "Би хэзээ ч морь унаж байгаагүй",
    "Би хэзээ ч далайд сэлж байгаагүй",
    "Би хэзээ ч ууланд авирч байгаагүй", 
    "Би хэзээ ч цагаан хоолтон байж үзээгүй",
    "Би хэзээ ч жүжигт тоглож байгаагүй",
    "Би хэзээ ч тамхи татаж байгаагүй",
    "Би хэзээ ч нусаа идэж байгаагүй",
    "Би хэзээ ч усанд орж байхдаа шээж байгаагүй",
    "Би хэзээ ч хүнтэй дотно харилцаанд орж байгаагүй",
    "Би хэзээ ч хүнтэй давхар харьцаж байгаагүй",
    "Би хэзээ ч тасарч байгаагүй",
    "Би хэзээ ч хэн нэгэнд анхны харцаар дурлаж байгаагүй",
    "Би хэзээ ч энд байгаа хүмүүсийн муулж байгаагүй"
  ];

  // Initialize with a random prompt
  useEffect(() => {
    if (players.length > 0 && !showPlayerSetup) {
      setCurrentPrompt(getRandomPrompt());
      // Initialize the remaining players array with all players
      resetPlayerRotation();
    }
  }, [players, showPlayerSetup]);

  // Fisher-Yates shuffle algorithm
  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Reset player rotation
  const resetPlayerRotation = () => {
    setRemainingPlayers(shuffleArray([...players]));
    setCurrentPlayerIndex(0);
  };

  // Generate random prompt
  const getRandomPrompt = () => {
    const randomIndex = Math.floor(Math.random() * prompts.length);
    return prompts[randomIndex];
  };

  // Handle generating a new prompt and rotating players
  const handleNewPrompt = () => {
    setIsAnimating(true);
    
    setTimeout(() => {
      // Get next prompt
      setCurrentPrompt(getRandomPrompt());
      setIsAnimating(false);
      setPromptCount(prev => prev + 1);
      
      // Handle player rotation
      if (remainingPlayers.length > 0) {
        // Remove the current player from the remaining players
        const updatedRemainingPlayers = [...remainingPlayers];
        updatedRemainingPlayers.shift();
        
        // If no more players, reset the rotation
        if (updatedRemainingPlayers.length === 0) {
          resetPlayerRotation();
        } else {
          setRemainingPlayers(updatedRemainingPlayers);
        }
      }
    }, 400);
  };

  // Go back to home screen
  const handleBack = () => {
    navigate('/');
  };

  // Handle adding a new player
  const handleAddPlayer = () => {
    if (newPlayerName.trim() !== '') {
      setPlayers([...players, newPlayerName.trim()]);
      setNewPlayerName('');
    }
  };

  // Handle starting the game
  const handleStartGame = () => {
    if (players.length > 0) {
      setShowPlayerSetup(false);
      resetPlayerRotation();
    }
  };

  // Handle keypress for adding player
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddPlayer();
    }
  };

  // Handle removing a player
  const handleRemovePlayer = (indexToRemove) => {
    setPlayers(players.filter((_, index) => index !== indexToRemove));
  };

  // Handle shuffling players
  const handleShufflePlayers = () => {
    setPlayers(shuffleArray([...players]));
  };

  // ============= RENDERING =================
  return (
    <div className="fixed inset-0 overflow-hidden bg-gradient-to-br from-emerald-900 via-teal-800 to-cyan-900">
      {/* Enhanced animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full opacity-10"
            style={{
              width: `${20 + Math.random() * 120}px`,
              height: `${20 + Math.random() * 120}px`,
              background: `rgba(${Math.random() * 155 + 100}, 255, ${Math.random() * 200 + 55}, 0.3)`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${15 + Math.random() * 45}s`,
              animation: `float infinite ease-in-out`,
              animationDelay: `${Math.random() * -20}s`,
              boxShadow: '0 0 40px rgba(255, 255, 255, 0.3)',
              transform: `rotate(${Math.random() * 360}deg) scale(${0.8 + Math.random() * 0.5})`,
            }}
          />
        ))}
      </div>

      {/* Enhanced Header */}
      <div className="relative z-10 w-full pt-10 pb-6 text-center">
        <motion.h1 
          className="text-3xl font-extrabold text-white tracking-wider drop-shadow-lg"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Би Хэзээ Ч
        </motion.h1>
        <motion.div 
          className="w-24 h-1.5 bg-gradient-to-r from-emerald-400 to-cyan-400 mx-auto mt-3 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: "6rem" }}
          transition={{ duration: 0.7, delay: 0.3 }}
        />
      </div>

      {/* Player Setup Screen with enhanced design */}
      {showPlayerSetup ? (
        <div className="relative z-10 flex flex-col items-center justify-center min-h-[70vh] px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-br from-emerald-700/80 to-teal-900/80 backdrop-blur-xl p-8 rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)] max-w-md w-full mb-10 border border-emerald-500/20"
          >
            <h2 className="text-2xl text-white font-bold mb-6 text-center drop-shadow-md">Тоглогчдын нэр</h2>
            
            <div className="flex mb-6">
              <input 
                type="text" 
                value={newPlayerName}
                onChange={(e) => setNewPlayerName(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Тоглогчийн нэр"
                className="flex-1 px-4 py-3 rounded-l-xl bg-emerald-800/60 text-white placeholder-emerald-300/60 border border-emerald-600/40 focus:outline-none focus:ring-2 focus:ring-emerald-400/60 transition-all duration-300"
              />
              <button 
                onClick={handleAddPlayer}
                className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white px-5 py-3 rounded-r-xl transition duration-300 shadow-lg"
              >
                <FaUserPlus />
              </button>
            </div>
            
            {players.length > 0 && (
              <>
                <div className="mb-4 flex justify-between items-center">
                  <h3 className="text-lg text-emerald-300 font-medium flex items-center">
                    <span className="bg-emerald-600/50 h-7 w-7 rounded-full inline-flex items-center justify-center mr-2 text-emerald-100 text-sm">{players.length}</span>
                    <span>Тоглогчид</span>
                  </h3>
                  <button 
                    onClick={handleShufflePlayers}
                    className="bg-gradient-to-r from-cyan-600 to-cyan-700 hover:from-cyan-700 hover:to-cyan-800 text-white p-2.5 rounded-lg transition duration-300 flex items-center space-x-1.5 shadow-lg"
                  >
                    <FaRandom size={14} />
                    <span className="text-sm">Холих</span>
                  </button>
                </div>
                
                <div className="max-h-52 overflow-y-auto mb-5 bg-emerald-800/40 rounded-xl p-3 border border-emerald-600/20 shadow-inner">
                  {players.map((player, index) => (
                    <motion.div 
                      key={index} 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex justify-between items-center p-3 mb-2 bg-emerald-700/50 rounded-lg border-l-4 border-emerald-500 hover:bg-emerald-700/70 transition duration-200"
                    >
                      <span className="text-white font-medium">{index + 1}. {player}</span>
                      <motion.button 
                        onClick={() => handleRemovePlayer(index)}
                        className="text-red-400 hover:text-red-300 hover:bg-red-500/20 h-7 w-7 rounded-full flex items-center justify-center transition-all"
                        whileHover={{ rotate: 90 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        &times;
                      </motion.button>
                    </motion.div>
                  ))}
                </div>
              </>
            )}
            
            <motion.button 
              onClick={handleStartGame}
              disabled={players.length === 0}
              className={`w-full py-3.5 rounded-xl text-white font-medium transition duration-300 mt-4 shadow-lg ${
                players.length > 0 
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700' 
                  : 'bg-gray-600/70 cursor-not-allowed'
              }`}
              whileHover={players.length > 0 ? { scale: 1.03 } : {}}
              whileTap={players.length > 0 ? { scale: 0.98 } : {}}
            >
              Тоглоомыг эхлүүлэх
            </motion.button>
          </motion.div>
          
          <motion.button
            onClick={handleBack}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3.5 rounded-xl shadow-lg hover:from-red-600 hover:to-red-700 transition duration-300 flex items-center"
          >
            <FaArrowLeft className="mr-2" />
            Буцах
          </motion.button>
        </div>
      ) : (
        /* Enhanced Main Game Content */
        <div className="relative z-10 flex flex-col items-center justify-between min-h-[70vh] px-6 pb-8">
          {/* Top section with game stats */}
          <div className="w-full">
            {/* Game Counter Stats with enhanced design */}
            <div className="flex justify-center space-x-5 mb-6 mt-2">
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-emerald-800/60 px-5 py-2 rounded-full text-emerald-200 text-sm shadow-lg border border-emerald-600/30 flex items-center"
              >
                <FaDice className="mr-2 text-emerald-400" />
                <span>Асуултууд: {promptCount}</span>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-emerald-800/60 px-5 py-2 rounded-full text-emerald-200 text-sm shadow-lg border border-emerald-600/30 flex items-center"
              >
                <FaUserPlus className="mr-2 text-emerald-400" />
                <span >Тоглогчид: {players.length}</span>
              </motion.div>
            </div>
          </div>
          
          {/* Middle section with card - fixed height */}
          <div className="flex-1 flex items-center justify-center w-full">
            <AnimatePresence mode="wait">
              <motion.div 
                key={currentPrompt + (remainingPlayers[0] || '')}
                initial={{ y: 20, opacity: 0, scale: 0.9 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ y: -20, opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="bg-gradient-to-br from-emerald-700/80 to-teal-900/80 backdrop-blur-xl p-8 rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)] max-w-md w-full border border-emerald-500/20"
              >
                {/* Enhanced Current Player Badge */}
                {remainingPlayers.length > 0 && (
                  <motion.div 
                    className="bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-2.5 rounded-full text-center mb-7 mx-auto inline-block shadow-lg border border-emerald-500/30"
                    initial={{ opacity: 0, y: -15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    style={{ marginLeft: 'auto', marginRight: 'auto', display: 'table' }}
                  >
                    <span className="text-white font-medium">{remainingPlayers[0]}</span>
                  </motion.div>
                )}
                
                <div className="flex justify-center mb-6">
                  <motion.div
                    initial={{ rotate: -10, scale: 0.9 }}
                    animate={{ rotate: 0, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="bg-emerald-600/40 p-4 rounded-full"
                  >
                    <FaWineGlassAlt className="text-emerald-300 text-2xl drop-shadow-lg" />
                  </motion.div>
                </div>
                
                <motion.p 
                  className="text-l text-center mb-6 text-white font-medium leading-relaxed"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {currentPrompt}
                </motion.p>
                
                <motion.div 
                  className="text-center text-emerald-200 mb-2 border-t border-emerald-600/50 pt-5 mt-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <p className="text-xs italic bg-emerald-800/40 inline-block px-4 py-2 rounded-lg">Хэрэв та үүнийг хийж байсан бол уух ёстой!</p>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
          
          {/* Bottom section with fixed position buttons */}
          <div className="text-xs w-full flex justify-center mt-8">
            <div className="flex items-center space-x-6">
              <motion.button
                onClick={() => setShowPlayerSetup(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3.5 rounded-xl shadow-lg hover:from-red-600 hover:to-red-700 transition duration-300 flex items-center"
              >
                <FaArrowLeft className="mr-2" />
                Буцах
              </motion.button>
              
              <motion.button
                onClick={handleNewPrompt}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-8 py-4 rounded-xl shadow-lg hover:from-emerald-600 hover:to-teal-700 transition duration-300 flex items-center font-medium"
              >
                <FaDice className="mr-2 text-lg" />
                Дараагийнх
              </motion.button>
            </div>
          </div>
        </div>
      )}
      
      {/* Add this to your CSS file */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          33% {
            transform: translateY(-15px) rotate(3deg);
          }
          66% {
            transform: translateY(-25px) rotate(-3deg);
          }
        }
      `}</style>
    </div>
  );
};

export default NeverHaveIEver;