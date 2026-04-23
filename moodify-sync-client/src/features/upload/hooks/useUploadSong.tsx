import { useMutation, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";

import type { GetSongResponse } from "../../home/utils/types";
import { uploadSongs } from "../service/upload.api";

export const useUploadSong = () => {
  const queryClient = useQueryClient();

  const uploadSongMutation = useMutation({
    mutationFn: uploadSongs,
    onSuccess: async (data: GetSongResponse) => {
      toast.success(data.message);

      await queryClient.invalidateQueries({ queryKey: ["song"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return {
    uploadSongMutation,
  };
};
