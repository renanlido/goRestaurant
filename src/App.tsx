import { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Modal from 'react-modal';

import { FoodProvider } from './hooks/useFood';

import { ToastContainer } from 'react-toastify'
import { Header } from './components/Header';
import { ModalAddFood } from './components/ModalAddFood';


import { Routes } from './routes';

import GlobalStyles from './styles/global';

Modal.setAppElement('#root');


export function App() {

const [addFoodModalIsOpen, setAddFoodModalIsOpen] = useState(false);

function handleOpenModalAddFood(){
  setAddFoodModalIsOpen(true)
}

function handleCloseModalAddFood() {
  setAddFoodModalIsOpen(false);
}

  return (
    <FoodProvider>
      <Router>
        <GlobalStyles />
        <Header onOpenAddFoodModal={handleOpenModalAddFood}/>
        <Routes />
        <ModalAddFood
          isOpen={addFoodModalIsOpen}
          onRequestClose={handleCloseModalAddFood}
        />
        <ToastContainer autoClose={3000} />
      </Router>
    </FoodProvider>

  )

}

export default App;
