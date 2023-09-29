import React from 'react';
import ReactDOM from 'react-dom/client';

import { ChakraProvider } from '@chakra-ui/react';

import { App } from './App.jsx';
import { ToDoProvider } from './contexts/TodoContext';

import { theme } from './theme.js';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <ToDoProvider>
        <App />
      </ToDoProvider>
    </ChakraProvider>
  </React.StrictMode>
);
