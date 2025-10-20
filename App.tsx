import { QueryClientProvider } from '@tanstack/react-query';
import  React from 'react';
import {Provider as ReduxProvider} from 'react-redux';
import CalculatorScreen from './src/screens/CalculatorScreen';
import { store } from './src/store/store';
import { QueryClients } from './src/queries/queryClient';

export default function App() {
  return (
    <ReduxProvider store={store}>
      <QueryClientProvider client={QueryClients}>
        <CalculatorScreen />
      </QueryClientProvider>
    </ReduxProvider>
  );
}