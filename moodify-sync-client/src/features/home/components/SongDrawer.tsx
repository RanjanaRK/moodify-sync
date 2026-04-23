import type { Song } from "../utils/types";

type Props = {
  songs: Song[];
  onSelect: (song: Song) => void;
  currentSongId?: string;
  open: boolean;
  setOpen: (val: boolean) => void;
};

const SongDrawer = ({
  songs,
  onSelect,
  currentSongId,
  open,
  setOpen,
}: Props) => {
  return (
    <>
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 not-only: bg-black/50 backdrop-blur-sm z-40"
        />
      )}

      <div
        className={`fixed top-0 right-0 h-full w-90 bg-[#0b0b0f] text-white z-50 shadow-2xl transform transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-4 border-b border-white/10 flex justify-between items-center">
          <h2 className="text-lg font-semibold">Your Songs</h2>
          <button onClick={() => setOpen(false)}>✖</button>
        </div>

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
                <img
                  src={song.posterUrl}
                  className="w-12 h-12 rounded-lg object-cover"
                />

                <div className="flex-1">
                  <h3 className="text-sm font-medium">{song.title}</h3>
                  <p className="text-xs text-gray-400">{song.mood}</p>
                </div>

                <div className="text-sm">{active ? "play" : "pause"}</div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default SongDrawer;
