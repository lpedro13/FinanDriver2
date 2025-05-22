import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart2, PieChart, CalendarDays } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import PeriodFilter from '@/components/relatorios/PeriodFilter';
import FinancialSummaryCard from '@/components/relatorios/FinancialSummaryCard';
import ExpenseDistributionCard from '@/components/relatorios/ExpenseDistributionCard';
import CategoryAnalysisSection from '@/components/relatorios/CategoryAnalysisSection';
import { filtrarDadosPorPeriodoRelatorios, getNomePeriodoAtual } from '@/lib/relatoriosUtils';
import { format } from 'date-fns';

const Relatorios = ({ financialData }) => {
  const [periodoFiltro, setPeriodoFiltro] = useState('mensal');
  const [dataEspecifica, setDataEspecifica] = useState(format(new Date(), "yyyy-MM-dd"));
  const [loading, setLoading] = useState(false);  // Novo estado de loading
  
  const safeFinancialData = useMemo(() => ({
    ganhos: financialData?.ganhos || [],
    despesasCarro: financialData?.despesasCarro || [],
    despesasCombustivel: financialData?.despesasCombustivel || [],
    despesasPessoais: financialData?.despesasPessoais || [],
    reservaEmergencia: financialData?.reservaEmergencia || [],
  }), [financialData]);

  const dadosFiltrados = useMemo(() => {
    setLoading(true);  // Inicia o carregamento

    const dataParaFiltro = periodoFiltro === 'diario' ? dataEspecifica : null;
    const {
      ganhosFiltrados,
      despesasCarroFiltradas,
      despesasCombustivelFiltradas,
      despesasPessoaisFiltradas,
      reservaEmergenciaFiltradas,
    } = filtrarDadosPorPeriodoRelatorios(safeFinancialData, periodoFiltro, dataParaFiltro);
    
    const totalGanhos = ganhosFiltrados.reduce((acc, item) => acc + (item?.valor || 0), 0);
    const totalDespesasCarro = despesasCarroFiltradas.reduce((acc, item) => acc + (item?.valor || 0), 0);
    const totalDespesasCombustivel = despesasCombustivelFiltradas.reduce((acc, item) => acc + (item?.valor || 0), 0);
    const totalDespesasPessoais = despesasPessoaisFiltradas.reduce((acc, item) => acc + (item?.valor || 0), 0);
    
    const depositosReserva = reservaEmergenciaFiltradas
      .filter(item => item?.categoria === 'Depósito')
      .reduce((acc, item) => acc + (item?.valor || 0), 0);
    
    const totalDespesasTrabalho = totalDespesasCarro + totalDespesasCombustivel + depositosReserva;
    const lucroLiquido = totalGanhos - totalDespesasTrabalho;
    const saldoFinal = lucroLiquido - totalDespesasPessoais;
    
    setLoading(false);  // Finaliza o carregamento
    
    return {
      totalGanhos,
      totalDespesasCarro,
      totalDespesasCombustivel,
      totalDespesasPessoais,
      totalDespesasTrabalho,
      lucroLiquido,
      saldoFinal,
      despesasCarroDetalhadas: despesasCarroFiltradas,
      despesasCombustivelDetalhadas: despesasCombustivelFiltradas,
      despesasPessoaisDetalhadas: despesasPessoaisFiltradas,
      depositosReserva,
    };
  }, [safeFinancialData, periodoFiltro, dataEspecifica]);

  const nomePeriodo = getNomePeriodoAtual(periodoFiltro, periodoFiltro === 'diario' ? dataEspecifica : null);

  return (
    <div className="space-y-6 p-4 md:p-6 bg-gradient-to-br from-slate-50 to-sky-100 dark:from-slate-900 dark:to-sky-900 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-xl"
      >
        <div className="flex items-center space-x-3">
          <BarChart2 className="h-8 w-8 text-sky-600 dark:text-sky-400" />
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-800 dark:text-slate-100">Relatórios Financeiros</h1>
        </div>
        <p className="text-slate-600 dark:text-slate-400 mt-2">Análise detalhada das suas finanças para melhores decisões.</p>
      </motion.div>
      
      <PeriodFilter 
        periodoFiltro={periodoFiltro} 
        setPeriodoFiltro={setPeriodoFiltro} 
        nomePeriodo={nomePeriodo} 
        opcoesAdicionais={true}
        dataEspecifica={dataEspecifica}
        setDataEspecifica={setDataEspecifica}
      />
      
      {loading ? (
        <div className="text-center py-10">Carregando dados...</div>
      ) : (
        <Tabs defaultValue="resumo" className="bg-white dark:bg-slate-800 p-2 sm:p-4 rounded-xl shadow-lg">
          <TabsList className="grid w-full grid-cols-2 gap-1 bg-slate-100 dark:bg-slate-700 rounded-lg p-1">
            <TabsTrigger 
              value="resumo" 
              className="flex items-center justify-center space-x-1 px-2 py-2.5 text-xs leading-tight sm:text-sm data-[state=active]:bg-sky-500 data-[state=active]:text-white dark:data-[state=active]:bg-sky-600 rounded-md transition-all"
            >
              <PieChart className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0 mr-1 sm:mr-2" />
              <span className="truncate block">Resumo Financeiro</span>
            </TabsTrigger>
            <TabsTrigger 
              value="analiseCategorias" 
              className="flex items-center justify-center space-x-1 px-2 py-2.5 text-xs leading-tight sm:text-sm data-[state=active]:bg-sky-500 data-[state=active]:text-white dark:data-[state=active]:bg-sky-600 rounded-md transition-all"
            >
              <CalendarDays className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0 mr-1 sm:mr-2" />
              <span className="truncate block">Análise Detalhada</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="resumo" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
                <FinancialSummaryCard dados={dadosFiltrados} />
              </motion.div>
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
                <ExpenseDistributionCard dados={dadosFiltrados} />
              </motion.div>
            </div>
          </TabsContent>
          
          <TabsContent value="analiseCategorias" className="mt-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <CategoryAnalysisSection dados={dadosFiltrados} />
            </motion.div>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default Relatorios;
