import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser, loginUser } from './services/authService'; // Mantemos as funções de authService com a lógica Supabase
import { useAuth } from '@/contexts/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [modoCadastro, setModoCadastro] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const { setCurrentUser } = useAuth();  // Contexto para armazenar o usuário autenticado

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      let userData;

      if (modoCadastro) {
        userData = await registerUser(email, senha);  // Função de registro com Supabase
        alert('Cadastro realizado com sucesso!');
      } else {
        userData = await loginUser(email, senha);  // Função de login com Supabase
        alert('Login realizado com sucesso!');
      }

      // Atualiza o contexto com o usuário autenticado
      setCurrentUser({
        uid: userData.userId,
        email: userData.userCredential?.email || email,  // Email do usuário
      });

      navigate('/');  // Redireciona para a página inicial após sucesso
    } catch (error) {
      setError(error.message);  // Mostra mensagem de erro, caso ocorra
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px' }}>
      <h2>{modoCadastro ? 'Cadastrar' : 'Entrar'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}  // Atualiza o valor do email
          required
          style={{ display: 'block', width: '100%', marginBottom: '10px' }}
        />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}  // Atualiza o valor da senha
          required
          style={{ display: 'block', width: '100%', marginBottom: '10px' }}
        />
        <button type="submit" style={{ width: '100%' }}>
          {modoCadastro ? 'Cadastrar' : 'Entrar'}  // Altera o texto conforme o modo
        </button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}  // Exibe mensagem de erro se houver

      <p
        onClick={() => setModoCadastro(!modoCadastro)}  // Alterna entre modo cadastro e login
        style={{ cursor: 'pointer', color: 'blue', marginTop: '10px' }}
      >
        {modoCadastro ? 'Já tem conta? Entrar' : 'Não tem conta? Cadastrar'}
      </p>
    </div>
  );
}
