import { useState } from 'react';
import { FiCheckSquare } from 'react-icons/fi';
import Modal from 'react-modal';

import { useFood } from '../../hooks/useFood';

import { Form } from './styles';
import Input from '../Input';
import { ModalFoodProps } from '../../types';


export function ModalAddFood({ isOpen, onRequestClose }: ModalFoodProps){
  const { addFood } = useFood();

  const [srcImage, setSrcImage] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');

  async function handleAddNewFood() {
    const food = { 
      image: srcImage,
      name,
      available: true,
      price,
      description,
    }

    addFood(food);
    onRequestClose();
  }

  return (
    <Modal 
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      ariaHideApp={false}
      overlayClassName='react-modal-overlay'
      className='react-modal-content'
      >

      <Form onSubmit={handleAddNewFood}>
        <h1>Novo Prato</h1>
        <Input 
          name="image"
          placeholder="Cole o link aqui"
          onChange={event => setSrcImage(event.target.value)}
        />

        <Input
          name="name"
          placeholder="Ex: Moda Italiana"
          onChange={event => setName(event.target.value)}
        />

        <Input
          name="price"
          placeholder="Ex: 19.90"
          onChange={event => setPrice(event.target.value)}
        />

        <Input
          name="description"
          placeholder="Descrição"
          onChange={event => setDescription(event.target.value)}   
        />

        <button type="submit" data-testid="add-food-button">
          <p className="text">Adicionar Prato</p>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );

}