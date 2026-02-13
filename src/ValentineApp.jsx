import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { downloadCalendarInvite } from './utils/calendar';

const ValentineApp = () => {
  const [step, setStep] = useState('landing'); 
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
  const [noCount, setNoCount] = useState(0);

  const handleYes = () => {
    setStep('celebration');
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ff69b4', '#ff1493', '#ffffff']
    });
  };

  const moveNoButton = () => {
    const x = Math.random() * 200 - 100;
    const y = Math.random() * 200 - 100;
    setNoButtonPos({ x, y });
    setNoCount(prev => prev + 1);
  };

  const phrases = ["No", "Are you sure?", "Really sure??", "Think again!", "Last chance!", "💔"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-rose-200 to-red-100 flex items-center justify-center p-4 font-modern">
      <AnimatePresence mode="wait">
        
        {step === 'landing' && (
          <motion.div 
            key="landing"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="text-center bg-white/40 backdrop-blur-md p-10 rounded-3xl shadow-2xl border border-white/50"
          >
            <h1 className="text-5xl font-romantic text-rose-600 mb-6">Hey there...</h1>
            <p className="text-gray-700 mb-8 text-lg">I have something important to ask you.</p>
            <button 
              onClick={() => setStep('message')}
              className="bg-rose-500 hover:bg-rose-600 text-white px-8 py-3 rounded-full transition-all shadow-lg hover:scale-105"
            >
              Open Message ✉️
            </button>
          </motion.div>
        )}

        {step === 'message' && (
          <motion.div 
            key="message"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="text-center"
          >
            <motion.p 
              initial={{ width: 0 }} animate={{ width: "100%" }}
              className="text-2xl font-medium text-rose-800 overflow-hidden whitespace-nowrap border-r-2 border-rose-500 mx-auto max-w-fit px-2"
            >
              Every moment with you is magic.
            </motion.p>
            <button 
              onClick={() => setStep('question')}
              className="mt-12 text-rose-500 underline decoration-rose-300 underline-offset-8"
            >
              Click to continue
            </button>
          </motion.div>
        )}

        {step === 'question' && (
          <motion.div 
            key="question"
            initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            className="text-center"
          >
            <h2 className="text-5xl font-romantic text-rose-600 mb-12 px-4">Will you be my Valentine?</h2>
            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              <button 
                onClick={handleYes}
                style={{ fontSize: `${1 + noCount * 0.1}rem` }} // Yes grows as No moves!
                className="bg-green-500 hover:bg-green-600 text-white px-12 py-4 rounded-2xl font-bold shadow-xl transition-all"
              >
                YES! 💘
              </button>
              
              <motion.button 
                onMouseEnter={moveNoButton}
                onClick={moveNoButton}
                animate={{ x: noButtonPos.x, y: noButtonPos.y }}
                className="bg-gray-400 text-white px-8 py-4 rounded-2xl text-lg shadow-md"
              >
                {phrases[Math.min(noCount, phrases.length - 1)]}
              </motion.button>
            </div>
          </motion.div>
        )}

        {step === 'celebration' && (
          <motion.div 
            key="celebration"
            initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }}
            className="text-center bg-white/60 backdrop-blur-lg p-12 rounded-[2rem] shadow-2xl border border-white"
          >
            <motion.h1 animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 2 }} className="text-7xl mb-6">💖</motion.h1>
            <h2 className="text-4xl font-romantic text-rose-600 mb-4">You just made 2026 legendary!</h2>
            <p className="text-gray-600 italic mb-8">"I knew you'd say yes."</p>
            <button 
              onClick={downloadCalendarInvite}
              className="bg-white text-rose-500 border-2 border-rose-500 hover:bg-rose-50 px-6 py-2 rounded-full font-medium transition-all flex items-center gap-2 mx-auto"
            >
              📅 Save the Date
            </button>
          </motion.div>
        )}

      </AnimatePresence>

      <footer className="fixed bottom-6 text-sm text-rose-400 font-light italic">
        © 2026 Built with love by Impeccable Reform
      </footer>
    </div>
  );
};

export default ValentineApp;
