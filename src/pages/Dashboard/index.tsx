import { Food } from '../../components/Food';

import { FoodsContainer } from './styles';

export function Dashboard() {

  return (
    <>
    <FoodsContainer data-testid="foods-list">
      <Food />
      </FoodsContainer>
    </>
  );
}