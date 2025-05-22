
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import TransactionList from '@/components/TransactionList'; 

const PersonalExpenseDetailsCard = ({ despesas }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Detalhes das Despesas Pessoais</CardTitle>
      </CardHeader>
      <CardContent>
        {despesas && despesas.length > 0 ? (
          <TransactionList 
            items={despesas} 
            onDelete={() => {}} 
            type="despesasPessoais"
            emptyMessage="Nenhuma despesa pessoal registrada para este período."
            showDeleteButton={false} 
          />
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <p>Nenhuma despesa pessoal registrada para este período.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PersonalExpenseDetailsCard;
