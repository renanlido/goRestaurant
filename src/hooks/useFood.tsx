import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

import { api } from '../services/api';

import { Food, FoodInput, ToggleAvailableProps } from '../types';

interface CartProviderProps {
  children: ReactNode
}

interface updateFoodProps {
  id: string;
  data: FoodInput;
}

interface FoodContextData {
  foods: Food[];
  addFood: (food: FoodInput) => void;
  updateFood: ({ id, data }: updateFoodProps) => void;
  deleteFood: (id: string) => void;
  loadFoodFromId: (id: string) => Food;
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

  const addFood = async (food: FoodInput) => {
    try {
      const currentFoods = [...foods];
      const id = uuidv4();

      const newFood = { ...food, id };

      const response = await api.post<Food>(`/foods`, newFood);

      if (response) {
        currentFoods.push(newFood);

        setFoods(currentFoods);

        toast.success('Prato adicionado com sucesso!');

        return;
      }

      toast.error('Houve algum erro ao adicionar o produto.');
    } catch {
      toast.error('Erro ao adicionar!');
    }


  }

  const loadFoodFromId = (id: string) => {
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

        const updatedData = { ...inputModalData, available: foodExists.available }

        const response = await api.put<Food>(`/foods/${id}`, updatedData);

        setFoods(currentFoods);

        if (response) toast.success('Editado com sucesso');

        return;
      }

      throw Error;

    } catch {
      toast.error('Erro ao editar');
    }
  }

  const deleteFood = (id: string) => {
    try {
      const currentFoods = [...foods];

      const foodExists = currentFoods.find(food => food.id === id);

      if (foodExists) {
        const foodByIndex = currentFoods.findIndex(food => food.id === id);

        currentFoods.splice(foodByIndex, 1);

        api.delete(`/foods/${id}`);

        setFoods(currentFoods);

        toast.success('Prato deletado com sucesso!');
      }
    } catch {
      toast.error('Erro ao deletar prato.');
    }
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
