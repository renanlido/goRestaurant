export interface Food {
  id: number;
  name: string;
  description: string;
  price: number;
  available: boolean;
  image: string;
}

export type FoodInput = Omit<Food, 'id'>

export interface ToggleAvailableProps {
  id: number;
  available: boolean;
}