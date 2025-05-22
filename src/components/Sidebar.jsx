
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, 
  TrendingUp, 
  TrendingDown, 
  CreditCard, 
  BarChart2, 
  ShieldCheck,
  X 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

const menuItems = [
  { icon: Home, label: 'Dashboard', path: '/' },
  { icon: TrendingUp, label: 'Ganhos', path: '/ganhos' },
  { icon: TrendingDown, label: 'Despesas', path: '/despesas' },
  { icon: CreditCard, label: 'Despesas Pessoais', path: '/despesas-pessoais' },
  { icon: ShieldCheck, label: 'Reserva de Emergência', path: '/reserva-emergencia' },
  { icon: BarChart2, label: 'Relatórios', path: '/relatorios' },
];

const Sidebar = ({ open, setOpen }) => {
  const { currentUser } = useAuth();
  const location = useLocation();

  if (!currentUser) {
    return null; // Don't render sidebar if not logged in
  }

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 z-30 md:hidden" 
            onClick={() => setOpen(false)}
          />
        )}
      </AnimatePresence>
      
      <motion.aside
        key="sidebar"
        initial={{ x: '-100%' }}
        animate={{ x: open || (window.innerWidth >= 768) ? 0 : '-100%' }} // Keep open on md+
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className={`fixed top-0 left-0 h-full w-64 bg-white dark:bg-gray-900 shadow-lg z-40 
                    md:sticky md:top-16 md:h-[calc(100vh-4rem)] flex-shrink-0`}
      >
        <div className="p-4 h-full flex flex-col">
          {open && window.innerWidth < 768 && ( // Show X only on mobile when open
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute top-4 right-4 md:hidden" 
              onClick={() => setOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          )}
          
          <nav className="mt-12 md:mt-6 space-y-1 flex-grow">
            {menuItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => { if (open && window.innerWidth < 768) setOpen(false); }}
                className={({ isActive }) => `
                  flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors
                  ${isActive 
                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' 
                    : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'}
                `}
              >
                <item.icon className="h-5 w-5 mr-3" />
                <span>{item.label}</span>
              </NavLink>
            ))}
          </nav>
        </div>
      </motion.aside>
    </>
  );
};

export default Sidebar;
