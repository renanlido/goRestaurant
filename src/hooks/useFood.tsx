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
  toggleAvailableFood: ({id, available}: ToggleAvailableProps) => Promise<void>;
}

const FoodContext = createContext<FoodContextData>({} as FoodContextData);

export function FoodProvider({ children }: CartProviderProps) {
  const [foods, setFoods] = useState<Food[]>([]);

  useEffect(() => {
      api.get<Food[]>('/foods').then(response => setFoods(response.data));
  }, []);

  const addFood = (food: FoodInput) => {

    console.log(food);

  }

  const toggleAvailableFood = async ({id, available}: ToggleAvailableProps) => {
   try {
    const currentFoods = [...foods];

    const food = currentFoods.find(food => food.id === id);
    
    if(food) {
      food.available = !available;
      setFoods(currentFoods);

      await api.put<Food>(`/foods/${id}`, {
        ...food,
        available: !food?.available,
      }).then(response => response.data);
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