import { useState } from 'react';
import { searchArtworks } from '../api/aicApi';
import type { Artwork } from '../schemas/artworkSchema';
import ArtworkCard from '../components/ArtworkCard';
import Gallery from '../components/Gallery';
import InfoDialog from '../components/InfoDialog';
import { useGallery } from '../hooks/useGallery';

export default function ExplorerPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');
  const [dialogVariant, setDialogVariant] = useState<'success' | 'warning'>(
    'success',
  );

  const { gallery, addToGallery, removeFromGallery } = useGallery();

  async function handleSearch() {
    if (!query.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const response = await searchArtworks(query);
      setResults(response.data);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch artworks.');
    } finally {
      setLoading(false);
    }
  }

  function handleAddToGallery(art: Artwork) {
    const alreadyExists = gallery.some((a) => a.id === art.id);

    if (alreadyExists) {
      setDialogMessage('This artwork is already in your gallery.');
      setDialogVariant('warning');
      setDialogOpen(true);
      return;
    }

    addToGallery(art);

    setDialogMessage('Artwork successfully added to gallery.');
    setDialogVariant('success');
    setDialogOpen(true);
  }

  return (
    <div className='space-y-16'>
      {/* Header */}
      <div className='text-center space-y-6'>
        <h1 className='text-4xl font-bold'>Explore Art</h1>

        <div className='flex justify-center'>
          <div className='flex w-full max-w-xl shadow-sm'>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder='Search artworks...'
              className='flex-1 px-4 py-3 rounded-l-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black'
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSearch();
              }}
            />
            <button
              onClick={handleSearch}
              className='px-6 py-3 bg-black text-white rounded-r-xl hover:opacity-90 transition'
            >
              Search
            </button>
          </div>
        </div>

        {loading && <p className='text-gray-500'>Loading...</p>}

        {error && <p className='text-red-500'>{error}</p>}
      </div>

      {/* Search Results */}
      {results.length > 0 && (
        <div className='space-y-6'>
          <h2 className='text-2xl font-semibold'>Search Results</h2>

          <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8'>
            {results.map((art) => (
              <ArtworkCard
                key={art.id}
                artwork={art}
                onAdd={handleAddToGallery}
              />
            ))}
          </div>
        </div>
      )}

      {/* Gallery */}
      {gallery.length > 0 && (
        <div className='space-y-6'>
          <h2 className='text-2xl font-semibold'>Your Gallery</h2>

          <Gallery gallery={gallery} onDelete={removeFromGallery} />
        </div>
      )}

      {/* Dialog */}
      <InfoDialog
        isOpen={dialogOpen}
        onClose={() => setDialogOpen(false)}
        message={dialogMessage}
        variant={dialogVariant}
      />
    </div>
  );
}
