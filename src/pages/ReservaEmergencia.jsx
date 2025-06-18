import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import TransactionForm from '@/components/TransactionForm';
import TransactionList from '@/components/TransactionList';
import StatCard from '@/components/StatCard';

const categoriasReserva = ['Depósito', 'Retirada'];

const ReservaEmergencia = ({ 
  reservaEmergencia = [], 
  addReservaEmergencia, 
  deleteItem 
}) => {
  // Cálculo do saldo
  const saldoReserva = reservaEmergencia.reduce((acc, item) => {
    return item.categoria === 'Depósito' 
      ? acc + Number(item.valor) 
      : acc - Number(item.valor);
  }, 0);

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center space-x-2">
          <ShieldCheck className="h-6 w-6 text-teal-500" />
          <h1 className="text-3xl font-bold tracking-tight">Reserva de Emergência</h1>
        </div>
        <p className="text-muted-foreground mt-1">Gerencie sua reserva para imprevistos</p>
      </motion.div>

      {/* Saldo */}
      <StatCard 
        title="Saldo da Reserva" 
        value={saldoReserva.toFixed(2)} 
        icon={ShieldCheck} 
        valuePrefix="R$ "
        className="border-l-4 border-teal-500"
      />
      
      {/* Formulário e Histórico */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Adicionar Movimentação</CardTitle>
            </CardHeader>
            <CardContent>
              <TransactionForm 
                onSubmit={addReservaEmergencia} 
                type="reservaEmergencia" 
                categorias={categoriasReserva}
              />
            </CardContent>
          </Card>
        </div>
        
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Histórico de Movimentações</CardTitle>
            </CardHeader>
            <CardContent>
              <TransactionList 
                items={reservaEmergencia} 
                onDelete={deleteItem} 
                type="reservaEmergencia"
                emptyMessage={
                  <div className="flex flex-col items-center gap-2">
                    <ShieldCheck className="h-12 w-12 text-gray-300" />
                    <span>Nenhuma movimentação registrada</span>
                  </div>
                }
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ReservaEmergencia;