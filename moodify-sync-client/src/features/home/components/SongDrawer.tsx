import type { Song } from '../utils/types';

type Props = {
  songs: Song[];
  onSelect: (song: Song) => void;
  currentSongId?: string;
  open: boolean;
  setOpen: (val: boolean) => void;
};

const SongDrawer = ({ songs, onSelect, currentSongId, open, setOpen }: Props) => {
  return (
    <>
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="not-only: fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
        />
      )}

      <div
        className={`fixed top-0 right-0 z-50 h-full w-90 transform bg-[#0b0b0f] text-white shadow-2xl transition-transform duration-300 ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b border-white/10 p-4">
          <h2 className="text-lg font-semibold">Your Songs</h2>
          <button onClick={() => setOpen(false)}>✖</button>
        </div>

        <div className="h-full space-y-3 overflow-y-auto p-3 pb-24">
          {songs.map((song) => {
            const active = song.id === currentSongId;

            return (
              <div
                key={song.id}
                onClick={() => onSelect(song)}
                className={`flex cursor-pointer items-center gap-3 rounded-xl p-3 transition ${
                  active ? 'border border-red-500 bg-red-600/20' : 'hover:bg-white/5'
                }`}
              >
                <img src={song.posterUrl} className="h-12 w-12 rounded-lg object-cover" />

                <div className="flex-1">
                  <h3 className="text-sm font-medium">{song.title}</h3>
                  <p className="text-xs text-gray-400">{song.mood}</p>
                </div>

                <div className="text-sm">{active ? 'play' : 'pause'}</div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default SongDrawer;
