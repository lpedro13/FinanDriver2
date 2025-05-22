import { supabase } from '@/services/supabaseClient';

// Funções para buscar dados financeiros
export const getGanhos = async (userId) => {
  try {
    const { data, error } = await supabase
      .from('ganhos')
      .select('*')
      .eq('user_id', userId);

    if (error) throw new Error(error.message);
    return data;
  } catch (error) {
    throw new Error('Erro ao buscar ganhos: ' + error.message);
  }
};

export const getDespesasCarro = async (userId) => {
  try {
    const { data, error } = await supabase
      .from('despesas_carro')
      .select('*')
      .eq('user_id', userId);

    if (error) throw new Error(error.message);
    return data;
  } catch (error) {
    throw new Error('Erro ao buscar despesas de carro: ' + error.message);
  }
};

export const getDespesasCombustivel = async (userId) => {
  try {
    const { data, error } = await supabase
      .from('despesas_combustivel')
      .select('*')
      .eq('user_id', userId);

    if (error) throw new Error(error.message);
    return data;
  } catch (error) {
    throw new Error('Erro ao buscar despesas de combustível: ' + error.message);
  }
};

export const getDespesasPessoais = async (userId) => {
  try {
    const { data, error } = await supabase
      .from('despesas_pessoais')
      .select('*')
      .eq('user_id', userId);

    if (error) throw new Error(error.message);
    return data;
  } catch (error) {
    throw new Error('Erro ao buscar despesas pessoais: ' + error.message);
  }
};

export const getReservasEmergencia = async (userId) => {
  try {
    const { data, error } = await supabase
      .from('reservas_emergencia')
      .select('*')
      .eq('user_id', userId);

    if (error) throw new Error(error.message);
    return data;
  } catch (error) {
    throw new Error('Erro ao buscar reservas de emergência: ' + error.message);
  }
};

// Funções para adicionar dados financeiros
export const addGanho = async (userId, ganho) => {
  try {
    const { error } = await supabase
      .from('ganhos')
      .insert([{ user_id: userId, ...ganho }]);

    if (error) throw new Error(error.message);
  } catch (error) {
    throw new Error('Erro ao adicionar ganho: ' + error.message);
  }
};

export const addDespesaCarro = async (userId, despesa) => {
  try {
    const { error } = await supabase
      .from('despesas_carro')
      .insert([{ user_id: userId, ...despesa }]);

    if (error) throw new Error(error.message);
  } catch (error) {
    throw new Error('Erro ao adicionar despesa de carro: ' + error.message);
  }
};

export const addDespesaCombustivel = async (userId, despesa) => {
  try {
    const { error } = await supabase
      .from('despesas_combustivel')
      .insert([{ user_id: userId, ...despesa }]);

    if (error) throw new Error(error.message);
  } catch (error) {
    throw new Error('Erro ao adicionar despesa de combustível: ' + error.message);
  }
};

export const addDespesaPessoal = async (userId, despesa) => {
  try {
    const { error } = await supabase
      .from('despesas_pessoais')
      .insert([{ user_id: userId, ...despesa }]);

    if (error) throw new Error(error.message);
  } catch (error) {
    throw new Error('Erro ao adicionar despesa pessoal: ' + error.message);
  }
};

export const addReservaEmergencia = async (userId, reserva) => {
  try {
    const { error } = await supabase
      .from('reservas_emergencia')
      .insert([{ user_id: userId, ...reserva }]);

    if (error) throw new Error(error.message);
  } catch (error) {
    throw new Error('Erro ao adicionar reserva de emergência: ' + error.message);
  }
};

// Funções para deletar dados financeiros
export const deleteGanho = async (userId, id) => {
  try {
    const { error } = await supabase
      .from('ganhos')
      .delete()
      .eq('user_id', userId)
      .eq('id', id);

    if (error) throw new Error(error.message);
  } catch (error) {
    throw new Error('Erro ao deletar ganho: ' + error.message);
  }
};

export const deleteDespesaCarro = async (userId, id) => {
  try {
    const { error } = await supabase
      .from('despesas_carro')
      .delete()
      .eq('user_id', userId)
      .eq('id', id);

    if (error) throw new Error(error.message);
  } catch (error) {
    throw new Error('Erro ao deletar despesa de carro: ' + error.message);
  }
};

export const deleteDespesaCombustivel = async (userId, id) => {
  try {
    const { error } = await supabase
      .from('despesas_combustivel')
      .delete()
      .eq('user_id', userId)
      .eq('id', id);

    if (error) throw new Error(error.message);
  } catch (error) {
    throw new Error('Erro ao deletar despesa de combustível: ' + error.message);
  }
};

export const deleteDespesaPessoal = async (userId, id) => {
  try {
    const { error } = await supabase
      .from('despesas_pessoais')
      .delete()
      .eq('user_id', userId)
      .eq('id', id);

    if (error) throw new Error(error.message);
  } catch (error) {
    throw new Error('Erro ao deletar despesa pessoal: ' + error.message);
  }
};

export const deleteReservaEmergencia = async (userId, id) => {
  try {
    const { error } = await supabase
      .from('reservas_emergencia')
      .delete()
      .eq('user_id', userId)
      .eq('id', id);

    if (error) throw new Error(error.message);
  } catch (error) {
    throw new Error('Erro ao deletar reserva de emergência: ' + error.message);
  }
};

// Funções para atualizar dados financeiros
export const updateGanho = async (userId, id, updatedGanho) => {
  try {
    const { error } = await supabase
      .from('ganhos')
      .update(updatedGanho)
      .eq('user_id', userId)
      .eq('id', id);

    if (error) throw new Error(error.message);
  } catch (error) {
    throw new Error('Erro ao atualizar ganho: ' + error.message);
  }
};

export const updateDespesaCarro = async (userId, id, updatedDespesa) => {
  try {
    const { error } = await supabase
      .from('despesas_carro')
      .update(updatedDespesa)
      .eq('user_id', userId)
      .eq('id', id);

    if (error) throw new Error(error.message);
  } catch (error) {
    throw new Error('Erro ao atualizar despesa de carro: ' + error.message);
  }
};

export const updateDespesaCombustivel = async (userId, id, updatedDespesa) => {
  try {
    const { error } = await supabase
      .from('despesas_combustivel')
      .update(updatedDespesa)
      .eq('user_id', userId)
      .eq('id', id);

    if (error) throw new Error(error.message);
  } catch (error) {
    throw new Error('Erro ao atualizar despesa de combustível: ' + error.message);
  }
};

export const updateDespesaPessoal = async (userId, id, updatedDespesa) => {
  try {
    const { error } = await supabase
      .from('despesas_pessoais')
      .update(updatedDespesa)
      .eq('user_id', userId)
      .eq('id', id);

    if (error) throw new Error(error.message);
  } catch (error) {
    throw new Error('Erro ao atualizar despesa pessoal: ' + error.message);
  }
};

export const updateReservaEmergencia = async (userId, id, updatedReserva) => {
  try {
    const { error } = await supabase
      .from('reservas_emergencia')
      .update(updatedReserva)
      .eq('user_id', userId)
      .eq('id', id);

    if (error) throw new Error(error.message);
  } catch (error) {
    throw new Error('Erro ao atualizar reserva de emergência: ' + error.message);
  }
};
