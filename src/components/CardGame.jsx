// src/components/CardGame.jsx
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FaTimes } from 'react-icons/fa'
import '../styles/CardGame.css' // Import the flip CSS

// Example prompts
const initialCards = [
  { id: 1,  text: "Чи нэг тоглогчийг сонгож, гэрлэнэ. 2 үеийн туршид та хоёрын аль нэг нь уух тохиолдолд хамт УУНА. Гэрлэсэн хоёрт баяр хүргэж бусад нь УУНА." },
  { id: 2,  text: "Чи тоглоом дуустал дараагийн хүнтэй цамцаа сольж өмсөнө. Хэрэв зөвшөөрөхгүй бол хамт УУНА." },
  { id: 3,  text: "Гурав хүртэл тоолоод хамгийн сүүлд хуруугаа хамартаа хүргэсэн хүн УУНА." },
  { id: 4,  text: "Нэг хувцасаа тайл эсвэл УУ!." },
  { id: 5,  text: "Бүгд нүдээ аниад гурав тоолоод зэрэг нээнэ. Хамгийн түрүүлж харц тулгарсан хоёр оролцогч УУНА." },
  { id: 6,  text: "Энэ дундаас хамгийн таалагдаж буй хүнээ нэрлэ. Эсвэл УУ!" },
  { id: 7,  text: "Чи ямар ч шалтгаангүй УУНА!" },
  { id: 8,  text: "Энэ бол аврагдах эрх. Чи үүнийг хэзээ ч ашиглаж болно. (Уултнаас өнжих эрх зөвхөн ганц удаа)" },
  { id: 9,  text: "Өгзөгөөрөө НАЙМЫН ТОО зурах. Эсэргүйцвэл УУНА!" },
  { id: 10, text: "Дараагийн ээлж иртэл Баруун талдаа сууж буй тоглогчтойгоо хөтлөлцөнө. Эсэргүйцсэн тохилдолд тоглогчид хоёул УУНА." },
  { id: 11, text: "ЭКС рүүгээ Би чамайг санаж байна гэж чат бичих, Эсвэл УУХ!" },
  { id: 12, text: "Чамаас бусад тоглогчид бүгд УУНА." },
  { id: 13, text: "Хамгийн дуртай 3 байрлалаа үзүүл, эсвэл УУ!" },
  { id: 14, text: "Хамгийн түрүүлж ариун цэвэрийн өрөө орсон хүн УУНА." },
  { id: 15, text: "Twerk хий эсвэл УУ! (10 секунд)" },
  { id: 16, text: "Нэг тоглогч сонгож, Хайч, Чулуу, Даавуу тоглоно. Хожигдсон тоглогч УУНА!" },
  { id: 17, text: "Бусад тоглогчид чиний хамтрагчийг сонгоно. Та хоёр бол киноны гол дүр ба 5 секунд ҮНСЭЛЦЭНЭ. Эсэргүйцсэн тоглогч УУНА."},
  { id: 18, text: "Хамт тоглож буй хүмүүсээс хамгийн царайлаг болон хөөрхөн тоглогчдыг нэрлэж ямарч шалтгаангүй УУЛГА." },
  { id: 19, text: "Дотно харилцаанд орохдоо гаргадаг царайгаа бусад тоглогчдод харуулах эсвэл УУХ." },
  { id: 20, text: "Хамгийн их bodycount тай тоглогч УУНА." },
  { id: 21, text: "15 секунд шалны модтой секси бүжиг хийх эсвэл УУХ." },
  { id: 22, text: "Сүүлийн 7 хоног порно кино үзсэн тоглогчид УУ." },
  { id: 23, text: "Хэн нэгний аманд амаараа жимс хийж өгөх эсвэл УУХ." },
  { id: 24, text: "Таны сонгосон хүн таны утаснаас нэг зураг сонгоод стори хийх эсвэл УУХ." },
  { id: 25, text: "Хостой тоглогчид УУ." },
  { id: 26, text: "Тамхи татдаг тоглогчид УУ." },
  { id: 27, text: "Дотно харилцаанд орж байх үедээ бичлэг хийж байсан уу?" },
  { id: 28, text: "Ижил хүйснийхээ хүнтэй үнсэлцэж байсан уу?" },
  { id: 29, text: "Тик Ток хэрэглэгчид УУ." },
  { id: 30, text: "Инстаграм дээр хамгийн их дагагчтай тоглогч УУ." },
  { id: 31, text: "Бенз өмссөн тоглогчид УУ." },
  { id: 32, text: "Сайн хүнийхээ анхаарлыг татахын тулд хийж байсан хамгийн тэнэг үйлдэл?" },
  { id: 33, text: "Та с*ксээс болж хэн нэгэнтэй харилцаагаа тасалж байсан уу?" },
  { id: 34, text: "Ганц бие тоглогчид УУ." },
  { id: 35, text: "10-аас дээш хүнтэй унтсан тоглогчид УУ." },
  { id: 36, text: "Хамгийн бага гар утасны цэнэгтэй тоглогчид тоглогч УУ." },
  { id: 37, text: "Хүзүүгээ боолгох эсвэл өгзөгрүүгээ алгадуулах." },
  { id: 38, text: "Тоглогчид дундаас нэг хүнийг үнсэх эсвэл УУХ." },
  { id: 39, text: "Шивээстэй тоглогчид УУ." },
  { id: 40, text: "Tinder хэрэглэгчид УУ." },
  { id: 41, text: "Дуу тавиад 20 секунд секси бүжиг бүжиглэх эсвэл УУХ." },
  { id: 42, text: "Хэн нэгэнтэй анхны болзоо дээрээ дотно харилцаанд орж байсан бол УУНА УУ." },
  { id: 43, text: "Та хамгийн сүүлд Google-ээс юу хайсан бэ?" },
  { id: 44, text: "Яг одоо бэлгэвчтэй тоглогчид УУ." },
  { id: 45, text: "Та хамгийн сүүлд хэзээ секс хийсэн бэ?" },
  { id: 46, text: "Тайчих баараар үйлчлүүлж байсан тоглогчид УУНА." },
  { id: 47, text: "Санамсаргүй буруу хүнд нүцгэн зураг илгээж байсан уу?" },
  { id: 48, text: "Хамгийн том мөөмтэй тоглогч УУ." },
  { id: 49, text: "Тоглогчид дундаас секс хиймээр байгаа хүнээ нэрлэ эсвэл УУ." },
  { id: 50, text: "Зүүн талд байгаа хүнээ үнс эсвэл УУ." },
  { id: 51, text: "Сараас илүү хугацаанд секс хийгээгүй тоглогч УУ!" },
  { id: 52, text: "Чи өнөөдөр хамгийн хөөрхөн харагдаж байна. Үүнийг тэмдэглээд УУ." },
  { id: 53, text: "Нэг тоглогч сонгож өвөр дээр нь 10 секунд бүжиглэх эсвэл УУХ. (Эсрэг хүйстэн)" },
  { id: 54, text: "Зүүн гар тийш 10 тоолно. Таарсан тоглогч УУНА." },
  { id: 55, text: "Өнөөдөр бол чиний ганцаарчилсан тоглолт. Дуртай дууныхаа нэг бадагийг бусад тоглогчдод дуулж өгнө. ЭСВЭЛ..." },
  { id: 56, text: "Ичгүүртэй зураг авч, өөрийн инстаграм стори дээр нийтлэх, эсвэл гурван удаа УУХ." },
  { id: 57, text: "Тоглогчид дундаас нэг хүн сонгож асуулт асуу. Хэрэв сонгосон хүн чинь хариулсан тохиолдолд чи УУНА, үгүй бол хариулаагүй тоглогч УУНА." },
  { id: 58, text: "Дасгал хөдөлгөөн хэзээд чухал шүү. 15 удаа squat суух." },
  { id: 59, text: "Эцэг, эхээсээ нуудаг хамгийн том нууц чинь юу вэ?" },
  { id: 60, text: "Тоглогчид дундаас нэг тоглогч сонгож дотуур өмднийх нь өнгийг таана. Таагаагүй бол УУНА." },
  { id: 61, text: "Instagram search дээрх хамгийн эхний хүнээ бусад тоглогчдод харуулах ба, яг одоо залгах." },
  { id: 62, text: "Хэрэв чи бусад тоглогчдыг инээлгэж чадвал энэ хөзөр чиний аврагдах хөзөр болж хувирна. Чадаагүй тохиолдолд УУНА." },
  { id: 63, text: "ЭНЭ БОЛ ӨРШӨӨЛ!" },
  { id: 64, text: "Хамгийн сүүлд хэнтэй дотно харилцаанд орсноо хэл эсвэл УУ." },
  { id: 65, text: "Хамгийн муу үнсэлцдэг байж магадгүй гэж бодож буй тоглогчийг нэрлэ эсвэл УУ." },
  { id: 66, text: "Одоо байгаа тоглогчдоос нэг хүнийг сонгоод өвөр дээр нь суугаад селфи авах эсвэл УУНА." },
  { id: 67, text: "Өөрийнхөө биеийн хамгийн дуртай хэсгийг бусдад үзүүл эсвэл УУ." },
  { id: 68, text: "Тоглогчид дундаас хамгийн сайн үнсэлт өгч чадна гэж бодсон хүнээ сонгоод үнс эсвэл УУ." },
  { id: 69, text: "Нэг тоглогчийг сонгоод түүний нэг хүслийг биелүүлнэ. Үгүй бол та хоёул УУНА." },
  { id: 70, text: "Тоглогчдоос нэг хүний instagram постыг санамсаргүй сонгоод стори дээрээ шэйрлэ эсвэл УУ." },
  { id: 71, text: "Бусад тоглогчид чиний утаснаас хэн нэгэн рүү хүссэн мессежээ илгээнэ. Зөвшөөрөхгүй бол УУ." },
  { id: 72, text: "Сүүлийн долоо хоногт болзоонд явсан тоглогчид бүгд УУ." },
  { id: 73, text: "Өөрийн хамгийн сүүлд авч байсан ичгүүртэй зургаа бусдад харуул эсвэл УУНА." },
  { id: 74, text: "Хамгийн сүүлд авсан зургаа бусдад үзүүл эсвэл УУ.(Өөрийн зураг)" },
  { id: 75, text: "Нэг тоглогчийг сонгоод романтик байдлаар 10 секундийн турш ширт эсвэл УУ." }
]

function CardGame() {
  const [deck, setDeck] = useState([])
  const [currentCard, setCurrentCard] = useState(null)
  const [isFlipped, setIsFlipped] = useState(false)
  const [rulesOpen, setRulesOpen] = useState(false)

  // On mount, shuffle and set the deck
  useEffect(() => {
    resetDeck()
  }, [])

  // Shuffle & restore the deck
  const resetDeck = () => {
    const shuffled = [...initialCards].sort(() => Math.random() - 0.5)
    setDeck(shuffled)
    setCurrentCard(null)
    setIsFlipped(false)
  }

  // Handle a user click on the card
  const handleCardClick = () => {
    if (deck.length === 0) return // no cards left

    if (!isFlipped) {
      // Flip from front -> back: pick a random card from the deck
      const randomIndex = Math.floor(Math.random() * deck.length)
      const [drawn] = deck.splice(randomIndex, 1)
      setCurrentCard(drawn)
      setDeck([...deck])
      setIsFlipped(true)
    } else {
      // Flip from back -> front
      setIsFlipped(false)
    }
  }

  // Open the rules modal
  const openRules = () => {
    setRulesOpen(true)
  }

  // Close the rules modal
  const closeRules = () => {
    setRulesOpen(false)
  }

  return (
    // Full-screen container (no scroll)
    <div className="fixed inset-0 overflow-hidden bg-gray-100 select-none flex flex-col items-center justify-center p-4">
      
      {/* Modal Rules Pop-up */}
      <AnimatePresence>
        {rulesOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              transition={{ duration: 0.3 }}
              className="bg-gradient-to-br from-emerald-700/80 to-teal-900/80 backdrop-blur-xl p-8 rounded-3xl shadow-lg max-w-md w-full border border-emerald-500/20 relative mx-4"
            >
              <button
                onClick={closeRules}
                className="absolute top-2 right-2 text-gray-200 hover:text-gray-100"
              >
                <FaTimes size={24} />
              </button>
              <h2 className="text-2xl font-bold mb-4 text-center text-white">Дүрэм</h2>
              <ul className="list-decimal list-inside text-white space-y-2">
              <li>Хөзрөн дээр дарж, зааврыг чангаар уншина.</li>
              <li>Хөзрөн дээр гарч буй асуулт эсвэл даалгаврыг биелүүлэх ба татгалзсан тоглогч УУНА.</li>
              <li>Хөзөр дууссан үед “Хөзөр холих” товчийг дарж тоглоомыг дахин эхлүүлнэ.</li>
              <li>Энэ тоглоом нь зөвхөн насанд хүрэгсдэд зориулагдсан.</li>
              <li>Хүн бүр бусдын эрхийг хүндэтгэж, хүсээгүй зүйл хийхэд хүчлэхгүй.</li>
              <li>Бүх хэрэглэгчид тоглоомын зохицуулалтыг ойлгож, үүнийг хүлээн зөвшөөрнө.</li>
              <li>Хэрэв ямар нэг хэрэглэгч зохихгүй үйлдэл гаргавал тоглоомыг дуусгах эсвэл шаардлагатай арга хэмжээ авах эрхтэй.</li>
              <li>Энэхүү тоглоом нь зохиогчийн эрхээр хамгаалагдсан болно.</li>
              <li>Have Fun 😊</li>
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Container for the flip animation */}
      <div className="card-container mb-6" onClick={handleCardClick}>
        <div className={`card ${isFlipped ? 'is-flipped' : ''}`}>
          {/* Front Face */}
          <div className="card-face card-face-front">
            {deck.length === 0 ? (
              <div className="flex flex-col items-center justify-center w-full h-full px-4">
                <p className="text-xl text-center font-semibold mb-2">
                  Хөзөр дууссан
                </p>
                <p className="text-sm text-center">
                  Хөзрөө холиод дахин үргэлжлүүл!
                </p>
              </div>
            ) : (
              <>
                <div className="text-area border-front px-3 py-2">
                  <div className="card-design">
                    <div className="card-center-icon"></div>
                  </div>
                  <p className="text-center text-white font-semibold absolute inset-x-0 bottom-10">
                    Хөзрөн дээр дар!
                  </p>
                </div>
              </>
            )}
          </div>

          {/* Back Face */}
          <div className="card-face card-face-back">
            {currentCard ? (
              <div className="text-area border-front px-3 py-2">
                <p className="text-lg text-center font-semibold relative z-10">
                  {currentCard.text}
                </p>
              </div>
            ) : (
              <div className="text-area border-front px-3 py-2">
                <p className="text-lg text-center font-semibold relative z-10">
                  (No card drawn yet)
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add card progress indicator */}
      <div className="w-64 bg-gray-200 rounded-full h-2.5 mb-4 dark:bg-gray-700 overflow-hidden">
        <div className="bg-blue-600 h-2.5 rounded-full" style={{ 
          width: `${((initialCards.length - deck.length) / initialCards.length) * 100}%`,
          transition: 'width 0.5s ease-in-out' 
        }}></div>
      </div>

      {/* Deck count, Reset, Back & Rules buttons */}
      <div className="flex flex-col items-center space-y-4">
        <p className="text-lg">Үлдсэн хөзөр: {deck.length}</p>
        <button
          onClick={resetDeck}
          className="px-5 py-2 bg-gray-700 text-white rounded hover:bg-gray-800"
        >
          Хөзөр холих 
        </button>
        {/* Inline Back and Rules buttons */}
        <div className="flex flex-row items-center space-x-4">
          <Link
            to="/"
            className="px-4 py-2 bg-red-400 text-white rounded hover:bg-gray-800"
          >
            Буцах
          </Link>
          <button
            onClick={openRules}
            className="px-5 py-2 bg-blue-400 text-white rounded hover:bg-blue-600"
          >
            Дүрэм
          </button>
        </div>
      </div>
    </div>
  )
}

export default CardGame