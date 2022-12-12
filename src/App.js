import React from 'react';
import './App.css';
import { Route, Redirect, Switch } from 'react-router-dom';
import ProductPage from './pages/Product';

function App() {
  return (

    <Switch>
      <Redirect exact from="/" to="/product" />
      <Route path="/product" component={ ProductPage } />
    </Switch>

  );
}

export default App;
