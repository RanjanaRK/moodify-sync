import { Outlet } from "react-router";
import SongDrawer from "../features/home/components/SongDrawer";
import Navbar from "../shared/components/Navbar";
import { useRef, useState } from "react";
import { useAllSongs } from "../features/home/hooks/useSong";
import type { Song } from "../features/home/utils/types";

const AppLayout = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { data: songs = [] } = useAllSongs();

  const playSong = (song: Song) => {
    setCurrentSong(song);

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = song.url;
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };
  return (
    <>
      <Navbar onOpenSongs={() => setIsDrawerOpen(true)} />

      <audio
        ref={audioRef}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      <SongDrawer
        songs={songs}
        currentSongId={currentSong?.id}
        open={isDrawerOpen}
        setOpen={setIsDrawerOpen}
        onSelect={playSong}
      />

      <div className="pt-24">
        <Outlet context={{ onPlay: playSong }} />

        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-2xl z-50">
          <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl px-6 py-4 shadow-2xl flex items-center gap-5">
            <div className="flex items-center gap-3 flex-1">
              <img
                src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4"
                className="w-12 h-12 rounded-lg object-cover"
              />

              <div>
                <h3 className="text-sm font-semibold text-white">
                  {currentSong?.title || "No song playing"}
                </h3>
                <p className="text-xs text-gray-300">
                  {currentSong?.mood || "Select mood or song"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => {
                  if (!audioRef.current) return;

                  if (audioRef.current.paused) {
                    audioRef.current.play();
                  } else {
                    audioRef.current.pause();
                  }
                }}
                className="w-12 h-12 rounded-full bg-red-600 hover:scale-105 transition flex items-center justify-center text-white text-lg shadow-lg"
              >
                {audioRef.current?.paused ? "▶" : "⏸"}
              </button>
            </div>
          </div>

          <input
            type="range"
            min={0}
            max={audioRef.current?.duration || 0}
            value={audioRef.current?.currentTime || 0}
            onChange={(e) => {
              if (audioRef.current) {
                audioRef.current.currentTime = Number(e.target.value);
              }
            }}
            className="w-full mt-2 accent-red-500"
          />
        </div>
      </div>
    </>
  );
};

export default AppLayout;
