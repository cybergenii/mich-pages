/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, ReactNode, useContext, useState } from "react";

type ModalType = "DELETE" | "CONFIRM" | "CUSTOM";

interface ModalContextType {
  isOpen: boolean;
  modalType: ModalType | null;
  modalProps: any;
  openModal: (type: ModalType, props?: any) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalType, setModalType] = useState<ModalType | null>(null);
  const [modalProps, setModalProps] = useState<any>(null);

  const openModal = (type: ModalType, props?: any) => {
    setModalType(type);
    setModalProps(props || {});
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    // Reset modal type and props after animation completes
    setTimeout(() => {
      setModalType(null);
      setModalProps(null);
    }, 300);
  };

  return (
    <ModalContext.Provider
      value={{
        isOpen,
        modalType,
        modalProps,
        openModal,
        closeModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};

// Helper functions for common modal operations
export const useDeleteModal = () => {
  const { openModal, closeModal } = useModal();

  const openDeleteModal = (props: any) => {
    openModal("DELETE", props);
  };

  return { openDeleteModal, closeModal };
};
