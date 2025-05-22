import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const CategoryCard = ({ title, data }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {Object.keys(data).length > 0 ? (
          <div className="space-y-3">
            {Object.entries(data)
              .sort(([, a], [, b]) => b - a)
              .map(([categoria, valor]) => (
                <div key={categoria} className="flex justify-between items-center">
                  <span>{categoria}</span>
                  <span className="font-medium">
                    R$ {valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </span>
                </div>
              ))}
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <p>Nenhuma despesa registrada neste período</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const CategoryAnalysis = ({ dados }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <CategoryCard title="Despesas do Carro" data={dados.despesasCarroPorCategoria} />
      <CategoryCard title="Despesas de Combustível" data={dados.despesasCombustivelPorCategoria} />
      <CategoryCard title="Despesas Pessoais" data={dados.despesasPessoaisPorCategoria} />
    </div>
  );
};

export default CategoryAnalysis;
