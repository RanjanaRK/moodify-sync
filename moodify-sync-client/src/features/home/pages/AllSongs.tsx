import { Music, Loader } from "lucide-react";
import { useAllSongs } from "../hooks/useSong";
import SongCard from "../components/SongCard";
import type { Song } from "../utils/types";
import { useState } from "react";

const AllSongs = () => {
  const { data: songs = [], isLoading, isError, error } = useAllSongs();
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMood, setSelectedMood] = useState<string | null>(null);

  // Get unique moods from songs
  const uniqueMoods = Array.from(new Set(songs.map((song) => song.mood)));

  // Filter songs based on search and mood
  const filteredSongs = songs.filter((song) => {
    const matchesSearch = song.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesMood = !selectedMood || song.mood === selectedMood;
    return matchesSearch && matchesMood;
  });

  const handlePlaySong = (song: Song) => {
    setSelectedSong(song);
    // You can add audio playback logic here
    console.log("Playing:", song.title);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white py-12 px-4 md:px-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <Music className="h-8 w-8 text-primary" />
          <h1 className="text-4xl md:text-5xl font-bold">All Songs</h1>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white/5 rounded-lg p-4 border border-white/10">
            <p className="text-gray-400 text-sm">Total Songs</p>
            <p className="text-2xl font-bold">{songs.length}</p>
          </div>
          <div className="bg-white/5 rounded-lg p-4 border border-white/10">
            <p className="text-gray-400 text-sm">Moods</p>
            <p className="text-2xl font-bold">{uniqueMoods.length}</p>
          </div>
          <div className="bg-white/5 rounded-lg p-4 border border-white/10 col-span-2 md:col-span-1">
            <p className="text-gray-400 text-sm">Now Showing</p>
            <p className="text-2xl font-bold">{filteredSongs.length}</p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="Search songs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
          />
        </div>

        {/* Mood Filter */}
        {uniqueMoods.length > 0 && (
          <div className="mb-8">
            <p className="text-sm text-gray-400 mb-3">Filter by Mood:</p>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedMood(null)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedMood === null
                    ? "bg-primary text-white"
                    : "bg-white/10 text-gray-300 hover:bg-white/20"
                }`}
              >
                All
              </button>
              {uniqueMoods.map((mood) => (
                <button
                  key={mood}
                  onClick={() => setSelectedMood(mood)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all capitalize ${
                    selectedMood === mood
                      ? "bg-primary text-white"
                      : "bg-white/10 text-gray-300 hover:bg-white/20"
                  }`}
                >
                  {mood}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader className="h-12 w-12 text-primary animate-spin mb-4" />
            <p className="text-gray-400">Loading songs...</p>
          </div>
        )}

        {/* Error State */}
        {isError && (
          <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-6 text-center">
            <p className="text-red-200">Error loading songs</p>
            <p className="text-red-300 text-sm mt-2">{error?.message}</p>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && filteredSongs.length === 0 && (
          <div className="text-center py-20">
            <Music className="h-16 w-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 text-lg">No songs found</p>
            <p className="text-gray-500 text-sm mt-2">
              {searchTerm
                ? "Try adjusting your search"
                : "No songs available at the moment"}
            </p>
          </div>
        )}

        {/* Songs Grid */}
        {!isLoading && filteredSongs.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredSongs.map((song) => (
              <SongCard key={song.id} song={song} onPlay={handlePlaySong} />
            ))}
          </div>
        )}

        {/* Now Playing */}
        {selectedSong && (
          <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-black to-black/50 border-t border-white/10 p-4">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              <div className="flex items-center gap-4">
                <img
                  src={selectedSong.posterUrl}
                  alt={selectedSong.title}
                  className="h-16 w-16 rounded-lg object-cover"
                />
                <div>
                  <p className="font-medium">{selectedSong.title}</p>
                  <p className="text-sm text-gray-400 capitalize">
                    {selectedSong.mood}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedSong(null)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllSongs;
