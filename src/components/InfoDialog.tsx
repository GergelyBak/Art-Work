import { useEffect } from 'react';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  message: string;
  variant?: 'success' | 'warning';
};

export default function InfoDialog({
  isOpen,
  onClose,
  message,
  variant = 'success',
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

  const isSuccess = variant === 'success';

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center'>
      <div
        className='absolute inset-0 bg-black/40 backdrop-blur-sm'
        onClick={onClose}
      />

      <div className='relative bg-white rounded-2xl shadow-xl w-380px max-w-[90vw] p-6 text-center animate-fade-in'>
        <div className='mb-4'>
          <div
            className={`text-3xl mb-2 ${
              isSuccess ? 'text-green-500' : 'text-yellow-500'
            }`}
          >
            {isSuccess ? '✓' : '!'}
          </div>

          <p className='font-medium text-gray-800'>{message}</p>
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
