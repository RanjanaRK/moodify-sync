import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { uploadSchema } from '../../home/utils/zodSchema';
import { useUploadSong } from '../hooks/useUploadSong';

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

    formData.append('mood', data.mood);
    formData.append('song', data.song[0]);

    try {
      await uploadSongMutation.mutateAsync(formData);
      alert('Uploaded 🎵');
      reset();
    } catch {
      alert('Upload failed');
    }
  };

  return (
    <div className="mx-auto mt-10 max-w-md rounded-2xl bg-white/10 p-6 text-white backdrop-blur-xl">
      <h2 className="mb-4 text-xl font-semibold">Upload Song</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <Input {...register('mood')} placeholder="Mood (happy, sad, chill)" />
        {errors.mood && <p className="text-sm text-red-400">{errors.mood.message}</p>}

        <Input type="file" accept="audio/*" {...register('song')} />
        {errors.song && <p className="text-sm text-red-400">{errors.song.message}</p>}

        <Button
          type="submit"
          disabled={uploadSongMutation.isPending}
          className="w-full rounded-lg bg-red-600 py-3 font-semibold"
        >
          {uploadSongMutation.isPending ? 'Uploading...' : 'Upload'}
        </Button>
      </form>
    </div>
  );
};

export default UploadSong;
