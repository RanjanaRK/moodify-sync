import { useState } from "react";
import { Play, Pause, SkipBack, SkipForward, Volume2 } from "lucide-react";

interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  cover: string;
  duration: number;
}

interface MusicPlayerProps {
  song: Song;
  isPlaying: boolean;
  onPlayToggle: () => void;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ song, isPlaying, onPlayToggle }) => {
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(70);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="bg-gradient-to-br from-purple-900 to-purple-800 rounded-2xl p-8 backdrop-blur-sm border border-purple-400 border-opacity-30 shadow-2xl">
      {/* Album Art */}
      <div className="mb-8 flex justify-center">
        <div className="relative w-64 h-64 rounded-xl overflow-hidden shadow-xl transform hover:scale-105 transition-transform">
          <img
            src={song.cover}
            alt={song.album}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-30"></div>
        </div>
      </div>

      {/* Song Info */}
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-white mb-2">{song.title}</h3>
        <p className="text-purple-200 text-lg mb-1">{song.artist}</p>
        <p className="text-purple-300 text-sm">{song.album}</p>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="bg-purple-700 rounded-full h-2 overflow-hidden cursor-pointer">
          <div
            className="bg-gradient-to-r from-purple-400 to-pink-500 h-full transition-all"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="flex justify-between text-purple-200 text-xs mt-2">
          <span>{formatTime((progress / 100) * song.duration)}</span>
          <span>{formatTime(song.duration)}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-8 mb-8">
        <button className="text-purple-300 hover:text-white transition-colors">
          <SkipBack size={28} />
        </button>

        <button
          onClick={onPlayToggle}
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-full p-4 shadow-lg transform hover:scale-110 active:scale-95 transition-all"
        >
          {isPlaying ? <Pause size={36} /> : <Play size={36} className="ml-1" />}
        </button>

        <button className="text-purple-300 hover:text-white transition-colors">
          <SkipForward size={28} />
        </button>
      </div>

      {/* Volume Control */}
      <div className="flex items-center justify-center gap-4">
        <Volume2 size={20} className="text-purple-300" />
        <input
          type="range"
          min="0"
          max="100"
          value={volume}
          onChange={(e) => setVolume(Number(e.target.value))}
          className="w-32 h-2 bg-purple-700 rounded-full appearance-none cursor-pointer accent-pink-500"
        />
        <span className="text-purple-200 text-sm w-8">{volume}%</span>
      </div>
    </div>
  );
};

export default MusicPlayer;
