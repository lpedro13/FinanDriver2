import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card, CardContent, CardDescription,
  CardFooter, CardHeader, CardTitle
} from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { motion } from 'framer-motion';
import { UserPlus } from 'lucide-react';
import { saveUserProfile } from '@/services/supabaseService'; // 🔄 novo

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const validatePassword = (password) => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/;
    return regex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('As senhas não coincidem.');
      toast({
        title: "Erro de Registro",
        description: "As senhas não coincidem.",
        variant: "destructive",
      });
      return;
    }

    if (!validatePassword(password)) {
      setError('A senha deve ter pelo menos 6 caracteres, um número e um caractere especial.');
      toast({
        title: "Erro de Registro",
        description: "A senha não atende aos requisitos de segurança.",
        variant: "destructive",
      });
      return;
    }

    setError('');
    setLoading(true);

    try {
      const { data, error } = await register(email, password);

      if (error) throw error;

      const user = data?.user;
      toast({
        title: "Registro bem-sucedido!",
        description: "Sua conta foi criada. Faça login para continuar.",
      });

      // Salva o perfil inicial na tabela 'usuarios'
      if (user) {
        await saveUserProfile(user.id, {
          email,
          saldo: 0,
        });
      }

      navigate('/login');
    } catch (err) {
      const msg = err.message || 'Falha ao criar conta.';
      setError(msg);
      toast({
        title: "Erro de Registro",
        description: msg,
        variant: "destructive",
      });
      console.error("Erro no registro:", err);
    }
    setLoading(false);
  };

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
              <UserPlus className="mx-auto h-16 w-16 text-sky-600 dark:text-sky-400 mb-4" />
            </motion.div>
            <CardTitle className="text-3xl font-bold">Crie sua Conta</CardTitle>
            <CardDescription>Junte-se ao FinanDrive e gerencie suas finanças.</CardDescription>
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
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Crie uma senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirmar Senha</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  placeholder="Confirme sua senha"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full text-lg py-6" disabled={loading}>
                {loading ? 'Registrando...' : 'Registrar'}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col items-center space-y-2">
            <p className="text-sm text-muted-foreground">
              Já tem uma conta?{' '}
              <Link to="/login" className="font-semibold text-sky-600 hover:text-sky-500 dark:text-sky-400 dark:hover:text-sky-300">
                Faça Login
              </Link>
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default RegisterPage;
