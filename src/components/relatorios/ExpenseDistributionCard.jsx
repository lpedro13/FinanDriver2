import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

const ExpenseDistributionCard = ({ dados }) => {
  const totalDespesasVisiveisNaBarra = dados.totalDespesasCarro + dados.totalDespesasCombustivel + dados.totalDespesasPessoais + dados.depositosReserva;

  const getWidthPercentage = (value) => {
    if (totalDespesasVisiveisNaBarra <= 0) return '0%';
    return `${(value / totalDespesasVisiveisNaBarra) * 100}%`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Distribuição de Despesas</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Label className="text-sm text-muted-foreground">Composição das Despesas Totais</Label>
            <div className="mt-2 space-y-2">
              <div className="flex justify-between items-center">
                <span>Despesas do Carro</span>
                <span className="font-medium">
                  R$ {dados.totalDespesasCarro.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span>Despesas de Combustível</span>
                <span className="font-medium">
                  R$ {dados.totalDespesasCombustivel.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span>Despesas Pessoais</span>
                <span className="font-medium">
                  R$ {dados.totalDespesasPessoais.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </span>
              </div>
               {dados.depositosReserva > 0 && (
                <div className="flex justify-between items-center">
                    <span>Depósitos Reserva Emerg.</span>
                    <span className="font-medium text-teal-500">
                        R$ {dados.depositosReserva.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </span>
                </div>
               )}
            </div>
          </div>
          
          <Separator />
          
          <div>
            <Label className="text-sm text-muted-foreground">Proporção de Despesas</Label>
            <div className="mt-4 h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden flex">
              {totalDespesasVisiveisNaBarra > 0 && (
                <>
                  <div 
                    className="h-full bg-red-500" 
                    style={{ width: getWidthPercentage(dados.totalDespesasCarro) }}
                    title={`Carro: ${getWidthPercentage(dados.totalDespesasCarro)}`}
                  />
                  <div 
                    className="h-full bg-orange-500" 
                    style={{ width: getWidthPercentage(dados.totalDespesasCombustivel) }}
                    title={`Combustível: ${getWidthPercentage(dados.totalDespesasCombustivel)}`}
                  />
                  <div 
                    className="h-full bg-purple-500" 
                    style={{ width: getWidthPercentage(dados.totalDespesasPessoais) }}
                    title={`Pessoais: ${getWidthPercentage(dados.totalDespesasPessoais)}`}
                  />
                   <div 
                    className="h-full bg-teal-500" 
                    style={{ width: getWidthPercentage(dados.depositosReserva) }}
                    title={`Reserva: ${getWidthPercentage(dados.depositosReserva)}`}
                  />
                </>
              )}
            </div>
            <div className="mt-2 flex flex-wrap justify-around text-xs">
              <div className="flex items-center m-1">
                <div className="w-3 h-3 bg-red-500 rounded-full mr-1" />
                <span>Carro</span>
              </div>
              <div className="flex items-center m-1">
                <div className="w-3 h-3 bg-orange-500 rounded-full mr-1" />
                <span>Combustível</span>
              </div>
              <div className="flex items-center m-1">
                <div className="w-3 h-3 bg-purple-500 rounded-full mr-1" />
                <span>Pessoais</span>
              </div>
              <div className="flex items-center m-1">
                <div className="w-3 h-3 bg-teal-500 rounded-full mr-1" />
                <span>Reserva</span>
              </div>
            </div>
          </div>
          
          <Separator />
          
          <div>
            <Label className="text-sm text-muted-foreground">Eficiência Financeira (Lucro Líquido / Ganhos)</Label>
            <div className="mt-2">
              <div className="flex justify-between items-center">
                <span>Percentual de Lucro</span>
                <span className="font-medium">
                  {dados.totalGanhos > 0 
                    ? `${((dados.lucroLiquido / dados.totalGanhos) * 100).toFixed(1)}%` 
                    : '0%'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExpenseDistributionCard;
