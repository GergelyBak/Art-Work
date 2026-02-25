import { useState } from 'react';
import type { Artwork } from '../schemas/artworkSchema';
import Modal from './Modal';
import ConfirmDialog from './ConfirmDialog';

type Props = {
  artwork: Artwork;
  onAdd?: (artwork: Artwork) => void;
  onDelete?: (id: number) => void;
};

export default function ArtworkCard({ artwork, onAdd, onDelete }: Props) {
  const [imgError, setImgError] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const imageUrl =
    artwork.image_id && !imgError
      ? `https://www.artic.edu/iiif/2/${artwork.image_id}/full/600,/0/default.jpg`
      : null;

  return (
    <>
      <div className='bg-white rounded-3xl shadow-sm hover:shadow-xl transition flex flex-col h-full overflow-hidden'>
        {/* Image */}
        <div
          className='relative aspect-3/4 bg-gray-100 overflow-hidden cursor-pointer'
          onClick={() => setIsOpen(true)}
        >
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={artwork.title}
              className='w-full h-full object-cover'
              onError={() => setImgError(true)}
            />
          ) : (
            <div className='flex items-center justify-center h-full text-gray-400 text-sm'>
              No image
            </div>
          )}
        </div>

        {/* Content */}
        <div className='flex flex-col flex-1 p-4'>
          <div>
            <h3 className='font-semibold text-lg line-clamp-2'>
              {artwork.title}
            </h3>

            <p className='text-gray-500 text-sm mt-1'>
              {artwork.artist_title ?? 'Unknown artist'}
            </p>
          </div>

          {/* Bottom section */}
          <div className='mt-auto pt-4'>
            {onAdd && (
              <button
                onClick={() => onAdd(artwork)}
                className='w-full py-2 rounded-xl bg-black text-white hover:opacity-90 transition'
              >
                Add to Gallery
              </button>
            )}

            {onDelete && (
              <button
                onClick={() => setConfirmOpen(true)}
                className='w-full py-2 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition font-medium'
              >
                Remove
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className='flex flex-col h-full gap-6'>
          {/* Image section */}
          <div className='flex-1 flex items-center justify-center'>
            {artwork.image_id && (
              <img
                src={`https://www.artic.edu/iiif/2/${artwork.image_id}/full/843,/0/default.jpg`}
                alt={artwork.title}
                className='max-h-[380px] object-contain rounded-2xl'
              />
            )}
          </div>

          {/* Info section */}
          <div className='text-center'>
            <h2 className='text-3xl font-semibold'>{artwork.title}</h2>

            <p className='text-gray-500 dark:text-gray-400 mt-2'>
              {artwork.artist_title ?? 'Unknown artist'}
            </p>
          </div>
        </div>
      </Modal>

      {/* Confirm Dialog */}
      <ConfirmDialog
        isOpen={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={() => onDelete?.(artwork.id)}
      />
    </>
  );
}
