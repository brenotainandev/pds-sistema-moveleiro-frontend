import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Cliente from './Cliente';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
    <FormCliente />
  </React.StrictMode>
);