import { FoodCard } from '../../components/FoodCard';

import { FoodsContainer } from './styles';

export function Dashboard() {

  return (
    <>
    <FoodsContainer data-testid="foods-list">
      <FoodCard />
      </FoodsContainer>
    </>
  );
}