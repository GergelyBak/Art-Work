import { useEffect } from 'react';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  message?: string;
};

export default function SuccessDialog({
  isOpen,
  onClose,
  message = 'Artwork successfully added to gallery.',
}: Props) {
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleKey);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center'>
      {/* Overlay */}
      <div
        className='absolute inset-0 bg-black/40 backdrop-blur-sm'
        onClick={onClose}
      />

      {/* Small Dialog */}
      <div className='relative bg-white rounded-2xl shadow-xl w-380px max-w-[90vw] p-6 animate-fade-in text-center'>
        <div className='mb-4'>
          <div className='text-green-500 text-3xl mb-2'>✓</div>
          <p className='text-gray-800 font-medium'>{message}</p>
        </div>

        <button
          onClick={onClose}
          className='mt-4 px-5 py-2 rounded-xl bg-black text-white hover:opacity-90 transition'
        >
          OK
        </button>
      </div>
    </div>
  );
}
