import { FoodCard } from '../../components/FoodCard';

import { FoodsContainer } from './styles';

interface DashboardProps {
  onOpenEditFoodModal: (id: string)=> void;
}

export function Dashboard({onOpenEditFoodModal}: DashboardProps) {

  return (
    <>
    <FoodsContainer data-testid="foods-list">
      <FoodCard onOpenEditFoodModal={onOpenEditFoodModal}/>
      </FoodsContainer>
    </>
  );
}