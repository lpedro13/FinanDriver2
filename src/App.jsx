import React, { useState, useEffect, useCallback } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { AnimatePresence } from 'framer-motion';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import {
  getDespesasCarro as getDespesasCarroSupabase,
  getDespesasCombustivel as getDespesasCombustivelSupabase,
  getDespesasPessoais as getDespesasPessoaisSupabase,
  getReservasEmergencia as getReservasEmergenciaSupabase,
  getGanhos as getGanhosSupabase,
  addDespesaCarro as addDespesaCarroSupabase,
  addDespesaCombustivel as addDespesaCombustivelSupabase,
  addDespesaPessoal as addDespesaPessoalSupabase,
  addReservaEmergencia as addReservaEmergenciaSupabase,
  addGanho as addGanhoSupabase,
  deleteDespesaCarro as deleteDespesaCarroSupabase,
  deleteDespesaCombustivel as deleteDespesaCombustivelSupabase,
  deleteDespesaPessoal as deleteDespesaPessoalSupabase,
  deleteReservaEmergencia as deleteReservaEmergenciaSupabase,
  deleteGanho as deleteGanhoSupabase
} from '@/services/supabaseService';  // Agora vamos usar o Supabase

import Dashboard from '@/pages/Dashboard';
import Ganhos from '@/pages/Ganhos';
import Despesas from '@/pages/Despesas';
import DespesasPessoais from '@/pages/DespesasPessoais';
import Relatorios from '@/pages/Relatorios';
import ReservaEmergencia from '@/pages/ReservaEmergencia';
import Layout from '@/components/Layout';
import LoginPage from '@/pages/LoginPage';
import RegisterPage from '@/pages/RegisterPage';
import ProtectedRoute from '@/components/ProtectedRoute';

const AppContent = () => {
  const { currentUser, loading } = useAuth();
  const [financialData, setFinancialData] = useState({
    ganhos: [],
    despesasCarro: [],
    despesasCombustivel: [],
    despesasPessoais: [],
    reservaEmergencia: [],
  });

  useEffect(() => {
    const loadFinancialData = async () => {
      if (currentUser) {
        try {
          const [
            ganhos,
            despesasCarro,
            despesasCombustivel,
            despesasPessoais,
            reservaEmergencia,
          ] = await Promise.all([
            getGanhosSupabase(currentUser.id),
            getDespesasCarroSupabase(currentUser.id),
            getDespesasCombustivelSupabase(currentUser.id),
            getDespesasPessoaisSupabase(currentUser.id),
            getReservasEmergenciaSupabase(currentUser.id),
          ]);

          setFinancialData({
            ganhos,
            despesasCarro,
            despesasCombustivel,
            despesasPessoais,
            reservaEmergencia,
          });
        } catch (error) {
          console.error('Erro ao carregar dados financeiros:', error);
        }
      }
    };

    loadFinancialData();
  }, [currentUser]);

  const addToList = useCallback((listName, item) => {
    setFinancialData(prev => ({
      ...prev,
      [listName]: [...(prev[listName] || []), item]
    }));
  }, []);

  const addGanho = useCallback(async (ganho) => {
    if (!currentUser) return;
    await addGanhoSupabase(currentUser.id, ganho);
    addToList('ganhos', ganho);
  }, [addToList, currentUser]);

  const addDespesaCarro = useCallback(async (despesa) => {
    if (!currentUser) return;
    await addDespesaCarroSupabase(currentUser.id, despesa);
    addToList('despesasCarro', despesa);
  }, [addToList, currentUser]);

  const addDespesaCombustivel = useCallback(async (despesa) => {
    if (!currentUser) return;
    await addDespesaCombustivelSupabase(currentUser.id, despesa);
    addToList('despesasCombustivel', despesa);
  }, [addToList, currentUser]);

  const addDespesaPessoal = useCallback(async (despesa) => {
    if (!currentUser) return;
    await addDespesaPessoalSupabase(currentUser.id, despesa);
    addToList('despesasPessoais', despesa);
  }, [addToList, currentUser]);

  const addReservaEmergencia = useCallback(async (reserva) => {
    if (!currentUser) return;
    await addReservaEmergenciaSupabase(currentUser.id, reserva);
    addToList('reservaEmergencia', reserva);
  }, [addToList, currentUser]);

  const deleteItem = useCallback(async (type, id) => {
    if (!currentUser) return;

    try {
      switch (type) {
        case 'ganhos':
          await deleteGanhoSupabase(currentUser.id, id);
          break;
        case 'despesasCarro':
          await deleteDespesaCarroSupabase(currentUser.id, id);
          break;
        case 'despesasCombustivel':
          await deleteDespesaCombustivelSupabase(currentUser.id, id);
          break;
        case 'despesasPessoais':
          await deleteDespesaPessoalSupabase(currentUser.id, id);
          break;
        case 'reservaEmergencia':
          await deleteReservaEmergenciaSupabase(currentUser.id, id);
          break;
        default:
          console.warn(`Tipo de item não reconhecido: ${type}`);
          return;
      }

      setFinancialData(prev => ({
        ...prev,
        [type]: prev[type].filter(item => item.id !== id),
      }));
    } catch (error) {
      console.error(`Erro ao deletar item (${type} - ${id}):`, error);
    }
  }, [currentUser]);

  const location = useLocation();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800">
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-xl">
          <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">Carregando Aplicação...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Layout />}>
              <Route index element={<Dashboard financialData={financialData} />} />
              <Route path="ganhos" element={<Ganhos ganhos={financialData.ganhos} addGanho={addGanho} deleteItem={deleteItem} />} />
              <Route path="despesas" element={
                <Despesas
                  despesasCarro={financialData.despesasCarro}
                  despesasCombustivel={financialData.despesasCombustivel}
                  addDespesaCarro={addDespesaCarro}
                  addDespesaCombustivel={addDespesaCombustivel}
                  deleteItem={deleteItem}
                />
              } />
              <Route path="despesas-pessoais" element={
                <DespesasPessoais
                  despesasPessoais={financialData.despesasPessoais}
                  addDespesaPessoal={addDespesaPessoal}
                  deleteItem={deleteItem}
                />
              } />
              <Route path="reserva-emergencia" element={
                <ReservaEmergencia
                  reservaEmergencia={financialData.reservaEmergencia}
                  addReservaEmergencia={addReservaEmergencia}
                  deleteItem={deleteItem}
                />
              } />
              <Route path="relatorios" element={<Relatorios financialData={financialData} />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Route>
        </Routes>
      </AnimatePresence>
      <Toaster />
    </>
  );
};

const App = () => (
  <AuthProvider>
    <AppContent />
  </AuthProvider>
);

export default App;
