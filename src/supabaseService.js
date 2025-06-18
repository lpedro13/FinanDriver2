// Funções mockadas (simuladas) para substituir o Supabase
export const getGanhosSupabase = async () => [];
export const getDespesasCarroSupabase = async () => [];
export const getDespesasCombustivelSupabase = async () => [];
export const getDespesasPessoaisSupabase = async () => [];
export const getReservasEmergenciaSupabase = async () => [];

export const addGanhoSupabase = async () => ({ id: Date.now() });
export const addDespesaCarroSupabase = async () => ({ id: Date.now() });
export const addDespesaCombustivelSupabase = async () => ({ id: Date.now() });
export const addDespesaPessoalSupabase = async () => ({ id: Date.now() });
export const addReservaEmergenciaSupabase = async () => ({ id: Date.now() });

export const deleteGanhoSupabase = async () => {};
export const deleteDespesaCarroSupabase = async () => {};
export const deleteDespesaCombustivelSupabase = async () => {};
export const deleteDespesaPessoalSupabase = async () => {};
export const deleteReservaEmergenciaSupabase = async () => {};