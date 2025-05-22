import { startOfDay, endOfDay, startOfWeek, endOfWeek, startOfMonth, endOfMonth, parseISO, isValid } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export const filtrarDadosPorPeriodoDashboard = (financialData, periodoFiltro) => {
  const dataAtual = new Date();
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
    case 'geral':
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

      // Verifica se a data do item está dentro do intervalo
      if (dataInicio && dataFim) {
        return dataItem >= dataInicio && dataItem <= dataFim;
      }

      return true; // Se não houver filtro, inclui todos
    });
  };

  return {
    ganhos: filtrar(financialData?.ganhos),
    despesasCarro: filtrar(financialData?.despesasCarro),
    despesasCombustivel: filtrar(financialData?.despesasCombustivel),
    despesasPessoais: filtrar(financialData?.despesasPessoais),
    reservaEmergencia: filtrar(financialData?.reservaEmergencia),
  };
};

export const agruparPorCategoria = (items) => {
  if (!Array.isArray(items)) return {};

  return items.reduce((acc, item) => {
    if (!item || typeof item.valor !== 'number' || item.valor <= 0) return acc; // Verifica se o valor é positivo

    const categoria = item.categoria || 'Sem categoria'; // Se não houver categoria, usa 'Sem categoria'
    if (!acc[categoria]) {
      acc[categoria] = 0;
    }
    acc[categoria] += item.valor;
    return acc;
  }, {});
};
