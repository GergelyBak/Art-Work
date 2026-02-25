import { useEffect } from 'react';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  description?: string;
};

export default function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title = 'Remove artwork?',
  description = 'This action cannot be undone.',
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
        className='absolute inset-0 bg-black/50 backdrop-blur-sm'
        onClick={onClose}
      />

      {/* Small Dialog Box */}
      <div className='relative bg-white rounded-2xl shadow-xl w-380px max-w-[90vw] p-6 animate-fade-in'>
        <div className='space-y-3'>
          <h2 className='text-lg font-semibold'>{title}</h2>

          <p className='text-gray-500 text-sm'>{description}</p>
        </div>

        <div className='flex justify-end gap-3 mt-6'>
          <button
            onClick={onClose}
            className='px-4 py-2 text-sm rounded-xl bg-gray-100 hover:bg-gray-200 transition'
          >
            Cancel
          </button>

          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className='px-4 py-2 text-sm rounded-xl bg-red-500 text-white hover:bg-red-600 transition'
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}
