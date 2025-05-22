
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { TrendingUp, TrendingDown } from 'lucide-react';

const FinancialSummary = ({ dados }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Resumo Financeiro</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <TrendingUp className="h-5 w-5 text-green-500 mr-2" />
              <span>Ganhos Totais</span>
            </div>
            <span className="font-medium text-green-600">
              R$ {dados.totalGanhos.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </span>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <TrendingDown className="h-5 w-5 text-red-500 mr-2" />
              <span>Despesas de Trabalho</span>
            </div>
            <span className="font-medium text-red-600">
              R$ {dados.totalDespesasTrabalho.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </span>
          </div>
          
          <Separator />
          
          <div className="flex justify-between items-center">
            <span className="font-medium">Lucro Líquido</span>
            <span className={`font-bold ${dados.lucroLiquido >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              R$ {dados.lucroLiquido.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </span>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <TrendingDown className="h-5 w-5 text-purple-500 mr-2" />
              <span>Despesas Pessoais</span>
            </div>
            <span className="font-medium text-purple-600">
              R$ {dados.totalDespesasPessoais.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </span>
          </div>
          
          <Separator />
          
          <div className="flex justify-between items-center">
            <span className="font-medium">Saldo Final</span>
            <span className={`font-bold text-lg ${dados.saldoFinal >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              R$ {dados.saldoFinal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FinancialSummary;
