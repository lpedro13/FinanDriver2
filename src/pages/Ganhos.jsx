import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import TransactionForm from '@/components/TransactionForm';
import TransactionList from '@/components/TransactionList';

const categoriasGanhos = ['Corrida', 'Entrega', 'Gorjeta', 'Bônus', 'Outro'];

const Ganhos = ({ 
  ganhos, 
  addGanho,
  deleteItem,
  loading = false 
}) => {
  const [localLoading, setLocalLoading] = useState(false);

  const handleAddGanho = async (ganhoData) => {
    setLocalLoading(true);
    try {
      await addGanho(ganhoData);
    } catch (error) {
      console.error('Erro ao adicionar ganho:', error);
    } finally {
      setLocalLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="flex items-center space-x-2">
          <TrendingUp className="h-6 w-6 text-green-500" />
          <h1 className="text-3xl font-bold tracking-tight">Ganhos</h1>
        </div>
        <p className="text-muted-foreground mt-1">Registre seus ganhos diários</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Adicionar Ganho</CardTitle>
            </CardHeader>
            <CardContent>
              <TransactionForm 
                onSubmit={handleAddGanho} 
                type="ganhos" 
                categorias={categoriasGanhos}
              />
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Histórico de Ganhos</CardTitle>
            </CardHeader>
            <CardContent>
              {(loading || localLoading) ? <div>Carregando...</div> : (
                <TransactionList 
                  items={ganhos || []} 
                  onDelete={deleteItem} 
                  type="ganhos"
                  emptyMessage="Nenhum ganho registrado ainda. Adicione seu primeiro ganho!"
                />
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Ganhos;