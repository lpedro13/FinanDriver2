import React from 'react';
import { motion } from 'framer-motion';
import { CreditCard } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import TransactionForm from '@/components/TransactionForm';
import TransactionList from '@/components/TransactionList';

const categoriasDespesasPessoais = [
  'Alimentação',
  'Moradia',
  'Saúde',
  'Educação',
  'Lazer',
  'Vestuário',
  'Transporte',
  'Contas',
  'Outro'
];

const DespesasPessoais = ({ despesasPessoais, addDespesaPessoal, deleteItem }) => {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center space-x-2">
          <CreditCard className="h-6 w-6 text-purple-500" />
          <h1 className="text-3xl font-bold tracking-tight">Despesas Pessoais</h1>
        </div>
        <p className="text-muted-foreground mt-1">Gerencie suas despesas pessoais e pagamentos de contas</p>
      </motion.div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Adicionar Despesa Pessoal</CardTitle>
            </CardHeader>
            <CardContent>
              <TransactionForm 
                onSubmit={addDespesaPessoal} 
                type="despesasPessoais" 
                categorias={categoriasDespesasPessoais}
                successMessage="Despesa registrada com sucesso!"  // Exemplo de feedback
              />
            </CardContent>
          </Card>
        </div>
        
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Histórico de Despesas Pessoais</CardTitle>
            </CardHeader>
            <CardContent>
              <TransactionList 
                items={despesasPessoais} 
                onDelete={deleteItem} 
                type="despesasPessoais"
                emptyMessage="Nenhuma despesa pessoal registrada ainda."
                noDataIcon={<CreditCard className="h-12 w-12 text-gray-300" />}  // Ícone visual para quando não houver dados
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DespesasPessoais;
