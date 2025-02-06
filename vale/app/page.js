"use client"
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Confetti from 'react-confetti';

export default function Home() {
  const [showQuestion, setShowQuestion] = useState(false);
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
  const [typedText, setTypedText] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [showLetter, setShowLetter] = useState(true);
  const [showTitle, setShowTitle] = useState(true); // Track title visibility
  const messages = [
    "Hey Love,",
    "I just wanted to take a moment to tell you how much you mean to me...",
    "Every moment with you feels special, and I can't imagine a day without you.",
    "So there's just one thing left to ask..."
  ];
  
  useEffect(() => {
    let index = 0;
    let charIndex = 0;
    
    const typeNextChar = () => {
      if (index < messages.length) {
        if (charIndex < messages[index].length) {
          setTypedText(prev => prev + messages[index][charIndex]);
          charIndex++;
          setTimeout(typeNextChar, 50);
        } else {
          setTypedText(prev => prev + '\n');
          index++;
          charIndex = 0;
          setTimeout(typeNextChar, 500);
        }
      } else {
        setTimeout(() => setShowQuestion(true), 1000);
      }
    };
    
    typeNextChar();
  }, []);
  
  const moveNoButton = () => {
    const x = Math.random() * 200 - 100;
    const y = Math.random() * 200 - 100;
    setNoButtonPos({ x, y });
  };

  const handleYesClick = () => {
    setShowLetter(false); // Hide the letter
    setShowConfetti(true); // Show fireworks
    setShowMessage(true); // Show the thank you message
    setShowQuestion(false); // Hide the question and buttons
    setShowTitle(false); // Hide the title
    setTimeout(() => setShowConfetti(false), 5000);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-center p-6 text-white font-handwriting relative overflow-hidden">
      
      {/* Starry Night Background with Twinkling Stars */}
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-no-repeat bg-fixed z-0">
        <div className="twinkling-stars"></div>
      </div>

      {/* Title */}
      {showTitle && (
        <h1 className="text-4xl font-bold text-white z-10 text-shadow-md">
          A Special Message for You
        </h1>
      )}

      {/* Handwritten Letter */}
      {showLetter && (
        <div className="mt-6 w-4/5 max-w-lg relative z-10 bg-paper bg-no-repeat bg-contain bg-center p-6 rounded-lg shadow-lg overflow-hidden">
          <div className="overflow-auto h-64 scroll-style text-lg whitespace-pre-line p-6 bg-gray-900 opacity-90 text-white font-handwriting">
            {typedText}
          </div>
        </div>
      )}

      {/* Question and Buttons */}
      {showQuestion && (
        <div className="mt-10 z-10">
          <h2 className="text-xl font-bold text-white text-shadow-md">Will you be my Valentine? ❤️</h2>
          <div className="mt-4 flex gap-4">
            <button 
              className="px-6 py-3 bg-red-500 text-white rounded-lg text-lg hover:bg-red-700 transition duration-300 ease-in-out shadow-md"
              onClick={handleYesClick}
            >
              Yes
            </button>
            <motion.button
              className="px-6 py-3 bg-gray-500 text-black rounded-lg text-lg hover:bg-gray-700 transition duration-300 ease-in-out shadow-md"
              onMouseEnter={moveNoButton} // For desktop
              onClick={moveNoButton} // For mobile
              animate={{ x: noButtonPos.x, y: noButtonPos.y }}
              transition={{ type: 'spring', stiffness: 100 }}
            >
              No
            </motion.button>
          </div>
        </div>
      )}
      
      {/* Thank You Message */}
      {showMessage && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl font-bold text-white z-10">
          Thank you for making me the luckiest guy in the world! ❤️
        </div>
      )}

      {/* Confetti for Fireworks Effect */}
      {showConfetti && <Confetti />}
    </div>
  );
}
