import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { downloadCalendarInvite } from './utils/calendar';

const FloatingHearts = () => {
  const [hearts, setHearts] = useState([]);
  useEffect(() => {
    const interval = setInterval(() => {
      setHearts((prev) => [...prev, { id: Date.now(), x: Math.random() * 100 }]);
    }, 600);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <AnimatePresence>
        {hearts.slice(-15).map((heart) => (
          <motion.div
            key={heart.id}
            initial={{ y: '110vh', x: `${heart.x}vw`, opacity: 1, scale: 0 }}
            animate={{ y: '-10vh', opacity: 0, scale: 1.5, rotate: 360 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 6, ease: "linear" }}
            className="absolute text-rose-300/40 text-3xl"
          >
            ❤️
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

// ... (FloatingHearts component stays the same as before) ...

const ValentineApp = () => {
  const [step, setStep] = useState('landing');
  const [rizzIndex, setRizzIndex] = useState(0);
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
  const [noCount, setNoCount] = useState(0);
  const [yesScale, setYesScale] = useState(1);

  // New "Lovers Only" Rizz Lines
  const rizzLines = [
    { text: "Of all the things we've done in 2026, being yours is my favorite.", icon: "🔐" },
    { text: "I’d still choose you in every timeline. No questions asked.", icon: "🌌" },
    { text: "You’re still the best thing that ever happened to my notifications.", icon: "📱" },
    { text: "My heart still does that stupid jump when I see your name.", icon: "💓" },
    { text: "Ready to make this Valentine's Day another one for the books?", icon: "📚" }
  ];

  const handleNextRizz = () => {
    if (rizzIndex < rizzLines.length - 1) {
      setRizzIndex(prev => prev + 1);
    } else {
      setStep('question');
    }
  };

  const handleYes = () => {
    setStep('celebration');
    confetti({
      particleCount: 250,
      spread: 120,
      origin: { y: 0.6 },
      colors: ['#ff1493', '#ffffff', '#e11d48']
    });
  };

  const moveNoButton = () => {
    const x = Math.random() * 250 - 125;
    const y = Math.random() * 250 - 125;
    setNoButtonPos({ x, y });
    setNoCount(prev => prev + 1);
    setYesScale(prev => prev + 0.3); // "Yes" gets huge even faster now
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fff1f2] via-[#ffe4e6] to-[#fecdd3] flex items-center justify-center p-4 font-modern overflow-hidden relative">
      <FloatingHearts />

      <AnimatePresence mode="wait">
        
        {/* 1. THE REVEAL */}
        {step === 'landing' && (
          <motion.div 
            key="landing"
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            className="z-10 text-center glass-card p-12 rounded-[3rem] border-2 border-white/50"
          >
            <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 2 }} className="text-7xl mb-6">👩‍❤️‍👨</motion.div>
            <h1 className="text-5xl font-romantic text-rose-600 mb-6 font-bold">Hey Favorite Person...</h1>
            <p className="text-gray-600 mb-8 text-lg italic">I made something just for us.</p>
            <button 
              onClick={() => setStep('rizz')}
              className="bg-rose-500 hover:bg-rose-600 text-white px-10 py-4 rounded-full transition-all shadow-xl font-bold"
            >
              Check it out ❤️
            </button>
          </motion.div>
        )}

        {/* 2. THE MEMORY RIZZ */}
        {step === 'rizz' && (
          <motion.div 
            key="rizz"
            initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -100 }}
            className="z-10 text-center max-w-sm w-full glass-card p-10 rounded-3xl border-b-8 border-rose-500"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={rizzIndex}
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
                className="min-h-[160px] flex flex-col justify-center"
              >
                <div className="text-6xl mb-4">{rizzLines[rizzIndex].icon}</div>
                <p className="text-2xl font-romantic text-rose-900 leading-snug px-2">
                  {rizzLines[rizzIndex].text}
                </p>
              </motion.div>
            </AnimatePresence>

            <button 
              onClick={handleNextRizz}
              className="mt-10 bg-rose-500 text-white px-8 py-2 rounded-full font-bold shadow-md hover:bg-rose-600 transition-colors"
            >
              {rizzIndex === rizzLines.length - 1 ? "One more thing..." : "Next →"}
            </button>
          </motion.div>
        )}

        {/* 3. THE CONFIRMATION */}
        {step === 'question' && (
          <motion.div 
            key="question"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="z-10 text-center flex flex-col items-center"
          >
            <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity }} className="text-8xl mb-8">💖</motion.div>
            <h2 className="text-6xl font-romantic text-rose-600 mb-12">Will you be my Valentine (again)?</h2>
            
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 min-h-[180px]">
              <motion.button 
                onClick={handleYes}
                style={{ scale: yesScale }}
                className="bg-rose-500 text-white px-16 py-6 rounded-3xl font-bold shadow-[0_20px_40px_rgba(225,29,72,0.4)] z-50 text-3xl"
              >
                ALWAYS! 💍
              </motion.button>
              
              <motion.button 
                onMouseEnter={moveNoButton}
                onClick={moveNoButton}
                animate={{ x: noButtonPos.x, y: noButtonPos.y }}
                className="bg-white/40 text-gray-400 px-6 py-3 rounded-2xl text-sm border border-white/50 italic pointer-events-none md:pointer-events-auto"
              >
                {noCount > 3 ? "Error 404: Not possible" : "No (don't even try it)"}
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* 4. CELEBRATION */}
        {step === 'celebration' && (
          <motion.div 
            key="celebration"
            initial={{ opacity: 0, rotate: -10 }} animate={{ opacity: 1, rotate: 0 }}
            className="z-10 text-center glass-card p-16 rounded-[4rem] border-4 border-white shadow-2xl"
          >
            <h2 className="text-6xl font-romantic text-rose-600 mb-4 font-bold">Best Couple 2026! 🏆</h2>
            <p className="text-gray-600 text-xl mb-12 italic">Locked in forever. See you tomorrow, babe.</p>
            <button 
              onClick={downloadCalendarInvite}
              className="bg-gradient-to-r from-rose-500 to-red-500 text-white px-10 py-4 rounded-full font-bold shadow-xl flex items-center gap-3 mx-auto"
            >
              📅 Save the Date
            </button>
          </motion.div>
        )}

      </AnimatePresence>

      <footer className="fixed bottom-6 text-rose-400/80 font-medium tracking-[0.2em] text-[10px] uppercase">
        © 2026 Impeccable Reform • Only for You
      </footer>
    </div>
  );
};

export default ValentineApp;
