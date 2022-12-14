import React from 'react';
import './App.css';
import { Route, Redirect, Switch } from 'react-router-dom';
import ProductPage from './pages/Product';
import CustomerPage from './pages/Customer';

function App() {
  return (

    <Switch>
      <Redirect exact from="/" to="/product" />
      <Route path="/product" component={ ProductPage } />
      <Route path="/customer" component={ CustomerPage } />
    </Switch>

  );
}

export default App;
