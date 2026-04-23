import z from "zod";

export const uploadSchema = z.object({
  mood: z.string().min(1, "Mood required"),
  song: z.any().refine((files) => files?.length === 1, "Audio file required"),
});
