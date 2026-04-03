interface MoodSelectorProps {
  selectedMood: string | null;
  onMoodChange: (mood: string) => void;
}

const moods = [
  { id: "happy", label: "Happy", emoji: "😊", color: "from-yellow-500 to-orange-500" },
  { id: "sad", label: "Sad", emoji: "😢", color: "from-blue-500 to-indigo-500" },
  { id: "energetic", label: "Energetic", emoji: "⚡", color: "from-red-500 to-pink-500" },
  { id: "calm", label: "Calm", emoji: "🧘", color: "from-green-500 to-teal-500" },
  { id: "romantic", label: "Romantic", emoji: "💕", color: "from-pink-500 to-rose-500" },
];

const MoodSelector: React.FC<MoodSelectorProps> = ({ selectedMood, onMoodChange }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
      {moods.map((mood) => (
        <button
          key={mood.id}
          onClick={() => onMoodChange(mood.id)}
          className={`
            p-6 rounded-xl backdrop-blur-sm transition-all duration-300 transform
            ${
              selectedMood === mood.id
                ? `bg-gradient-to-br ${mood.color} shadow-lg scale-105 ring-2 ring-white`
                : "bg-white bg-opacity-10 hover:bg-opacity-20 hover:scale-105"
            }
            border border-white border-opacity-20
            hover:shadow-xl active:scale-95
            flex flex-col items-center justify-center
          `}
        >
          <span className="text-4xl mb-2">{mood.emoji}</span>
          <span className="text-white font-semibold text-sm">{mood.label}</span>
        </button>
      ))}
    </div>
  );
};

export default MoodSelector;
