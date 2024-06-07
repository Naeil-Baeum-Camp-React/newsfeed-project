import { produce } from 'immer';
import { createContext, useContext, useState } from 'react';

import Modal from '../components/modal/Modal';

const initialState = {
  title: '',
  description: '',
  isShow: false,
};

const ModalContext = createContext({
  openModal: () => {},
  closeModal: () => {},
});

export function ModalProvider({ children }) {
  const [modalData, setModalData] = useState(initialState);

  const value = {
    openModal: (title, description) => {
      setModalData({
        title: title,
        description: description,
        isShow: true,
      });
    },
    closeModal: () => {
      setModalData((prevState) =>
        produce(prevState, (draft) => {
          draft.isShow = false;
        })
      );
    },
  };
  return (
    <ModalContext.Provider value={value}>
      {children}
      {modalData.isShow && <Modal title={modalData.title} description={modalData.description} />}
    </ModalContext.Provider>
  );
}

export const useModal = () => useContext(ModalContext);
