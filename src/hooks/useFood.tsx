import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { api } from '../services/api';

import { Food, FoodInput, ToggleAvailableProps } from '../types';

interface CartProviderProps {
  children: ReactNode
}

interface FoodContextData {
  foods: Food[];
  addFood: (food: FoodInput) => void;
  toggleAvailableFood: ({id, isAvailable}: ToggleAvailableProps) => Promise<void>;
}

const FoodContext = createContext<FoodContextData>({} as FoodContextData);

export function FoodProvider({ children }: CartProviderProps) {
  const [foods, setFoods] = useState<Food[]>([]);

  useEffect(() => {
      async function loadFoods(){
        const apiFoods = await api.get<Food[]>('/foods').then(response => response.data);
        
        setFoods(apiFoods);
      }
      loadFoods();
  }, []);

  const addFood = (food: FoodInput) => {

    console.log(food);

  }

  const toggleAvailableFood = async ({id, isAvailable}: ToggleAvailableProps) => {
   try {
    const currentFoods = [...foods];

    const foodExists = currentFoods.find(food => food.id === id);

    if(foodExists) {
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
      value={{ foods, addFood, toggleAvailableFood }}
    >
      {children}
    </FoodContext.Provider>
  );
}

export function useFood() {
  const context = useContext(FoodContext);

  return context;
}