import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface ImageModalProps {
  imageUrl: string;
  alt: string;
  onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ imageUrl, alt, onClose }) => {
  // Handle ESC key press
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/90"
        onClick={onClose}
      />
      
      {/* Close button - top right */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-[60] w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-glamour-gold transition-colors duration-200 shadow-xl"
        aria-label="Close modal"
      >
        <X className="w-8 h-8 text-black" />
      </button>

      {/* Image container */}
      <div className="absolute inset-0 z-[55] flex items-center justify-center p-4">
        <div className="relative max-w-4xl w-full bg-white rounded-lg p-2 shadow-2xl">
          <img
            src={imageUrl}
            alt={alt}
            className="w-full h-auto rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default ImageModal;