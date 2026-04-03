import { Heart, Play } from "lucide-react";
import { useState } from "react";

interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  cover: string;
  duration: number;
  mood: string;
}

interface SongRecommendationsProps {
  mood: string;
  onSongSelect: (song: Song) => void;
  currentSong: Song | null;
}

// Mock data - replace with API call
const songDatabase: Record<string, Song[]> = {
  happy: [
    {
      id: "1",
      title: "Good as Hell",
      artist: "Lizzo",
      album: "Cuz I Love You",
      cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop",
      duration: 214,
      mood: "happy",
    },
    {
      id: "2",
      title: "Walking on Sunshine",
      artist: "Katrina & The Waves",
      album: "Walking on Sunshine",
      cover: "https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=400&h=400&fit=crop",
      duration: 245,
      mood: "happy",
    },
    {
      id: "3",
      title: "Shut Up and Dance",
      artist: "Walk the Moon",
      album: "Walk the Moon",
      cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop",
      duration: 208,
      mood: "happy",
    },
    {
      id: "4",
      title: "Don't Stop Me Now",
      artist: "Queen",
      album: "News of the World",
      cover: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&h=400&fit=crop",
      duration: 226,
      mood: "happy",
    },
    {
      id: "5",
      title: "Walking on Air",
      artist: "Katy Perry",
      album: "Teenage Dream",
      cover: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
      duration: 231,
      mood: "happy",
    },
    {
      id: "6",
      title: "Here Comes the Sun",
      artist: "The Beatles",
      album: "Abbey Road",
      cover: "https://images.unsplash.com/photo-1511379938547-c1f69b13d835?w=400&h=400&fit=crop",
      duration: 185,
      mood: "happy",
    },
  ],
  sad: [
    {
      id: "7",
      title: "Someone Like You",
      artist: "Adele",
      album: "21",
      cover: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&h=400&fit=crop",
      duration: 285,
      mood: "sad",
    },
    {
      id: "8",
      title: "The Night We Met",
      artist: "Lord Huron",
      album: "Lonesome Dreams",
      cover: "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400&h=400&fit=crop",
      duration: 234,
      mood: "sad",
    },
    {
      id: "9",
      title: "Tears in Heaven",
      artist: "Eric Clapton",
      album: "Unplugged",
      cover: "https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=400&h=400&fit=crop",
      duration: 262,
      mood: "sad",
    },
    {
      id: "10",
      title: "Mad World",
      artist: "Gary Jules",
      album: "Trading Snakeoil for Wolftickets",
      cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop",
      duration: 191,
      mood: "sad",
    },
    {
      id: "11",
      title: "Black",
      artist: "Pearl Jam",
      album: "Vitalogy",
      cover: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&h=400&fit=crop",
      duration: 329,
      mood: "sad",
    },
    {
      id: "12",
      title: "Hurt",
      artist: "Johnny Cash",
      album: "American Recordings",
      cover: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
      duration: 218,
      mood: "sad",
    },
  ],
  energetic: [
    {
      id: "13",
      title: "Uptown Funk",
      artist: "Mark Ronson ft. Bruno Mars",
      album: "Uptown Special",
      cover: "https://images.unsplash.com/photo-1511379938547-c1f69b13d835?w=400&h=400&fit=crop",
      duration: 269,
      mood: "energetic",
    },
    {
      id: "14",
      title: "We Will Rock You",
      artist: "Queen",
      album: "News of the World",
      cover: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&h=400&fit=crop",
      duration: 127,
      mood: "energetic",
    },
    {
      id: "15",
      title: "Blinding Lights",
      artist: "The Weeknd",
      album: "After Hours",
      cover: "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400&h=400&fit=crop",
      duration: 200,
      mood: "energetic",
    },
    {
      id: "16",
      title: "Eye of the Tiger",
      artist: "Survivor",
      album: "Eye of the Tiger",
      cover: "https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=400&h=400&fit=crop",
      duration: 247,
      mood: "energetic",
    },
  ],
  calm: [
    {
      id: "17",
      title: "Weightless",
      artist: "Marconi Union",
      album: "Weightless",
      cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop",
      duration: 480,
      mood: "calm",
    },
    {
      id: "18",
      title: "Clair de Lune",
      artist: "Claude Debussy",
      album: "Suite Bergamasque",
      cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop",
      duration: 273,
      mood: "calm",
    },
    {
      id: "19",
      title: "Holocene",
      artist: "Bon Iver",
      album: "For Emma Forever Ago",
      cover: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&h=400&fit=crop",
      duration: 315,
      mood: "calm",
    },
    {
      id: "20",
      title: "Breathe",
      artist: "The Pink Floyd",
      album: "The Dark Side of the Moon",
      cover: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
      duration: 269,
      mood: "calm",
    },
  ],
  romantic: [
    {
      id: "21",
      title: "Perfect",
      artist: "Ed Sheeran",
      album: "÷ (Divide)",
      cover: "https://images.unsplash.com/photo-1511379938547-c1f69b13d835?w=400&h=400&fit=crop",
      duration: 263,
      mood: "romantic",
    },
    {
      id: "22",
      title: "All of Me",
      artist: "John Legend",
      album: "Love in the Future",
      cover: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&h=400&fit=crop",
      duration: 248,
      mood: "romantic",
    },
    {
      id: "23",
      title: "At Last",
      artist: "Etta James",
      album: "At Last!",
      cover: "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400&h=400&fit=crop",
      duration: 186,
      mood: "romantic",
    },
    {
      id: "24",
      title: "Thinking Out Loud",
      artist: "Ed Sheeran",
      album: "× (Multiply)",
      cover: "https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=400&h=400&fit=crop",
      duration: 282,
      mood: "romantic",
    },
  ],
};

const SongRecommendations: React.FC<SongRecommendationsProps> = ({
  mood,
  onSongSelect,
  currentSong,
}) => {
  const [likedSongs, setLikedSongs] = useState<string[]>([]);
  const songs = songDatabase[mood] || [];

  const toggleLike = (songId: string) => {
    setLikedSongs((prev) =>
      prev.includes(songId) ? prev.filter((id) => id !== songId) : [...prev, songId]
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {songs.map((song) => (
        <div
          key={song.id}
          className={`
            rounded-xl overflow-hidden backdrop-blur-sm border transition-all duration-300 hover:scale-105 
            ${
              currentSong?.id === song.id
                ? "bg-gradient-to-br from-purple-600 to-pink-500 border-purple-300 shadow-xl"
                : "bg-white bg-opacity-10 border-white border-opacity-20 hover:bg-opacity-20"
            }
          `}
        >
          {/* Album Art */}
          <div className="relative h-40 overflow-hidden bg-black group">
            <img
              src={song.cover}
              alt={song.album}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
              <button
                onClick={() => onSongSelect(song)}
                className="bg-white bg-opacity-20 backdrop-blur-sm text-white rounded-full p-3 hover:bg-opacity-30 transition-all"
              >
                <Play size={24} className="fill-white" />
              </button>
            </div>
          </div>

          {/* Song Info */}
          <div className="p-4">
            <h3 className="text-white font-semibold mb-1 truncate">{song.title}</h3>
            <p className="text-purple-200 text-sm mb-3 truncate">{song.artist}</p>

            {/* Duration */}
            <div className="flex items-center justify-between">
              <span className="text-purple-300 text-xs">
                {Math.floor(song.duration / 60)}:{(song.duration % 60).toString().padStart(2, "0")}
              </span>

              {/* Like Button */}
              <button
                onClick={() => toggleLike(song.id)}
                className={`transition-all ${
                  likedSongs.includes(song.id)
                    ? "text-pink-500 scale-110"
                    : "text-purple-300 hover:text-pink-500"
                }`}
              >
                <Heart size={18} fill={likedSongs.includes(song.id) ? "currentColor" : "none"} />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SongRecommendations;
