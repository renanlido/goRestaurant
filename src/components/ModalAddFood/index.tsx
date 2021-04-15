import { useState } from 'react';
import { FiCheckSquare } from 'react-icons/fi';
import Modal from 'react-modal';

import { useFood } from '../../hooks/useFood';

import { Form } from './styles';
import Input from '../Input';

interface ModalAddFoodProps {
  isOpen: boolean;
  onRequestClose: ()=> void;
}


export function ModalAddFood({ isOpen, onRequestClose }: ModalAddFoodProps){
  const { addFood } = useFood();

  const [srcImage, setSrcImage] = useState('');
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState('');

  async function handleAddNewFood() {
    
    await addFood({
      available: true,
      description,
      image: srcImage,
      name: title,
      price
    });
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
          onChange={event => setTitle(event.target.value)}
        />

        <Input
          name="price"
          placeholder="Ex: 19.90"
          onChange={event => setPrice(Number(event.target.value))}
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




// class ModalAddFood extends Component {
//   constructor(props) {
//     super(props);

//     this.formRef = createRef();
//   }

//   handleSubmit = async data => {
//     const { setIsOpen, handleAddFood } = this.props;

//     handleAddFood(data);
//     setIsOpen();
//   };

//   render() {
//     const { isOpen, setIsOpen } = this.props;

   
//   }
// };


