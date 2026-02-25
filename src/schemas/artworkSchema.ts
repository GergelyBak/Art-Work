import { z } from "zod";

export const ArtworkSchema = z.object({
  id: z.number(),
  title: z.string(),
  artist_title: z.string().nullable(),
  image_id: z.string().nullable(),
});

export const ArtworkResponseSchema = z.object({
  data: z.array(ArtworkSchema),
});

export type Artwork = z.infer<typeof ArtworkSchema>;