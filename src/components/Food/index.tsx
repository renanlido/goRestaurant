import { useFood } from '../../hooks/useFood'

import { FiEdit3, FiTrash } from 'react-icons/fi';

import { Container } from './styles';

import { ToggleAvailableProps } from '../../types';



export function Food() {
  const { foods, toggleAvailableFood } = useFood();

  async function toggleAvailable({id, available}:ToggleAvailableProps ) {
     await toggleAvailableFood({id, available});
  }

  function handleEditFood(id: number) {
    return;
  }

  function handleDelete(id: number) {
    return;
  }
  
  return (
    <>
      {foods.map(food => (
        <Container key={food.id} available={food.available}>
          <header>
            <img src={food.image} alt={food.name} />
          </header>
          <section className="body">
            <h2>{food.name}</h2>
            <p>{food.description}</p>
            <p className="price">
              R$ <b>{food.price}</b>
            </p>
          </section>
          <section className="footer">
            <div className="icon-container">
              <button
                type="button"
                className="icon"
                onClick={() => handleEditFood(food.id)}
                data-testid={`edit-food-${food.id}`}
              >
                <FiEdit3 size={20} />
              </button>

              <button
                type="button"
                className="icon"
                onClick={() => handleDelete(food.id)}
                data-testid={`remove-food-${food.id}`}
              >
                <FiTrash size={20} />
              </button>
            </div>

            <div className="availability-container">
              <p>{food.available ? 'Disponível' : 'Indisponível'}</p>

              <label htmlFor={`available-switch-${food.id}`} className="switch">
                <input
                  id={`available-switch-${food.id}`}
                  type="checkbox"
                  checked={food.available}
                  onChange={() => toggleAvailable({id: food.id, available: food.available})}
                  data-testid={`change-status-food-${food.id}`}
                />
                <span className="slider" />
              </label>
            </div>
          </section>
        </Container>
      ))}
    </>
  );
}


// class extends Component {
//   constructor(props) {
//     super(props);

//     const { available } = this.props.food;
//     this.state = {
//       isAvailable: available
//     };
//     this.id = undefined;
//   }

//   toggleAvailable = async () => {
//     const { food } = this.props;
//     const { isAvailable } = this.state;

//     await api.put(`/foods/${food.id}`, {
//       ...food,
//       available: !isAvailable,
//     });

//     this.setState({ isAvailable: !isAvailable });
//   }

//   setEditingFood = () => {
//     const { food, handleEditFood } = this.props;

//     handleEditFood(food);
//   }

//   render() {
//     const { isAvailable } = this.state;
//     const { food, handleDelete } = this.props;


//   }
// };
