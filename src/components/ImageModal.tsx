import React from 'react';
import { X } from 'lucide-react';

interface ImageModalProps {
  imageUrl: string;
  alt: string;
  onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ imageUrl, alt, onClose }) => (
  <div 
    className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
    onClick={onClose}
  >
    <div className="relative max-w-4xl w-full">
      <button
        onClick={onClose}
        className="absolute -top-12 right-0 text-white hover:text-glamour-gold transition-colors"
      >
        <X className="w-8 h-8" />
      </button>
      <img
        src={imageUrl}
        alt={alt}
        className="w-full h-auto rounded-lg"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  </div>
);

export default ImageModal;