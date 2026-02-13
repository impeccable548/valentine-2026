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

const ValentineApp = () => {
  const [step, setStep] = useState('landing'); // landing, rizz, question, celebration
  const [rizzIndex, setRizzIndex] = useState(0);
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
  const [noCount, setNoCount] = useState(0);
  const [yesScale, setYesScale] = useState(1);

  const rizzLines = [
    { text: "Are you a camera? Because every time I look at you, I smile.", icon: "📸" },
    { text: "I’m learning about important dates in history. Want to be one of them?", icon: "📖" },
    { text: "Do you have a map? I keep getting lost in your eyes.", icon: "🗺️" },
    { text: "If I were a cat, I'd spend all 9 lives with you.", icon: "🐾" },
    { text: "Aside from being gorgeous, what do you do for a living?", icon: "✨" },
    { text: "You must be made of Copper and Tellurium... because you're CuTe.", icon: "🧪" }
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
      particleCount: 200,
      spread: 100,
      origin: { y: 0.6 },
      colors: ['#ff69b4', '#ff1493', '#ffffff', '#fb7185']
    });
  };

  const moveNoButton = () => {
    const x = Math.random() * 250 - 125;
    const y = Math.random() * 250 - 125;
    setNoButtonPos({ x, y });
    setNoCount(prev => prev + 1);
    setYesScale(prev => prev + 0.2);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fff1f2] via-[#ffe4e6] to-[#fecdd3] flex items-center justify-center p-4 font-modern overflow-hidden relative">
      <FloatingHearts />

      <AnimatePresence mode="wait">
        
        {/* 1. LANDING */}
        {step === 'landing' && (
          <motion.div 
            key="landing"
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, y: -50 }}
            className="z-10 text-center glass-card p-12 rounded-[3rem]"
          >
            <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="text-6xl mb-6">💌</motion.div>
            <h1 className="text-5xl font-romantic text-rose-600 mb-6 font-bold">Hey, I have a confession...</h1>
            <button 
              onClick={() => setStep('rizz')}
              className="bg-rose-500 hover:bg-rose-600 text-white px-10 py-4 rounded-full transition-all shadow-lg hover:scale-110 text-lg font-semibold"
            >
              What is it? 
            </button>
          </motion.div>
        )}

        {/* 2. THE RIZZ GALLERY (NEW STEP) */}
        {step === 'rizz' && (
          <motion.div 
            key="rizz"
            initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -100 }}
            className="z-10 text-center max-w-sm w-full glass-card p-10 rounded-3xl border-b-8 border-rose-400"
          >
            <div className="mb-4 text-xs font-bold uppercase tracking-widest text-rose-400">
              Rizz Level: {Math.round(((rizzIndex + 1) / rizzLines.length) * 100)}%
            </div>
            <div className="w-full bg-rose-100 h-2 rounded-full mb-8">
                <motion.div 
                    initial={{ width: 0 }} 
                    animate={{ width: `${((rizzIndex + 1) / rizzLines.length) * 100}%` }}
                    className="bg-rose-500 h-full rounded-full"
                />
            </div>
            
            <AnimatePresence mode="wait">
              <motion.div
                key={rizzIndex}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="min-h-[150px] flex flex-col justify-center"
              >
                <div className="text-5xl mb-4">{rizzLines[rizzIndex].icon}</div>
                <p className="text-2xl font-romantic text-rose-900 leading-tight">
                  "{rizzLines[rizzIndex].text}"
                </p>
              </motion.div>
            </AnimatePresence>

            <button 
              onClick={handleNextRizz}
              className="mt-8 bg-white border-2 border-rose-500 text-rose-500 hover:bg-rose-50 px-8 py-2 rounded-full font-bold transition-all"
            >
              {rizzIndex === rizzLines.length - 1 ? "Wait, there's more..." : "Go on..."}
            </button>
          </motion.div>
        )}

        {/* 3. THE BIG QUESTION */}
        {step === 'question' && (
          <motion.div 
            key="question"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="z-10 text-center flex flex-col items-center"
          >
            <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 1.5 }} className="text-8xl mb-8">💍</motion.div>
            <h2 className="text-6xl font-romantic text-rose-600 mb-12">So... Will you be my Valentine?</h2>
            
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 min-h-[150px]">
              <motion.button 
                onClick={handleYes}
                style={{ scale: yesScale }}
                className="bg-rose-500 text-white px-14 py-5 rounded-2xl font-bold shadow-xl z-50 text-2xl"
              >
                YES! 💖
              </motion.button>
              
              <motion.button 
                onMouseEnter={moveNoButton}
                onClick={moveNoButton}
                animate={{ x: noButtonPos.x, y: noButtonPos.y }}
                className="bg-white/80 text-gray-500 px-8 py-4 rounded-2xl text-lg shadow-md border border-white"
              >
                {noCount > 5 ? "Fine, I give up" : "No"}
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* 4. CELEBRATION */}
        {step === 'celebration' && (
          <motion.div 
            key="celebration"
            initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }}
            className="z-10 text-center glass-card p-16 rounded-[4rem] border-4 border-white"
          >
            <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1 }} className="text-9xl mb-8">💝</motion.div>
            <h2 className="text-5xl font-romantic text-rose-600 mb-2">Maximum Rizz Achieved!</h2>
            <p className="text-gray-600 text-xl mb-10">See you on the 14th, Valentine.</p>
            <button 
              onClick={downloadCalendarInvite}
              className="bg-rose-500 hover:bg-rose-600 text-white px-8 py-4 rounded-full font-bold transition-all flex items-center gap-3 mx-auto shadow-lg"
            >
              📅 Save our Date
            </button>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
};

export default ValentineApp;
