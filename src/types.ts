export interface Food {
  id: string;
  name: string;
  description: string;
  price: string;
  available: boolean;
  image: string;
}

export type FoodInput = Omit<Food, 'id' >

export interface ToggleAvailableProps {
  id: string;
  isAvailable: boolean;
}

export interface ModalFoodProps {
  isOpen: boolean;
  onRequestClose: ()=> void;
}