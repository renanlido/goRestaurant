import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { api } from '../services/api';

import { Food, FoodInput, ToggleAvailableProps } from '../types';

interface CartProviderProps {
  children: ReactNode
}

interface updateFoodProps {
  id: number;
  data: FoodInput;
}

interface FoodContextData {
  foods: Food[];
  addFood: (food: FoodInput) => void;
  updateFood: ({ id, data }: updateFoodProps) => void;
  deleteFood: (id: number) => void;
  loadFoodFromId: (id: number) => Food;
  toggleAvailableFood: ({ id, isAvailable }: ToggleAvailableProps) => Promise<void>;
}

const FoodContext = createContext<FoodContextData>({} as FoodContextData);

export function FoodProvider({ children }: CartProviderProps) {
  const [foods, setFoods] = useState<Food[]>([]);

  useEffect(() => {
    async function loadFoods() {
      const apiFoods = await api.get<Food[]>('/foods').then(response => response.data);

      setFoods(apiFoods);
    }
    loadFoods();
  }, []);

  const addFood = (food: FoodInput) => {

    console.log(food);

  }

  const loadFoodFromId = (id: number) => {
    const loadedFood = foods.find(food => food.id === id);

    return loadedFood as Food;
  }

  const updateFood = async ({ id, data: inputModalData }: updateFoodProps) => {
    try {
      const currentFoods = [...foods];

      const { name, image, price, description } = inputModalData;

      const foodExists = currentFoods.find(food => food.id === id);

      if (foodExists) {
        foodExists.name = name;
        foodExists.image = image;
        foodExists.price = price;
        foodExists.description = description;

        const updatedData = {...inputModalData, available: foodExists.available }

        const response = await api.put<Food>(`/foods/${id}`, updatedData);

        setFoods(currentFoods);
        
        if(response) toast.success('Editado com sucesso');

        return;
      }

      throw Error;

    } catch {
      toast.error('Erro ao editar');
    }
  }

  const deleteFood = (id: number) => {

  }

  const toggleAvailableFood = async ({ id, isAvailable }: ToggleAvailableProps) => {
    try {
      const currentFoods = [...foods];

      const foodExists = currentFoods.find(food => food.id === id);

      if (foodExists) {
        foodExists.available = !isAvailable;

        await api.put<Food>(`/foods/${id}`, {
          ...foodExists,
          available: foodExists.available,
        }).then(response => console.log(response.data));

        setFoods(currentFoods);
      }
    } catch {
      toast.error('Erro na alteração de disponibilidade')
    }
  }


  return (
    <FoodContext.Provider
      value={{ foods, loadFoodFromId, addFood, updateFood, deleteFood, toggleAvailableFood }}
    >
      {children}
    </FoodContext.Provider>
  );
}

export function useFood() {
  const context = useContext(FoodContext);

  return context;
}