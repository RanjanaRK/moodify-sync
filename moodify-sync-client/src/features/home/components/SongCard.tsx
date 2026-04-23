import { Play } from "lucide-react";
import type { Song } from "../utils/types";
import { Button } from "../../../components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../../../components/ui/card";

interface SongCardProps {
  song: Song;
  onPlay: (song: Song) => void;
}

const SongCard = ({ song, onPlay }: SongCardProps) => {
  const getMoodColor = (mood: string) => {
    const moodColors: Record<string, string> = {
      happy: "bg-yellow-500/20 text-yellow-400",
      sad: "bg-blue-500/20 text-blue-400",
      angry: "bg-red-500/20 text-red-400",
      calm: "bg-green-500/20 text-green-400",
      energetic: "bg-purple-500/20 text-purple-400",
      neutral: "bg-gray-500/20 text-gray-400",
    };
    return moodColors[mood.toLowerCase()] || "bg-gray-500/20 text-gray-400";
  };

  return (
    <Card className="group/song hover:ring-primary/50 transition-all duration-300 h-full flex flex-col overflow-hidden">
      {/* Song Image */}
      <div className="relative overflow-hidden h-48 bg-gradient-to-b from-gray-800 to-black">
        <img
          src={song.posterUrl}
          alt={song.title}
          className="w-full h-full object-cover group-hover/song:scale-105 transition-transform duration-300"
        />
        {/* Play Button Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/song:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <Button
            onClick={() => onPlay(song)}
            size="icon"
            className="bg-primary hover:bg-primary/90 rounded-full h-12 w-12"
          >
            <Play className="h-6 w-6 fill-current" />
          </Button>
        </div>
      </div>

      {/* Song Info */}
      <CardHeader className="flex-1">
        <CardTitle className="line-clamp-2 text-base">{song.title}</CardTitle>
        <CardDescription className="mt-2">
          <span
            className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getMoodColor(song.mood)}`}
          >
            {song.mood.charAt(0).toUpperCase() + song.mood.slice(1)}
          </span>
        </CardDescription>
      </CardHeader>
    </Card>
  );
};

export default SongCard;
