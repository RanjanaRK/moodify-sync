import { useState } from "react";
import type { Song } from "../utils/types";

type Props = {
  songs: Song[];
  onSelect: (song: Song) => void;
  currentSongId?: string;
};

const SongDrawer = ({ songs, onSelect, currentSongId }: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed top-6 right-6 z-50 px-4 py-2 bg-white text-black rounded-full shadow-lg"
      >
        🎵 Songs
      </button>

      {/* Overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-[360px] bg-[#0b0b0f] text-white z-50 shadow-2xl transform transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="p-4 border-b border-white/10 flex justify-between items-center">
          <h2 className="text-lg font-semibold">Your Songs</h2>
          <button onClick={() => setOpen(false)}>✖</button>
        </div>

        {/* Song List */}
        <div className="p-3 space-y-3 overflow-y-auto h-full pb-24">
          {songs.map((song) => {
            const active = song.id === currentSongId;

            return (
              <div
                key={song.id}
                onClick={() => onSelect(song)}
                className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition
                ${
                  active
                    ? "bg-red-600/20 border border-red-500"
                    : "hover:bg-white/5"
                }`}
              >
                {/* Thumbnail */}
                <img
                  src={song.posterUrl}
                  className="w-12 h-12 rounded-lg object-cover"
                />

                {/* Info */}
                <div className="flex-1">
                  <h3 className="text-sm font-medium">{song.title}</h3>
                  <p className="text-xs text-gray-400">{song.mood}</p>
                </div>

                {/* Play Indicator */}
                <div className="text-sm">{active ? "🎧" : "▶"}</div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default SongDrawer;
