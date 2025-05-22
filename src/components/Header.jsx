import React from 'react';
import { Menu, UserCircle, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';

const Header = ({ setSidebarOpen }) => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      await logout();
      toast({
        title: "Logout realizado",
        description: "Você foi desconectado com sucesso.",
      });
      navigate('/login');
    } catch (error) {
      toast({
        title: "Erro ao sair",
        description: "Não foi possível fazer logout. Tente novamente.",
        variant: "destructive",
      });
      console.error("Erro no logout:", error);
    }
  };

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="fixed top-0 left-0 right-0 h-16 bg-white dark:bg-gray-900 shadow-md z-50 px-4 flex items-center justify-between"
    >
      <div className="flex items-center">
        {currentUser && (
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden mr-2" 
            onClick={() => setSidebarOpen(prev => !prev)}
          >
            <Menu className="h-6 w-6" />
          </Button>
        )}
        <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          FinanDrive
        </h1>
      </div>
      
      {currentUser && (
        <div className="flex items-center space-x-3">
          <span className="text-sm text-gray-700 dark:text-gray-300 hidden sm:inline">
            Olá, {currentUser.email}
          </span>
          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={handleLogout}
              aria-label="Sair"
            >
              <LogOut className="h-6 w-6 text-red-500 dark:text-red-400" />
            </Button>
          </motion.div>
        </div>
      )}
    </motion.header>
  );
};

export default Header;
