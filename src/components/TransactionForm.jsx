import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { format, parseISO, addMinutes } from 'date-fns';

const TransactionForm = ({ onSubmit, type, categorias }) => {
  const { toast } = useToast();
  
  const getInitialDate = () => {
    const today = new Date();
    return format(today, "yyyy-MM-dd");
  };

  const [formData, setFormData] = useState({
    descricao: '',
    valor: '',
    data: getInitialDate(),
    categoria: categorias && categorias.length > 0 ? categorias[0] : ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'valor' ? value.replace(/[^0-9.,]/g, '') : value
    }));
  };

  const handleCategoriaChange = (value) => {
    setFormData(prev => ({
      ...prev,
      categoria: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.valor) {
      toast({
        title: "Erro",
        description: "Por favor, informe um valor",
        variant: "destructive"
      });
      return;
    }
    
    const valorNumerico = parseFloat(formData.valor.replace(',', '.'));
    
    if (isNaN(valorNumerico) || valorNumerico <= 0) {
      toast({
        title: "Erro",
        description: "Por favor, informe um valor válido",
        variant: "destructive"
      });
      return;
    }
    
    const dateParts = formData.data.split('-');
    const year = parseInt(dateParts[0], 10);
    const month = parseInt(dateParts[1], 10) - 1; 
    const day = parseInt(dateParts[2], 10);
    
    const dateObject = new Date(year, month, day);
    const timezoneOffset = dateObject.getTimezoneOffset();
    const correctedDate = addMinutes(dateObject, timezoneOffset);

    const newTransaction = {
      ...formData,
      id: Date.now().toString(),
      valor: valorNumerico,
      data: correctedDate.toISOString() 
    };
    
    onSubmit(newTransaction);
    
    setFormData({
      descricao: '',
      valor: '',
      data: getInitialDate(),
      categoria: categorias && categorias.length > 0 ? categorias[0] : ''
    });
    
    toast({
      title: "Sucesso",
      description: "Registro adicionado com sucesso",
    });
  };

  return (
    <motion.form 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      onSubmit={handleSubmit} 
      className="space-y-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm"
    >
      <div className="space-y-2">
        <Label htmlFor="descricao">Descrição (Opcional)</Label>
        <Input
          id="descricao"
          name="descricao"
          value={formData.descricao}
          onChange={handleChange}
          placeholder="Descreva o registro"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="valor">Valor (R$)</Label>
        <Input
          id="valor"
          name="valor"
          value={formData.valor}
          onChange={handleChange}
          placeholder="0,00"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="data">Data</Label>
        <Input
          id="data"
          name="data"
          type="date"
          value={formData.data}
          onChange={handleChange}
        />
      </div>
      
      {categorias && categorias.length > 0 && (
        <div className="space-y-2">
          <Label htmlFor="categoria">Categoria</Label>
          <Select value={formData.categoria} onValueChange={handleCategoriaChange}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione uma categoria" />
            </SelectTrigger>
            <SelectContent>
              {categorias.map((categoria) => (
                <SelectItem key={categoria} value={categoria}>
                  {categoria}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
      
      <Button type="submit" className="w-full">
        Adicionar
      </Button>
    </motion.form>
  );
};

export default TransactionForm;
