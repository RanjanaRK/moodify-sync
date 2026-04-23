// // import WavesurferPlayer from "@wavesurfer/react";
// // import { useState } from "react";
// // import type WaveSurfer from "wavesurfer.js";
// // import { Button } from "../../../components/ui/button";

// // const SongPlayer = () => {
// //   const [wavesurfer, setWavesurfer] = useState<WaveSurfer | null>(null);
// //   const [isPlaying, setIsPlaying] = useState(false);

// //   const onReady = (ws: any) => {
// //     setWavesurfer(ws);
// //     setIsPlaying(false);
// //   };

// //   const onPlayPause = () => {
// //     wavesurfer && wavesurfer.playPause();
// //   };
// //   return (
// //     <>
// //       <WavesurferPlayer
// //         height={100}
// //         waveColor="violet"
// //         url="/my-server/audio.wav"
// //         onReady={onReady}
// //         onPlay={() => setIsPlaying(true)}
// //         onPause={() => setIsPlaying(false)}
// //       />

// //       <Button onClick={onPlayPause}>{isPlaying ? "Pause" : "Play"}</Button>
// //     </>
// //   );
// // };

// // export default SongPlayer;

import { useEffect, useRef, useState } from "react";
import { useSong } from "../hooks/useSong";

type PlayerProps = {
  mood: string | null;
};

const MusicBackground = ({ mood }: PlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const { data: song } = useSong(mood ?? "");

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!song) return;

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.load();
      setIsPlaying(false);
    }
  }, [song]);

  const togglePlay = async () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
      } catch (err) {
        console.log("Play blocked or failed:", err);
      }
    }
  };

  console.log(mood);

  if (!song) return null;

  return (
    <>
      {/* 🌈 Animated Gradient Background */}

      {/* ✨ Floating blobs */}

      {/* 🎧 Main Glass Card */}
      <div className="relative z-10 w-[360px] p-6 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl">
        {/* Album Art */}

        <img
          src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4"
          className="w-full h-48 rounded-2xl  shadow-lg"
        />

        {/* Song Info */}
        <div className="mt-5 text-center">
          <h2 className="text-xl font-semibold">{song.mood}</h2>
          <p className="text-sm text-gray-300">
            Generated based on your expression
          </p>
        </div>

        {/* Waveform Placeholder */}
        <div className="mt-6 h-12 flex items-end justify-center gap-1">
          {Array.from({ length: 25 }).map((_, i) => (
            <div
              key={i}
              className={`w-1 rounded-full bg-white/70 ${
                isPlaying ? "animate-pulse" : ""
              }`}
              style={{
                height: `${Math.random() * 40 + 10}px`,
                animationDelay: `${i * 0.05}s`,
              }}
            />
          ))}
        </div>

        {/* Controls */}
        <div className="mt-6 flex items-center justify-center gap-4">
          {/* <button className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 transition">
            ⏮
          </button> */}
          {/* <audio controls src={song.url} /> */}
          {/* <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="px-6 py-3 rounded-full bg-white text-black font-semibold shadow-lg hover:scale-105 transition"
          >
            {isPlaying ? "Pause" : "Play"}
          </button> */}

          {/* <button className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 transition">
            ⏭
          </button> */}

          <div className="px-6 pb-6">
            {/* Song Info */}

            {/* Controls */}
            <div className="flex items-center gap-3">
              {/* <button className="px-2">⏮</button>
                <button
                  onClick={togglePlay}
                  className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center text-white"
                >
                  {isPlaying ? "⏸" : "▶"}
                </button>
                <button className="px-2">⏭</button> */}
              <audio controls src={song.url} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MusicBackground;

// import { useState } from "react";

// const MusicUI = () => {
//   const [playing, setPlaying] = useState(true);

//   return (
//     <div className="min-h-screen bg-[#0b0b0f] text-white flex flex-col">
//       {/* 🔥 Top Bar */}
//       <div className="flex items-center justify-between px-6 py-4">
//         <h1 className="text-2xl font-bold text-red-500">Moodify</h1>

//         <div className="flex items-center gap-4">
//           <button className="w-10 h-10 rounded-full bg-red-500/20">⬆</button>
//           <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center">
//             S
//           </div>
//         </div>
//       </div>

//       {/* 🎵 Main Player Area */}
//       <div className="flex-1 flex items-center justify-center px-6">
//         {/* Album / Visualizer */}
//         <div className="w-[420px] h-[320px] rounded-2xl bg-black/60 border border-white/10 shadow-2xl flex items-center justify-center relative overflow-hidden">
//           {/* fake noise background */}
//           <div className="absolute inset-0 bg-gradient-to-br from-red-900/30 via-black to-black" />

//           {/* waveform bars */}
//           <div className="flex items-end gap-1 z-10">
//             {Array.from({ length: 40 }).map((_, i) => (
//               <div
//                 key={i}
//                 className="w-1 bg-red-500 rounded-full animate-pulse"
//                 style={{
//                   height: `${Math.random() * 80 + 20}px`,
//                   animationDelay: `${i * 0.03}s`,
//                 }}
//               />
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* 🎧 Bottom Player */}
//       <div className="px-6 pb-6">
//         <div className="bg-[#111] border border-white/10 rounded-2xl p-4 flex items-center justify-between shadow-lg">
//           {/* Song Info */}
//           <div className="flex items-center gap-3">
//             <img
//               src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4"
//               className="w-12 h-12 rounded-md object-cover"
//             />
//             <div>
//               <h3 className="font-semibold">Marco Teaser Theme</h3>
//               <p className="text-xs text-red-400">Angry Mood</p>
//             </div>
//           </div>

//           {/* Controls */}
//           <div className="flex items-center gap-3">
//             <button className="px-2">⏮</button>
//             <button
//               onClick={() => setPlaying(!playing)}
//               className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center text-white"
//             >
//               {playing ? "⏸" : "▶"}
//             </button>
//             <button className="px-2">⏭</button>
//           </div>

//           {/* Progress */}
//           <div className="hidden md:flex items-center gap-2 w-[200px]">
//             <span className="text-xs">0:14</span>
//             <div className="flex-1 h-1 bg-gray-700 rounded">
//               <div className="w-1/3 h-full bg-red-500 rounded" />
//             </div>
//             <span className="text-xs">1:12</span>
//           </div>
//         </div>
//       </div>

//       {/* 🔴 Detect Mood Button */}
//       <div className="flex justify-center pb-6">
//         <button className="bg-red-600 hover:bg-red-700 transition px-6 py-2 rounded-full font-semibold shadow-lg">
//           Detect Mood
//         </button>
//       </div>
//     </div>
//   );
// };

// export default MusicUI;
