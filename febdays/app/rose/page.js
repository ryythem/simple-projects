"use client";
import React, { useState, useEffect, useRef } from "react";
import { Heart, Pause, Play } from "lucide-react";

const RosePetal = ({ delay, left, opacity, scale }) => {
  const style = {
    animationDelay: `${delay}s`,
    left: `${left}%`,
    opacity,
    transform: `scale(${scale})`,
  };

  return (
    <div className="absolute animate-[fall_10s_linear_infinite]" style={style}>
      <div className="w-6 h-6 md:w-8 md:h-8 bg-red-400 rounded-full transform rotate-45 shadow-lg shadow-red-300" />
    </div>
  );
};

const RoseDayPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [petals, setPetals] = useState([]);
  const playerRef = useRef(null);

  useEffect(() => {
    setIsVisible(true);
    setPetals(
      [...Array(20)].map((_, i) => ({
        delay: i * 0.5,
        left: Math.random() * 100,
        opacity: Math.random() * 0.5 + 0.5,
        scale: Math.random() * 0.7 + 0.8,
      }))
    );
  }, []);

  const togglePlay = () => {
    if (playerRef.current) {
      const player = playerRef.current.contentWindow;
      if (isPlaying) {
        player.postMessage(
          '{"event":"command","func":"pauseVideo","args":[]}',
          "*"
        );
      } else {
        player.postMessage(
          '{"event":"command","func":"playVideo","args":[]}',
          "*"
        );
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-800 animate-[background_10s_infinite_alternate] text-white">
      {/* Rose petals animation */}
      {petals.map((petal, i) => (
        <RosePetal key={i} {...petal} />
      ))}

      {/* Embedded YouTube Player */}
      <iframe
        id="yt-player"
        ref={playerRef}
        width="0"
        height="0"
        src="https://www.youtube.com/embed/4yZ-mn0u8NE?enablejsapi=1&autoplay=1&mute=0"
        frameBorder="0"
        allow="autoplay; encrypted-media"
      ></iframe>

      {/* Play/Pause Button */}
      <button
        onClick={togglePlay}
        className="absolute top-5 right-5 p-3 bg-gray-700/50 rounded-full shadow-lg backdrop-blur-md text-white hover:bg-gray-600 transition"
      >
        {isPlaying ? <Pause size={24} /> : <Play size={24} />}
      </button>

      <div
        className={`text-center p-8 rounded-lg bg-gray-800/60 backdrop-blur-xl shadow-2xl transform transition-all duration-1000 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
      >
        <div className="mb-6 flex justify-center">
          <Heart className="text-red-500 w-20 h-20 animate-pulse drop-shadow-lg" />
        </div>

        <h1 className="text-5xl font-extrabold text-red-400 mb-6 drop-shadow-md">
          Happy Rose Day, My Love
        </h1>

        <div className="space-y-4 ">
          {/* <div className="flex justify-center">
            <audio controls className="mt-6 ">
              <source src="/voice-note.mp3" type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </div> */}
          <p className="text-lg text-gray-400 font-medium drop-shadow-md">
            Every rose in the world may wither, but my love for you will last
            forever.
          </p>

          <p className="text-2xl text-red-500 font-bold mt-6 drop-shadow-md">
            ❤️ With all my love ❤️
          </p>

          <p className="text-xl text-gray-400 mt-4 drop-shadow-md">
            - R
          </p>
        </div>
      </div>
    </div>
  );
};

export default RoseDayPage;
