import { format, startOfDay, endOfDay, startOfWeek, endOfWeek, startOfMonth, endOfMonth, startOfYear, endOfYear, parseISO, isValid, toDate } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export const filtrarDadosPorPeriodoRelatorios = (financialData, periodoFiltro, dataEspecifica = null) => {
  if (!financialData) {
    console.error('Dados financeiros não encontrados!');
    return {}; // Retorna um objeto vazio se os dados não existirem
  }

  const dataAtual = dataEspecifica ? toDate(parseISO(dataEspecifica)) : new Date();

  let dataInicio;
  let dataFim;

  switch (periodoFiltro) {
    case 'diario':
      dataInicio = startOfDay(dataAtual);
      dataFim = endOfDay(dataAtual);
      break;
    case 'semanal':
      dataInicio = startOfWeek(dataAtual, { locale: ptBR });
      dataFim = endOfWeek(dataAtual, { locale: ptBR });
      break;
    case 'mensal':
      dataInicio = startOfMonth(dataAtual);
      dataFim = endOfMonth(dataAtual);
      break;
    case 'anual':
      dataInicio = startOfYear(dataAtual);
      dataFim = endOfYear(dataAtual);
      break;
    default: 
      dataInicio = null;
      dataFim = null;
      break;
  }

  const filtrar = (items) => {
    if (!Array.isArray(items)) return [];
    return items.filter(item => {
      if (!item || !item.data) return false;
      const dataItem = parseISO(item.data); 
      if (!isValid(dataItem)) return false;

      if (dataInicio && dataFim) {
        return dataItem >= dataInicio && dataItem <= dataFim;
      }
      return true; 
    });
  };

  return {
    ganhosFiltrados: filtrar(financialData?.ganhos),
    despesasCarroFiltradas: filtrar(financialData?.despesasCarro),
    despesasCombustivelFiltradas: filtrar(financialData?.despesasCombustivel),
    despesasPessoaisFiltradas: filtrar(financialData?.despesasPessoais),
    reservaEmergenciaFiltradas: filtrar(financialData?.reservaEmergencia),
  };
};

export const agruparPorCategoria = (items) => {
  if (!Array.isArray(items)) return {};
  return items.reduce((acc, item) => {
    if (!item || typeof item.valor !== 'number' || item.valor <= 0) return acc; // Verifica se o valor é válido e positivo
    const categoria = item.categoria || 'Sem categoria';
    if (!acc[categoria]) {
      acc[categoria] = 0;
    }
    acc[categoria] += item.valor;
    return acc;
  }, {});
};

export const getNomePeriodoAtual = (periodoFiltro, dataEspecifica = null) => {
  const dataBase = dataEspecifica ? toDate(parseISO(dataEspecifica)) : new Date();
  
  switch (periodoFiltro) {
    case 'diario':
      return format(dataBase, "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
    case 'semanal':
      const inicioSemana = startOfWeek(dataBase, { locale: ptBR });
      const fimSemana = endOfWeek(dataBase, { locale: ptBR });
      return `Semana de ${format(inicioSemana, "dd/MM")} à ${format(fimSemana, "dd/MM/yyyy")}`;
    case 'mensal':
      return format(dataBase, "MMMM 'de' yyyy", { locale: ptBR });
    case 'anual':
      return format(dataBase, "yyyy", { locale: ptBR });
    default:
      console.warn(`Período "${periodoFiltro}" não reconhecido. Retornando "Todo o período".`);
      return 'Todo o período';
  }
};
