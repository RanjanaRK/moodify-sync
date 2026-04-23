import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { uploadSchema } from "../../home/utils/zodSchema";
import { useUploadSong } from "../hooks/useUploadSong";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";

type FormValues = {
  mood: string;
  song: FileList;
};

const UploadSong = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(uploadSchema),
  });

  const { uploadSongMutation } = useUploadSong();

  const onSubmit = async (data: FormValues) => {
    const formData = new FormData();

    formData.append("mood", data.mood);
    formData.append("song", data.song[0]);

    try {
      await uploadSongMutation.mutateAsync(formData);
      alert("Uploaded 🎵");
      reset();
    } catch {
      alert("Upload failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white/10 backdrop-blur-xl p-6 rounded-2xl text-white">
      <h2 className="text-xl font-semibold mb-4">Upload Song</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <Input {...register("mood")} placeholder="Mood (happy, sad, chill)" />
        {errors.mood && (
          <p className="text-red-400 text-sm">{errors.mood.message}</p>
        )}

        <Input type="file" accept="audio/*" {...register("song")} />
        {errors.song && (
          <p className="text-red-400 text-sm">{errors.song.message}</p>
        )}

        <Button
          type="submit"
          disabled={uploadSongMutation.isPending}
          className="w-full bg-red-600 py-3 rounded-lg font-semibold"
        >
          {uploadSongMutation.isPending ? "Uploading..." : "Upload"}
        </Button>
      </form>
    </div>
  );
};

export default UploadSong;
