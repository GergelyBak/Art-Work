import { useEffect, useState } from 'react';
import type { Artwork } from '../schemas/artworkSchema';

export type SavedArtwork = Artwork & {
  note?: string;
};

export function useGallery() {
  const [gallery, setGallery] = useState<SavedArtwork[]>(() => {
    const stored = localStorage.getItem('gallery');
    if (!stored) return [];

    try {
      return JSON.parse(stored) as SavedArtwork[];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('gallery', JSON.stringify(gallery));
  }, [gallery]);

  function addToGallery(artwork: Artwork) {
    setGallery((prev) => {
      if (prev.some((a) => a.id === artwork.id)) {
        return prev;
      }
      return [...prev, artwork];
    });
  }

  function removeFromGallery(id: number) {
    setGallery((prev) => prev.filter((a) => a.id !== id));
  }

  function updateNote(id: number, note: string) {
    setGallery((prev) => prev.map((a) => (a.id === id ? { ...a, note } : a)));
  }

  return {
    gallery,
    addToGallery,
    removeFromGallery,
    updateNote,
  };
}
