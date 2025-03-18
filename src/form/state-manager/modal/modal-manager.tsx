import React from 'react';
import StyledButton from '../../utillities/button';
import { DeleteModal, Modal } from '../../utillities/modals';
import { useModal } from './modal-context';


/**
 * ModalManager handles rendering different types of modals
 * based on the current modal type in the ModalContext
 */
const ModalManager: React.FC = () => {
  const { isOpen, modalType, modalProps, closeModal } = useModal();

  // Early return if no modal should be shown
  if (!isOpen || !modalType) return null;

  // Render different modals based on type
  switch (modalType) {
    case 'DELETE':
      return (
        <Modal
          isOpen={isOpen}
          onClose={closeModal}
          title="Delete Confirmation"
          size="md"
        >
          <DeleteModal
            id={modalProps.id}
            confirm={modalProps.confirm}
            metadata={modalProps.metadata}
            isLoading={modalProps.isLoading}
            onClose={closeModal}
          />
        </Modal>
      );
      
    case 'CONFIRM':
      return (
        <Modal
          isOpen={isOpen}
          onClose={closeModal}
          title={modalProps.title || "Confirmation"}
          size="sm"
        >
          <div className="text-center">
            <p className="mb-4">{modalProps.message}</p>
            <div className="flex justify-end space-x-3">
              <StyledButton
                variant="outline"
                onClick={closeModal}
              >
                Cancel
              </StyledButton>
              <StyledButton
                variant="primary"
                onClick={() => {
                  if (modalProps.onConfirm) {
                    modalProps.onConfirm();
                  }
                  closeModal();
                }}
              >
                Confirm
              </StyledButton>
            </div>
          </div>
        </Modal>
      );
      
    case 'CUSTOM':
      return (
        <Modal
          isOpen={isOpen}
          onClose={closeModal}
          title={modalProps.title}
          size={modalProps.size || 'md'}
        >
          {modalProps.content}
        </Modal>
      );
      
    default:
      return null;
  }
};

export default ModalManager;