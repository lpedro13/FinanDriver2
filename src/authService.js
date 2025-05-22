import { supabase } from '@/services/supabaseClient';

// Função para registrar o usuário
export const registerUser = async (email, password) => {
  try {
    const { user, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) throw new Error(error.message);

    // Salvar dados do usuário no banco de dados
    const { error: insertError } = await supabase
      .from('users')
      .insert([{ id: user.id, email, nome: '', created_at: new Date().toISOString() }]);

    if (insertError) throw new Error(insertError.message);

    return { user, userId: user.id };
  } catch (error) {
    throw new Error(error.message || 'Erro desconhecido ao registrar.');
  }
};

// Função para login
export const loginUser = async (email, password) => {
  try {
    const { user, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw new Error(error.message);

    return {
      userCredential: user,
      userId: user.id,
    };
  } catch (error) {
    throw new Error(error.message || 'Erro ao tentar login.');
  }
};

// Função para logout
export const logoutUser = async () => {
  try {
    await supabase.auth.signOut();
  } catch (error) {
    throw new Error('Erro ao deslogar usuário.');
  }
};
