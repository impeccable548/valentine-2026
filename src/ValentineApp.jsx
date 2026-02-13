import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { downloadCalendarInvite } from './utils/calendar';

// 1. Floating Hearts Background Component
const FloatingHearts = () => {
  const [hearts, setHearts] = useState([]);
  useEffect(() => {
    const interval = setInterval(() => {
      setHearts((prev) => [...prev, { id: Date.now(), x: Math.random() * 100 }]);
      if (prev => prev.length > 20) prev.shift();
    }, 600);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <AnimatePresence>
        {hearts.map((heart) => (
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
  const [step, setStep] = useState('landing'); 
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
  const [noCount, setNoCount] = useState(0);
  const [yesScale, setYesScale] = useState(1);
  const [reasonIndex, setReasonIndex] = useState(0);

  const reasons = [
    "You're the best!",
    "My favorite person ✨",
    "You're beautiful!",
    "I'll be so sad... 🥺",
    "Think of the memories!",
    "I'll buy you snacks! 🍟"
  ];

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
    setYesScale(prev => prev + 0.25); // Make Yes bigger every time
    setReasonIndex(prev => (prev + 1) % reasons.length);
  };

  const phrases = ["No", "Rude.", "Wait...", "Look left!", "Try again!", "You can't catch me! 💨"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fff1f2] via-[#ffe4e6] to-[#fecdd3] flex items-center justify-center p-4 font-modern overflow-hidden relative">
      <FloatingHearts />

      <AnimatePresence mode="wait">
        
        {/* LANDING SCREEN */}
        {step === 'landing' && (
          <motion.div 
            key="landing"
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, y: -50 }}
            className="z-10 text-center glass-card p-12 rounded-[3rem]"
          >
            <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="text-6xl mb-6">💌</motion.div>
            <h1 className="text-5xl font-romantic text-rose-600 mb-6 font-bold">A Message for You</h1>
            <p className="text-gray-600 mb-8 text-xl max-w-xs mx-auto">I've been waiting for the right moment to ask...</p>
            <button 
              onClick={() => setStep('message')}
              className="bg-rose-500 hover:bg-rose-600 text-white px-10 py-4 rounded-full transition-all shadow-[0_10px_20px_rgba(244,63,94,0.3)] hover:scale-110 active:scale-95 text-lg font-semibold"
            >
              Open Letter
            </button>
          </motion.div>
        )}

        {/* MESSAGE SECTION */}
        {step === 'message' && (
          <motion.div 
            key="message"
            initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.5 }}
            className="z-10 text-center max-w-md bg-white p-10 rounded-2xl shadow-2xl border-t-[12px] border-rose-400"
          >
            <p className="text-3xl font-romantic text-rose-900 leading-relaxed mb-8">
              "In a world full of people, my eyes always look for you."
            </p>
            <button 
              onClick={() => setStep('question')}
              className="text-rose-500 font-bold hover:tracking-widest transition-all duration-300 uppercase text-sm tracking-widest"
            >
              Next Page →
            </button>
          </motion.div>
        )}

        {/* THE BIG QUESTION */}
        {step === 'question' && (
          <motion.div 
            key="question"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="z-10 text-center flex flex-col items-center"
          >
            <motion.div 
               animate={{ y: [0, -10, 0] }} 
               transition={{ repeat: Infinity, duration: 1.5 }}
               className="text-8xl mb-8"
            >
              💍
            </motion.div>
            <h2 className="text-6xl font-romantic text-rose-600 mb-4 drop-shadow-sm">Will you be my Valentine?</h2>
            
            {/* Dynamic reason text that appears as they try to click NO */}
            <p className="text-rose-400 italic h-6 mb-12 transition-all">{noCount > 0 ? reasons[reasonIndex] : ""}</p>

            <div className="flex flex-col md:flex-row items-center justify-center gap-8 min-h-[150px]">
              <motion.button 
                onClick={handleYes}
                style={{ scale: yesScale }}
                whileHover={{ scale: yesScale + 0.1 }}
                whileTap={{ scale: yesScale - 0.1 }}
                className="bg-rose-500 text-white px-14 py-5 rounded-2xl font-bold shadow-[0_15px_30px_rgba(244,63,94,0.4)] z-50 text-2xl relative"
              >
                YES! 💖
              </motion.button>
              
              <motion.button 
                onMouseEnter={moveNoButton}
                onClick={moveNoButton}
                animate={{ x: noButtonPos.x, y: noButtonPos.y }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="bg-white/80 text-gray-500 px-8 py-4 rounded-2xl text-lg shadow-md border border-white backdrop-blur-sm"
              >
                {phrases[Math.min(noCount, phrases.length - 1)]}
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* CELEBRATION */}
        {step === 'celebration' && (
          <motion.div 
            key="celebration"
            initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }}
            className="z-10 text-center glass-card p-16 rounded-[4rem] border-4 border-white"
          >
            <motion.div 
               initial={{ scale: 0 }} animate={{ scale: [1, 1.3, 1] }} 
               transition={{ repeat: Infinity, duration: 1 }}
               className="text-9xl mb-8"
            >
              💝
            </motion.div>
            <h2 className="text-5xl font-romantic text-rose-600 mb-2">It's a Date!</h2>
            <p className="text-gray-600 text-xl mb-10">You've made me the happiest person in 2026!</p>
            
            <button 
              onClick={downloadCalendarInvite}
              className="bg-rose-500 hover:bg-rose-600 text-white px-8 py-4 rounded-full font-bold transition-all flex items-center gap-3 mx-auto shadow-lg shadow-rose-200"
            >
              📅 Add to Calendar
            </button>
          </motion.div>
        )}

      </AnimatePresence>

      <footer className="fixed bottom-6 text-rose-400 font-medium tracking-widest text-xs uppercase opacity-70">
        Design by Impeccable Reform • 2026
      </footer>
    </div>
  );
};

export default ValentineApp;
