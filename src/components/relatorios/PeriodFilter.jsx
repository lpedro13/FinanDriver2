
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { format, parseISO } from 'date-fns';

const PeriodFilter = ({ 
  periodoFiltro, 
  setPeriodoFiltro, 
  nomePeriodo, 
  opcoesAdicionais = false,
  dataEspecifica,
  setDataEspecifica
}) => {

  const handleDateChange = (e) => {
    if (setDataEspecifica) {
      setDataEspecifica(e.target.value);
    }
  };
  
  const today = format(new Date(), "yyyy-MM-dd");

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg shadow">
      <div className="flex-1">
        <h2 className="text-xl font-semibold whitespace-nowrap text-gray-700 dark:text-gray-200">
          Período: {nomePeriodo}
        </h2>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
        {opcoesAdicionais && periodoFiltro === 'diario' && setDataEspecifica && (
          <div className="space-y-1 w-full sm:w-auto">
            <Label htmlFor="data-especifica" className="text-sm font-medium text-gray-600 dark:text-gray-300">Selecionar Dia</Label>
            <Input
              id="data-especifica"
              type="date"
              value={dataEspecifica || today}
              onChange={handleDateChange}
              className="w-full sm:w-40 bg-white dark:bg-gray-700"
            />
          </div>
        )}
        <div className="space-y-1 w-full sm:w-auto">
          <Label htmlFor="period-select" className="text-sm font-medium text-gray-600 dark:text-gray-300">Filtrar Período</Label>
          <Select value={periodoFiltro} onValueChange={setPeriodoFiltro}>
            <SelectTrigger id="period-select" className="w-full sm:w-48 bg-white dark:bg-gray-700">
              <SelectValue placeholder="Selecione o período" />
            </SelectTrigger>
            <SelectContent>
              {opcoesAdicionais && <SelectItem value="diario">Diário</SelectItem>}
              {opcoesAdicionais && <SelectItem value="semanal">Semanal (Atual)</SelectItem>}
              <SelectItem value="mensal">Mês atual</SelectItem>
              <SelectItem value="anual">Ano atual</SelectItem>
              <SelectItem value="geral">Todo o período</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default PeriodFilter;
