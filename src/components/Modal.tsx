import { useEffect } from 'react';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export default function Modal({ isOpen, onClose, children }: Props) {
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
        className='absolute inset-0 bg-black/60 backdrop-blur-sm'
        onClick={onClose}
      />

      {/* Fixed Size Modal */}
      <div className='relative bg-white dark:bg-zinc-800 rounded-3xl shadow-2xl w-[720px] max-w-[92vw] h-[620px] flex flex-col p-8 animate-fade-in'>
        {children}
      </div>
    </div>
  );
}
