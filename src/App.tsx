import { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Modal from 'react-modal';

import { FoodProvider } from './hooks/useFood';

import { ToastContainer } from 'react-toastify'
import { Header } from './components/Header';
import { ModalAddFood } from './components/ModalAddFood';


import { Routes } from './routes';

import GlobalStyles from './styles/global';
import { ModalEditFood } from './components/ModalEditFood';

Modal.setAppElement('#root');


export function App() {

  const [addFoodModalIsOpen, setAddFoodModalIsOpen] = useState(false);
  const [editFoodModalIsOpen, setEditFoodModalIsOpen] = useState(false);
  const [dataId, setDataId] = useState('');

  function handleOpenModalAddFood() {
    setAddFoodModalIsOpen(true)
  }

  function handleCloseModalAddFood() {
    setAddFoodModalIsOpen(false);
  }

  function handleOpenModalEditFood(id: string) {
    setEditFoodModalIsOpen(true)
    setDataId(id);
  }

  function handleCloseModalEditFood() {
    setEditFoodModalIsOpen(false);
  }


  return (
    <Router>
      <FoodProvider>
        <GlobalStyles />
        <Header onOpenAddFoodModal={handleOpenModalAddFood} />
        <Routes onOpenEditFoodModal={handleOpenModalEditFood} />
        <ModalAddFood
          isOpen={addFoodModalIsOpen}
          onRequestClose={handleCloseModalAddFood}
        />
        <ModalEditFood
          isOpen={editFoodModalIsOpen}
          onRequestClose={handleCloseModalEditFood}
          dataId={dataId}
        />
        <ToastContainer autoClose={3000} />
      </FoodProvider>
    </Router>

  )

}

export default App;
