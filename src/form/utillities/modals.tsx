import { AlertTriangle, Trash2, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import StyledButton from './button';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const Modal: React.FC<ModalProps> = ({ 
  isOpen, 
  onClose, 
  title, 
  children,
  size = 'md'
}) => {
  // Close modal when Escape key is pressed
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    
    // Prevent body scrolling when modal is open
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  // Size classes
  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl'
  };

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div 
        className="fixed inset-0 bg-transparent" 
        onClick={onClose}
        aria-hidden="true"
      />
      
      <div 
        className={`relative bg-white rounded-lg shadow-xl w-full ${sizeClasses[size]} max-h-[90vh] overflow-hidden z-10`}
        onClick={e => e.stopPropagation()}
      >
        {/* Modal header */}
        {title && (
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">{title}</h3>
              <button
                type="button"
                className="text-gray-400 hover:text-gray-500 focus:outline-none"
                onClick={onClose}
              >
                <X size={20} />
              </button>
            </div>
          </div>
        )}
        
        {/* Close button when no title */}
        {!title && (
          <button
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-500 focus:outline-none"
            onClick={onClose}
          >
            <X size={20} />
          </button>
        )}
        
        {/* Modal content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-8rem)]">
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
};





interface DeleteModalProps {
  id: string;
  confirm: (id: string) => void;
  metadata: string[];
  isLoading?: boolean;
  onClose: () => void;
}

export const DeleteModal: React.FC<DeleteModalProps> = ({
  id,
  confirm,
  metadata,
  isLoading = false,
  onClose
}) => {
  const [isConfirming, setIsConfirming] = useState(false);

  const handleDelete = async () => {
    setIsConfirming(true);
    await confirm(id);
    setIsConfirming(false);
    onClose();
  };

  return (
    <div className="text-center">
      <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
        <AlertTriangle className="h-6 w-6 text-red-600" />
      </div>
      
      <h3 className="text-lg font-medium text-gray-900 mb-2">Confirm Deletion</h3>
      
      <div className="mt-2">
        <p className="text-sm text-gray-500 mb-4">
          Are you sure you want to delete this item? This action cannot be undone.
        </p>
        
        {metadata && metadata.length > 0 && (
          <div className="mt-4 p-4 bg-gray-50 rounded-md text-left">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Item details:</h4>
            <ul className="space-y-1">
              {metadata.map((item, index) => (
                <li key={index} className="text-sm text-gray-600">
                  • {item}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      
      <div className="mt-6 flex justify-end space-x-3">
        <StyledButton
          variant="outline"
          onClick={onClose}
          disabled={isLoading || isConfirming}
        >
          Cancel
        </StyledButton>
        
        <StyledButton
          variant="danger"
          onClick={handleDelete}
          isLoading={isLoading || isConfirming}
          icon={<Trash2 size={16} />}
        >
          Delete
        </StyledButton>
      </div>
    </div>
  );
};

