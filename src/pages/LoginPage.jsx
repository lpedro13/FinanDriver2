import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { motion } from 'framer-motion';
import { LogIn } from 'lucide-react';
import { getGanhos } from '@/services/supabaseService'; // substitui firestore

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, currentUser, setUserFinancialData } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Por favor, preencha todos os campos.');
      toast({
        title: "Erro no Login",
        description: "E-mail e senha são obrigatórios.",
        variant: "destructive",
      });
      return;
    }

    const emailPattern = /^[^@]+@[^@]+\.[^@]+$/;
    if (!emailPattern.test(email)) {
      setError('Por favor, insira um e-mail válido.');
      toast({
        title: "Erro no Login",
        description: "E-mail inválido.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await login(email, password); // login deve usar Supabase internamente

      if (error) throw error;

      toast({
        title: "Login bem-sucedido!",
        description: "Bem-vindo de volta!",
      });

      if (data?.user) {
        const ganhos = await getGanhos(data.user.id); // ou outro dado que queira carregar
        setUserFinancialData(ganhos); // armazena no contexto global se necessário
      }

      navigate('/');
    } catch (err) {
      console.error("Erro no login:", err);
      setError(err.message || 'Falha ao fazer login.');

      toast({
        title: "Erro no Login",
        description: err.message || 'Não foi possível entrar.',
        variant: "destructive",
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    if (currentUser) {
      navigate('/');
    }
  }, [currentUser, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-100 to-indigo-200 dark:from-slate-900 dark:to-indigo-900 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="w-full max-w-md shadow-2xl">
          <CardHeader className="text-center">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: 'spring' }}>
              <LogIn className="mx-auto h-16 w-16 text-sky-600 dark:text-sky-400 mb-4" />
            </motion.div>
            <CardTitle className="text-3xl font-bold">Bem-vindo de Volta!</CardTitle>
            <CardDescription>Faça login para acessar seu painel FinanDrive.</CardDescription>
          </CardHeader>
          <CardContent>
            {error && <p className="mb-4 text-center text-red-500 bg-red-100 dark:bg-red-900/30 p-3 rounded-md">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="text-base"
                  disabled={loading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Sua senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="text-base"
                  disabled={loading}
                />
              </div>
              <Button type="submit" className="w-full text-lg py-6" disabled={loading}>
                {loading ? 'Entrando...' : 'Entrar'}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col items-center space-y-2">
            <p className="text-sm text-muted-foreground">
              Não tem uma conta?{' '}
              <Link to="/register" className="font-semibold text-sky-600 hover:text-sky-500 dark:text-sky-400 dark:hover:text-sky-300">
                Registre-se
              </Link>
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default LoginPage;
