import { useRef, useState } from 'react';
import { Outlet } from 'react-router';
import SongDrawer from '../features/home/components/SongDrawer';
import { useAllSongs } from '../features/home/hooks/useSong';
import type { Song } from '../features/home/utils/types';
import Navbar from '../shared/components/Navbar';

const AppLayout = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { data: songs = [] } = useAllSongs();

  const hidePlayer = location.pathname.startsWith('/upload');

  const playSong = (song: Song) => {
    setCurrentSong(song);

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = song.url;
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

        {!hidePlayer && (
          <div className="fixed bottom-6 left-1/2 z-50 w-[90%] max-w-2xl -translate-x-1/2">
            <div className="flex items-center gap-5 rounded-2xl border border-white/20 bg-white/10 px-6 py-4 shadow-2xl backdrop-blur-xl">
              <div className="flex flex-1 items-center gap-3">
                <img
                  src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4"
                  className="h-12 w-12 rounded-lg object-cover"
                />

                <div>
                  <h3 className="text-sm font-semibold text-white">
                    {currentSong?.title || 'No song playing'}
                  </h3>
                  <p className="text-xs text-gray-300">
                    {currentSong?.mood || 'Select mood or song'}
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
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-red-600 text-lg text-white shadow-lg transition hover:scale-105"
                >
                  {audioRef.current?.paused ? '▶' : '⏸'}
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
              className="mt-2 w-full accent-red-500"
            />
          </div>
        )}
      </div>
    </>
  );
};

export default AppLayout;
