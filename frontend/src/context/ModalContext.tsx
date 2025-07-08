// ModalContext.tsx
import React, { createContext, useContext, useState } from 'react';
import DeveloperModal from '../components/DeveloperModal';
import api from '../utils/api';
import { Developer } from '../utils/types';

type ModalMode = 'view' | 'edit' | 'delete' | 'add';

interface ModalContextType {
  openModal: (dev: Developer | null, mode: ModalMode) => void;
  closeModal: () => void;
}

interface DeveloperModalProviderProps {
  children: React.ReactNode;
  setQuery?: React.Dispatch<React.SetStateAction<any>>;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const useDeveloperModal = () => {
  const context = useContext(ModalContext);
  if (!context) throw new Error('useDeveloperModal must be used within DeveloperModalProvider');
  return context;
};

export const DeveloperModalProvider: React.FC<DeveloperModalProviderProps> = ({ children, setQuery }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<ModalMode>('view');
  const [selectedDev, setSelectedDev] = useState<Developer | null>(null);

  const apiUrl = process.env.API_URL;

  const openModal = (dev: Developer | null, mode: ModalMode) => {
    setSelectedDev(dev);
    setModalMode(mode);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedDev(null);
  };

  const handleSubmit = async (dev: Developer) => {
    try {
      if (dev.userId) {
        await api.put(`${apiUrl}/developers/${dev.userId}`, dev);
      } else {
        await api.post(`${apiUrl}/developers`, dev);
      }
      // Trigger query refresh in the parent page
      setQuery(prev => ({ ...prev }));
    } catch (e) {
      console.error(e);
    }
    closeModal();
  };

  const handleDelete = async (dev: Developer) => {
    try {
      await api.delete(`${apiUrl}/developers/${dev.userId}`);
      setQuery(prev => ({ ...prev }));
    } catch (e) {
      console.error(e);
    }
    closeModal();
  };

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      <DeveloperModal
        open={modalOpen}
        onClose={closeModal}
        mode={modalMode}
        developer={selectedDev}
        onSubmit={handleSubmit}
        onDelete={handleDelete}
      />
    </ModalContext.Provider>
  );
};
