import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const TransactionList = ({ items, onDelete, type, emptyMessage, showDeleteButton = true }) => {
  if (!items || items.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <p>{emptyMessage || 'Nenhum registro encontrado'}</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <AnimatePresence>
        {items.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 flex justify-between items-center"
          >
            <div>
              <h4 className="font-medium">{item.descricao}</h4>
              <div className="flex items-center text-sm text-muted-foreground">
                <span>{format(new Date(item.data), 'dd/MM/yyyy', { locale: ptBR })}</span>
                {item.categoria && (
                  <span className="ml-2 px-2 py-0.5 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-xs">
                    {item.categoria}
                  </span>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="font-semibold">
                R$ {item.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
              {showDeleteButton && (
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => onDelete(type, item.id)}
                  className="text-red-500 hover:text-red-700 hover:bg-red-100 dark:hover:bg-red-900/30"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default TransactionList;
