import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import TransactionList from '@/components/TransactionList';
import { Separator } from '@/components/ui/separator';

const DetailedCategoryCard = ({ title, items, total }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {items && items.length > 0 ? (
          <>
            <TransactionList 
              items={items} 
              onDelete={() => {}} 
              type="relatorio" 
              emptyMessage={`Nenhuma despesa de ${title.toLowerCase()} registrada para este período.`}
              showDeleteButton={false}
            />
            <Separator className="my-4" />
            <div className="flex justify-between items-center font-bold text-lg">
              <span>Total {title}</span>
              <span>R$ {total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
            </div>
          </>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <p>Nenhuma despesa de {title.toLowerCase()} registrada para este período.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const CategoryAnalysisSection = ({ dados }) => {
  return (
    <div className="space-y-6">
      <DetailedCategoryCard 
        title="Despesas do Carro" 
        items={dados.despesasCarroDetalhadas} 
        total={dados.totalDespesasCarro} 
      />
      <DetailedCategoryCard 
        title="Despesas de Combustível" 
        items={dados.despesasCombustivelDetalhadas} 
        total={dados.totalDespesasCombustivel} 
      />
      <DetailedCategoryCard 
        title="Despesas Pessoais" 
        items={dados.despesasPessoaisDetalhadas} 
        total={dados.totalDespesasPessoais} 
      />
    </div>
  );
};

export default CategoryAnalysisSection;
