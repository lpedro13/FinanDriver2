import { supabase } from './supabaseClient';

// ✅ Salva ou atualiza os dados do usuário no Supabase
export const saveUserData = async (userId, userData) => {
  try {
    const { error } = await supabase
      .from('usuarios')
      .upsert([{ id: userId, ...userData }]);

    if (error) throw error;
  } catch (error) {
    console.error('Erro ao salvar dados do usuário:', error);
    throw error;
  }
};

// ✅ Função genérica para adicionar despesa de qualquer tipo (carro, combustível, etc.)
const addDespesa = async (userId, tipoDespesa, despesaData) => {
  try {
    const { error } = await supabase.from('despesas').insert([
      {
        user_id: userId,
        tipo: tipoDespesa,
        ...despesaData,
      },
    ]);

    if (error) throw error;
  } catch (error) {
    console.error(`Erro ao adicionar despesa de tipo ${tipoDespesa}:`, error);
    throw error;
  }
};

// ✅ Adiciona uma nova despesa de carro
export const addDespesaCarro = async (userId, despesaData) => {
  return addDespesa(userId, 'carro', despesaData);
};

// ✅ Adiciona uma nova despesa de combustível
export const addDespesaCombustivel = async (userId, despesaData) => {
  return addDespesa(userId, 'combustivel', despesaData);
};

// ✅ Função genérica para buscar despesas de qualquer tipo
const getDespesas = async (userId, tipoDespesa) => {
  try {
    const { data, error } = await supabase
      .from('despesas')
      .select('*')
      .eq('user_id', userId)
      .eq('tipo', tipoDespesa)
      .order('data', { ascending: false });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error(`Erro ao buscar despesas de tipo ${tipoDespesa}:`, error);
    throw error;
  }
};

// ✅ Busca todas as despesas de carro do usuário
export const getDespesasCarro = async (userId) => {
  return getDespesas(userId, 'carro');
};

// ✅ Busca todas as despesas de combustível do usuário
export const getDespesasCombustivel = async (userId) => {
  return getDespesas(userId, 'combustivel');
};

// ✅ Função para deletar despesa por ID
const deleteDespesa = async (despesaId) => {
  try {
    const { error } = await supabase
      .from('despesas')
      .delete()
      .eq('id', despesaId);

    if (error) throw error;
  } catch (error) {
    console.error('Erro ao deletar despesa:', error);
    throw error;
  }
};

// ✅ Deleta uma despesa de carro por ID
export const deleteDespesaCarro = async (despesaId) => {
  return deleteDespesa(despesaId);
};

// ✅ Deleta uma despesa de combustível por ID
export const deleteDespesaCombustivel = async (despesaId) => {
  return deleteDespesa(despesaId);
};
