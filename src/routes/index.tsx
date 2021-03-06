import { Switch, Route } from 'react-router-dom';

import { Dashboard } from '../pages/Dashboard';

interface RoutesProps {
  onOpenEditFoodModal: (id: string)=> void;
}

export const Routes = ({onOpenEditFoodModal}:RoutesProps) => (
  <Switch>
    <Route path="/" exact render={ ()=> <Dashboard onOpenEditFoodModal={onOpenEditFoodModal}/> }/>
  </Switch>
);

