import React, { useState, useEffect, useCallback } from 'react';
import { HashRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { AnimatePresence } from 'framer-motion';

// Importações de componentes
import Layout from '@/components/Layout';
import Dashboard from '@/pages/Dashboard';
import Ganhos from '@/pages/Ganhos';
import Despesas from '@/pages/Despesas';
import DespesasPessoais from '@/pages/DespesasPessoais';
import ReservaEmergencia from '@/pages/ReservaEmergencia';
import Relatorios from '@/pages/Relatorios';

// Utilitários
const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
};

const AppContent = () => {
  // Estados para cada tipo de dado
  const [ganhos, setGanhos] = useLocalStorage('ganhos', []);
  const [despesasCarro, setDespesasCarro] = useLocalStorage('despesasCarro', []);
  const [despesasCombustivel, setDespesasCombustivel] = useLocalStorage('despesasCombustivel', []);
  const [despesasPessoais, setDespesasPessoais] = useLocalStorage('despesasPessoais', []);
  const [reservaEmergencia, setReservaEmergencia] = useLocalStorage('reservaEmergencia', []);

  // Função genérica para adicionar itens
  const handleAddItem = useCallback((type, data, setter) => {
    const newItem = { 
      ...data, 
      id: Date.now().toString(),
      data: new Date().toISOString() 
    };
    setter(prev => [...prev, newItem]);
  }, []);

  // Função genérica para remover itens
  const handleDeleteItem = useCallback((type, id, setter) => {
    setter(prev => prev.filter(item => item.id !== id));
  }, []);

  // Funções específicas para cada tipo
  const addGanho = useCallback((ganho) => 
    handleAddItem('ganhos', ganho, setGanhos), [handleAddItem]);
  
  const addDespesaCarro = useCallback((despesa) => 
    handleAddItem('despesasCarro', despesa, setDespesasCarro), [handleAddItem]);
  
  const addDespesaCombustivel = useCallback((despesa) => 
    handleAddItem('despesasCombustivel', despesa, setDespesasCombustivel), [handleAddItem]);
  
  const addDespesaPessoal = useCallback((despesa) => 
    handleAddItem('despesasPessoais', despesa, setDespesasPessoais), [handleAddItem]);
  
  const addReservaEmergencia = useCallback((reserva) => 
    handleAddItem('reservaEmergencia', reserva, setReservaEmergencia), [handleAddItem]);

  const deleteItem = useCallback((type, id) => {
    switch(type) {
      case 'ganhos': return handleDeleteItem(type, id, setGanhos);
      case 'despesasCarro': return handleDeleteItem(type, id, setDespesasCarro);
      case 'despesasCombustivel': return handleDeleteItem(type, id, setDespesasCombustivel);
      case 'despesasPessoais': return handleDeleteItem(type, id, setDespesasPessoais);
      case 'reservaEmergencia': return handleDeleteItem(type, id, setReservaEmergencia);
      default: console.warn(`Tipo desconhecido: ${type}`);
    }
  }, [handleDeleteItem]);

  const location = useLocation();

  return (
    <>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Layout />}>
            <Route index element={
              <Dashboard 
                financialData={{ ganhos, despesasCarro, despesasCombustivel, despesasPessoais, reservaEmergencia }} 
              />
            } />
            <Route path="ganhos" element={
              <Ganhos 
                ganhos={ganhos} 
                addGanho={addGanho} 
                deleteItem={deleteItem} 
              />
            } />
            <Route path="despesas" element={
              <Despesas
                despesasCarro={despesasCarro}
                despesasCombustivel={despesasCombustivel}
                addDespesaCarro={addDespesaCarro}
                addDespesaCombustivel={addDespesaCombustivel}
                deleteItem={deleteItem}
              />
            } />
            <Route path="despesas-pessoais" element={
              <DespesasPessoais
                despesasPessoais={despesasPessoais}
                addDespesaPessoal={addDespesaPessoal}
                deleteItem={deleteItem}
              />
            } />
            <Route path="reserva-emergencia" element={
              <ReservaEmergencia
                reservaEmergencia={reservaEmergencia}
                addReservaEmergencia={addReservaEmergencia}
                deleteItem={deleteItem}
              />
            } />
            <Route path="relatorios" element={
              <Relatorios 
                financialData={{ ganhos, despesasCarro, despesasCombustivel, despesasPessoais, reservaEmergencia }} 
              />
            } />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </AnimatePresence>
      <Toaster />
    </>
  );
};

const App = () => (
  <HashRouter>
    <AppContent />
  </HashRouter>
);

export default App;