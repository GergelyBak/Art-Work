import type { SavedArtwork } from '../hooks/useGallery';
import ArtworkCard from './ArtworkCard';

type Props = {
  gallery: SavedArtwork[];
  onDelete: (id: number) => void;
  onUpdateNote: (id: number, note: string) => void;
};

export default function Gallery({ gallery, onDelete, onUpdateNote }: Props) {
  if (gallery.length === 0) {
    return null;
  }

  return (
    <div>
      <h2 className='text-2xl font-semibold mb-6'>My Gallery</h2>

      {/* UGYANAZ A GRID MINT A SEARCH-NÉL */}
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8'>
        {gallery.map((art) => (
          <ArtworkCard
            key={art.id}
            artwork={art}
            onDelete={onDelete}
            onUpdateNote={onUpdateNote}
          />
        ))}
      </div>
    </div>
  );
}
