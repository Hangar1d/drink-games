import React, { useState, useEffect } from 'react';

const MongolianLyricsGame = () => {
  const [players, setPlayers] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState('');
  const [currentRound, setCurrentRound] = useState(1);
  const [playerIndex, setPlayerIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [playerGuess, setPlayerGuess] = useState('');
  const [isCorrect, setIsCorrect] = useState(null);
  
  // Монгол дуунууд
  const songLibrary = [
    {
      title: "Ээжийн дуу",
      artist: "Д. Хуягбаатар",
      lyricsStart: "Эрвээхэй шиг нисэх дуртай охин",
      lyricsContinue: "Ээжийгээ дагаад явдаг байсан"
    },
    {
      title: "Гантиг",
      artist: "Хурд",
      lyricsStart: "Гантиг чулуугаар хийсэн хөшөө",
      lyricsContinue: "Гагцхүү чиний төрхийг л санагдуулна"
    },
    {
      title: "Миний Монгол",
      artist: "Б. Амархүү",
      lyricsStart: "Эх орныхоо гоо үзэсгэлэнг",
      lyricsContinue: "Эргэцүүлэн бодох үе надад бий"
    },
    {
      title: "Сарнай цэцэг",
      artist: "П. Хаянхярваа",
      lyricsStart: "Улаан улаан сарнай цэцэг",
      lyricsContinue: "Улам улам сайхан харагдана"
    },
    {
      title: "Ээж минь",
      artist: "Д. Жаргалсайхан",
      lyricsStart: "Мөнх ногоон хайрын дурсамж",
      lyricsContinue: "Миний түүхэнд үлдсэн билээ"
    },
    {
      title: "Учрал",
      artist: "Хурд",
      lyricsStart: "Алганы шугам дээр бичигдсэн",
      lyricsContinue: "Амьдралын зам дээр тохиолдсон"
    },
    {
      title: "Нандин бэлэг",
      artist: "Б. Сарантуяа",
      lyricsStart: "Хүнд бэрх цагт минь түшиг болж",
      lyricsContinue: "Хүйтэн өдөр дулаацуулдаг"
    },
    {
      title: "Хамгийн гоё нь",
      artist: "Чингис хаан",
      lyricsStart: "Хөх тэнгэрийн оронд мэндэлж",
      lyricsContinue: "Хөөрхөн монгол охин"
    },
    {
      title: "Би чамд хайртай",
      artist: "А. Ариунаа",
      lyricsStart: "Би чамд хайртай гэдгээ",
      lyricsContinue: "Хэлж чадаагүйдээ харамсаж явна"
    },
    {
      title: "Цагаан сар",
      artist: "Б. Сарангэрэл",
      lyricsStart: "Цастай өндөр уулын цаанаас",
      lyricsContinue: "Цагаан сарын нар мандаж байна"
    },
    {
      title: "Хайрын захиа",
      artist: "Д. Отгонжаргал",
      lyricsStart: "Харандаагаар бичсэн хайрын захидлыг",
      lyricsContinue: "Хадгалж яваа биз ээ чи минь"
    },
    {
      title: "Хонгор шүү дээ",
      artist: "М. Эрдэнэбаяр",
      lyricsStart: "Нарийн зөөлөн хоолойгоор",
      lyricsContinue: "Намуухан дуулж суухад чинь"
    },
    {
      title: "Ганганамсан бүсгүй",
      artist: "The Lemons",
      lyricsStart: "Хотын гудамжаар алхах бүсгүй",
      lyricsContinue: "Хонгор дүрээрээ татна"
    },
    {
      title: "Намар",
      artist: "Б. Лхагвасүрэн",
      lyricsStart: "Намрын шаргал нарны туяа",
      lyricsContinue: "Навчит модоор шүүрнэ"
    },
    {
      title: "Хайртай",
      artist: "Д. Үүрцайх",
      lyricsStart: "Хайрын үгээр үгээ эхэлж",
      lyricsContinue: "Хамтдаа хоёулаа явцгаая"
    }
  ];
  
  const [currentSong, setCurrentSong] = useState(null);
  const [usedSongs, setUsedSongs] = useState([]);
  
  // Тоглогч нэмэх
  const addPlayer = () => {
    if (currentPlayer.trim() && !players.includes(currentPlayer.trim())) {
      setPlayers([...players, currentPlayer.trim()]);
      setCurrentPlayer('');
    }
  };
  
  // Тоглогч хасах
  const removePlayer = (index) => {
    const updatedPlayers = [...players];
    updatedPlayers.splice(index, 1);
    setPlayers(updatedPlayers);
  };
  
  // Тоглоомыг эхлүүлэх
  const startGame = () => {
    if (players.length > 0) {
      setGameStarted(true);
      nextSong();
    }
  };
  
  // Тоглоомыг дахин эхлүүлэх
  const resetGame = () => {
    setGameStarted(false);
    setCurrentRound(1);
    setPlayerIndex(0);
    setShowAnswer(false);
    setUsedSongs([]);
    setCurrentSong(null);
    setPlayerGuess('');
    setIsCorrect(null);
  };
  
  // Шинэ дуу авах
  const nextSong = () => {
    // Ашиглагдаагүй дууг шүүх
    const availableSongs = songLibrary.filter(song => 
      !usedSongs.some(used => used.title === song.title)
    );
    
    // Хэрэв бүх дуу дууссан бол тоглоомыг дуусгах
    if (availableSongs.length === 0) {
      alert("Бүх дуу дууслаа! Тоглоом дууслаа.");
      resetGame();
      return;
    }
    
    // Санамсаргүйгээр нэг дуу сонгох
    const randomIndex = Math.floor(Math.random() * availableSongs.length);
    const selected = availableSongs[randomIndex];
    
    // Энэ дууг ашигласан гэж тэмдэглэх
    setUsedSongs([...usedSongs, selected]);
    
    setCurrentSong(selected);
    setShowAnswer(false);
    setPlayerGuess('');
    setIsCorrect(null);
  };
  
  // Тоглогчийн үргэлжлүүлсэн үг зөв эсэхийг шалгах
  const checkLyrics = () => {
    if (!playerGuess.trim()) return;
    
    // Энгийнээр шалгах - үндсэн үгнээс түлхүүр үг хайх
    const guessLower = playerGuess.toLowerCase();
    const correctLower = currentSong.lyricsContinue.toLowerCase();
    
    // Зөв хариултаас гол түлхүүр үгийг ялгаж авах (4+ үсэгтэй үгс)
    const keyWords = correctLower.split(' ')
      .filter(word => word.length >= 3)
      .map(word => word.replace(/[.,!?;:'"]/g, ''));
    
    // Хэрэв таамаглал доод тал нь 30% түлхүүр үг агуулж байвал хангалттай
    const minKeywordsNeeded = Math.max(1, Math.floor(keyWords.length * 0.3));
    const keyWordsFound = keyWords.filter(word => guessLower.includes(word)).length;
    
    const isGuessCorrect = keyWordsFound >= minKeywordsNeeded;
    setIsCorrect(isGuessCorrect);
    setShowAnswer(true);
  };
  
  // Бууж өгөх
  const giveUp = () => {
    setIsCorrect(false);
    setShowAnswer(true);
  };
  
  // Дараагийн тоглогч руу шилжих
  const nextTurn = () => {
    let nextIndex = playerIndex + 1;
    let nextRound = currentRound;
    
    // Хэрэв бүх тоглогч дууссан бол, эхний тоглогч руу буцаж, тоглолтын тоог нэмэгдүүлэх
    if (nextIndex >= players.length) {
      nextIndex = 0;
      nextRound++;
    }
    
    setPlayerIndex(nextIndex);
    setCurrentRound(nextRound);
    nextSong();
  };
  
  // Enter товч дарахад
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      if (!gameStarted && currentPlayer.trim()) {
        addPlayer();
      } else if (gameStarted && !showAnswer && playerGuess.trim()) {
        checkLyrics();
      }
    }
  };
  
  return (
    <div className="p-4 md:p-6 max-w-lg mx-auto bg-white rounded-xl shadow-md">
      <h1 className="text-xl md:text-2xl font-bold text-center mb-4 md:mb-6">Монгол дууны үгийн тоглоом</h1>
      
      {!gameStarted ? (
        <div className="space-y-4">
          <h2 className="text-lg md:text-xl font-semibold">Тоглогч нэмэх</h2>
          <div className="flex space-x-2">
            <input
              type="text"
              value={currentPlayer}
              onChange={(e) => setCurrentPlayer(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Тоглогчийн нэр"
              className="flex-1 px-3 py-2 text-sm md:text-base border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button 
              onClick={addPlayer}
              className="px-3 md:px-4 py-2 bg-blue-500 text-white text-sm md:text-base rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Нэмэх
            </button>
          </div>
          
          {players.length > 0 && (
            <div className="mt-4">
              <h3 className="font-medium mb-2">Тоглогчид:</h3>
              <ul className="space-y-2">
                {players.map((player, index) => (
                  <li key={index} className="flex justify-between items-center bg-gray-100 px-3 py-2 rounded-md text-sm md:text-base">
                    <span>{player}</span>
                    <button 
                      onClick={() => removePlayer(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Хасах
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          <button 
            onClick={startGame}
            disabled={players.length === 0}
            className={`w-full py-2 mt-4 rounded-md font-medium text-sm md:text-base ${
              players.length === 0 
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                : 'bg-green-500 text-white hover:bg-green-600'
            }`}
          >
            Тоглоом эхлүүлэх
          </button>
        </div>
      ) : (
        <div className="space-y-4 md:space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <span className="text-gray-500 text-sm md:text-base">Тоглолт: {currentRound}</span>
            </div>
            <button 
              onClick={resetGame}
              className="px-2 md:px-3 py-1 text-xs md:text-sm bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              Дахин эхлүүлэх
            </button>
          </div>
          
          <div className="p-3 md:p-4 bg-blue-100 rounded-lg">
            <h2 className="text-base md:text-lg font-semibold text-center mb-1">Одоогийн тоглогч</h2>
            <p className="text-xl md:text-2xl font-bold text-center">{players[playerIndex]}</p>
          </div>
          
          {currentSong && (
            <div className="p-3 md:p-4 bg-gray-100 rounded-lg">
              <div className="text-center mb-4">
                <h3 className="text-base md:text-lg font-bold">{currentSong.title}</h3>
                <p className="text-gray-500 text-sm md:text-base">{currentSong.artist}</p>
              </div>
              
              <div className="p-3 bg-white rounded border-l-4 border-blue-500">
                <p className="text-base md:text-lg font-medium">"{currentSong.lyricsStart}"</p>
              </div>
            </div>
          )}
          
          {!showAnswer ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Дууны үгийг үргэлжлүүл:
                </label>
                <textarea
                  value={playerGuess}
                  onChange={(e) => setPlayerGuess(e.target.value)}
                  placeholder="Дараагийн хэсгийг бич..."
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-16 md:min-h-24 text-sm md:text-base"
                ></textarea>
              </div>
              
              <div className="flex space-x-2">
                <button 
                  onClick={checkLyrics}
                  disabled={!playerGuess.trim()}
                  className={`flex-1 py-2 rounded-md text-sm md:text-base ${
                    !playerGuess.trim() 
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                      : 'bg-blue-500 text-white hover:bg-blue-600'
                  }`}
                >
                  Хариулах
                </button>
                
                <button 
                  onClick={giveUp}
                  className="flex-1 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 text-sm md:text-base"
                >
                  Бууж өгөх
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className={`p-3 md:p-4 rounded-lg ${
                isCorrect ? 'bg-green-100' : 'bg-red-100'
              }`}>
                <h3 className="font-medium mb-2 text-center text-sm md:text-base">
                  {isCorrect ? 'Зөв байна! 🎵' : 'Буруу байна! Уу! 🍻'}
                </h3>
                
                <div className="p-3 bg-white rounded border-l-4 border-purple-500">
                  <p className="text-xs md:text-sm text-gray-500 mb-1">Зөв хариулт:</p>
                  <p className="text-base md:text-lg font-medium">"{currentSong.lyricsContinue}"</p>
                </div>
                
                {!isCorrect && (
                  <div className="mt-4 p-2 bg-white rounded text-center">
                    <p className="font-medium text-red-600 text-sm md:text-base">Ууж шийтгэ!</p>
                    <p className="text-sm md:text-base">{players[playerIndex]} нэг удаа архи ууна! 🍻</p>
                  </div>
                )}
              </div>
              
              <button 
                onClick={nextTurn}
                className="w-full py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 text-sm md:text-base"
              >
                Дараагийн тоглогч
              </button>
            </div>
          )}
          
          <div className="mt-4 border-t pt-4">
            <h3 className="font-medium mb-2 text-sm md:text-base">Тоглогчид:</h3>
            <div className="flex flex-wrap gap-2">
              {players.map((player, index) => (
                <div 
                  key={index} 
                  className={`px-2 md:px-3 py-1 rounded-full text-xs md:text-sm ${
                    index === playerIndex ? 'bg-blue-500 text-white' : 'bg-gray-200'
                  }`}
                >
                  {player}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      
      <div className="mt-6 md:mt-8 text-xs md:text-sm text-gray-500 border-t pt-4">
        <h3 className="font-medium mb-1">Тоглоомын дүрэм:</h3>
        <ol className="list-decimal pl-5 space-y-1">
          <li>Тоглоом эхлэхийн тулд тоглогчдын нэрийг нэмнэ.</li>
          <li>Тоглогч бүр Монгол дууны үгийг үргэлжлүүлэх ээлжтэй.</li>
          <li>Тоглоомонд дууны эхлэл харагдах бөгөөд тоглогч дараагийн үгийг бичих ёстой.</li>
          <li>Хэрэв тоглогч дууны үгийг зөв үргэлжлүүлбэл, тэр аюулгүй!</li>
          <li>Хэрэв тоглогч буруу хариулсан эсвэл бууж өгвөл архи уух ёстой!</li>
          <li>Бүх дуу дуустал эсвэл тоглоомыг зогсоохоор шийдтэл тоглоом үргэлжилнэ.</li>
        </ol>
      </div>
    </div>
  );
};

export default MongolianLyricsGame;