import { FiCheckSquare } from 'react-icons/fi';
import Modal from 'react-modal';

import { useFood } from '../../hooks/useFood';

import Input from '../Input';

import { Form } from './styles';

import { FoodInput, ModalFoodProps } from '../../types';

interface ModalEditFoodProps extends ModalFoodProps {
  dataId: number;
}

export function ModalEditFood({ isOpen, onRequestClose, dataId}: ModalEditFoodProps) {
  const { loadFoodFromId, updateFood } = useFood();

  const food = loadFoodFromId(dataId);

  async function handleEditFood(data: FoodInput) {
   updateFood({id: dataId, data});

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
      <Form onSubmit={handleEditFood} initialData={food} >
        <h1>Editar Prato</h1>
        <Input 
          name="image" 
          placeholder="Cole o link aqui"
        />

        <Input
          name="name" 
          placeholder="Ex: Moda Italiana"
        />
        <Input 
          name="price"
          placeholder="Ex: 19.90"
          />

        <Input 
          name="description" 
          placeholder="Descrição"
        />

        <button type="submit" data-testid="edit-food-button">
          <div className="text">Editar Prato</div>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
  
}
