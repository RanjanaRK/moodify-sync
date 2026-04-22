// import React, { useRef, useState, useEffect } from "react";
// import { useSong } from "../hooks/useSong";

// const SPEED_OPTIONS = [0.5, 0.75, 1, 1.25, 1.5, 2];

// const formatTime = (seconds: number) => {
//   if (isNaN(seconds)) return "0:00";
//   const m = Math.floor(seconds / 60);
//   const s = Math.floor(seconds % 60)
//     .toString()
//     .padStart(2, "0");
//   return `${m}:${s}`;
// };

// const Player = () => {

//   const audioRef = useRef<HTMLAudioElement | null>(null);
//   const progressRef = useRef<HTMLDivElement | null>(null);

//   const [isPlaying, setIsPlaying] = useState(false);
//   const [currentTime, setCurrentTime] = useState(0);
//   const [duration, setDuration] = useState(0);
//   const [speed, setSpeed] = useState(1);
//   const [volume, setVolume] = useState(1);
//   const [showSpeed, setShowSpeed] = useState(false);
//   const [isMuted, setIsMuted] = useState(false);

//   useEffect(() => {
//     if (audioRef.current) {
//       audioRef.current.load();
//       setIsPlaying(false);
//       setCurrentTime(0);
//     }
//   }, [song?.url]);

//   const togglePlay = () => {
//     const audio = audioRef.current;
//     if (!audio) return;

//     if (isPlaying) audio.pause();
//     else audio.play();

//     setIsPlaying(!isPlaying);
//   };

//   const skip = (secs: number) => {
//     const audio = audioRef.current;
//     if (!audio) return;

//     audio.currentTime = Math.min(
//       Math.max(audio.currentTime + secs, 0),
//       duration,
//     );
//   };

//   const handleTimeUpdate = () => {
//     if (!audioRef.current) return;
//     setCurrentTime(audioRef.current.currentTime);
//   };

//   const handleLoadedMetadata = () => {
//     if (!audioRef.current) return;
//     setDuration(audioRef.current.duration);
//   };

//   const handleProgressClick = (e: React.MouseEvent) => {
//     const bar = progressRef.current;
//     if (!bar || !audioRef.current) return;

//     const rect = bar.getBoundingClientRect();
//     const ratio = (e.clientX - rect.left) / rect.width;
//     const newTime = ratio * duration;

//     audioRef.current.currentTime = newTime;
//     setCurrentTime(newTime);
//   };

//   const handleSpeedChange = (s: number) => {
//     setSpeed(s);
//     if (audioRef.current) {
//       audioRef.current.playbackRate = s;
//     }
//     setShowSpeed(false);
//   };

//   const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const val = parseFloat(e.target.value);
//     setVolume(val);

//     if (audioRef.current) {
//       audioRef.current.volume = val;
//     }

//     setIsMuted(val === 0);
//   };

//   const toggleMute = () => {
//     if (!audioRef.current) return;

//     if (isMuted) {
//       audioRef.current.volume = volume || 0.5;
//       setIsMuted(false);
//     } else {
//       audioRef.current.volume = 0;
//       setIsMuted(true);
//     }
//   };

//   const handleSongEnd = () => {
//     setIsPlaying(false);
//     setCurrentTime(0);
//   };

//   const progress = duration ? (currentTime / duration) * 100 : 0;

//   if (!song) return null;

//   return (
//     <div className="fixed bottom-0 w-full bg-zinc-900 text-white border-t border-zinc-700 p-4 shadow-lg">
//       <audio
//         ref={audioRef}
//         src={song.url}
//         onTimeUpdate={handleTimeUpdate}
//         onLoadedMetadata={handleLoadedMetadata}
//         onEnded={handleSongEnd}
//       />

//       {/* Top Info */}
//       <div className="flex items-center gap-3 mb-4">
//         <img
//           src={song.posterUrl}
//           alt={song.title}
//           className="w-14 h-14 rounded-lg object-cover shadow-md"
//         />
//         <div>
//           <p className="font-semibold">{song.title}</p>
//           <span className="text-sm text-orange-400">{song.mood}</span>
//         </div>
//       </div>

//       {/* Progress */}
//       <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
//         <span>{formatTime(currentTime)}</span>

//         <div
//           ref={progressRef}
//           onClick={handleProgressClick}
//           className="flex-1 h-2 bg-zinc-700 rounded cursor-pointer relative"
//         >
//           <div
//             className="h-2 bg-orange-500 rounded"
//             style={{ width: `${progress}%` }}
//           />
//           <div
//             className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-orange-500 rounded-full"
//             style={{ left: `${progress}%` }}
//           />
//         </div>

//         <span>{formatTime(duration)}</span>
//       </div>

//       {/* Controls */}
//       <div className="flex items-center justify-between">
//         {/* Left */}
//         <div className="flex items-center gap-3">
//           <button onClick={() => skip(-5)} className="hover:text-orange-400">
//             ⏪
//           </button>

//           <button
//             onClick={togglePlay}
//             className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-full font-semibold"
//           >
//             {isPlaying ? "Pause" : "Play"}
//           </button>

//           <button onClick={() => skip(5)} className="hover:text-orange-400">
//             ⏩
//           </button>
//         </div>

//         {/* Right */}
//         <div className="flex items-center gap-3">
//           {/* Speed */}
//           <div className="relative">
//             <button
//               onClick={() => setShowSpeed(!showSpeed)}
//               className="bg-zinc-800 px-2 py-1 rounded text-sm"
//             >
//               {speed}x
//             </button>

//             {showSpeed && (
//               <div className="absolute bottom-8 bg-zinc-800 rounded shadow p-1">
//                 {SPEED_OPTIONS.map((s) => (
//                   <button
//                     key={s}
//                     onClick={() => handleSpeedChange(s)}
//                     className={`block px-3 py-1 text-sm w-full text-left hover:bg-zinc-700 ${
//                       s === speed ? "text-orange-400" : ""
//                     }`}
//                   >
//                     {s}x
//                   </button>
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* Volume */}
//           <div className="flex items-center gap-2">
//             <button onClick={toggleMute}>{isMuted ? "🔇" : "🔊"}</button>

//             <input
//               type="range"
//               min="0"
//               max="1"
//               step="0.05"
//               value={isMuted ? 0 : volume}
//               onChange={handleVolume}
//               className="w-20 accent-orange-500"
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Player;
