import { fetchWithSchema } from '../lib/fetchWithSchema';
import { ArtworkResponseSchema } from '../schemas/artworkSchema';

export function searchArtworks(query: string) {
  const url = `https://api.artic.edu/api/v1/artworks/search?q=${query}&fields=id,title,artist_title,image_id`;
  return fetchWithSchema(url, ArtworkResponseSchema);
}
