import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface DeleteMonedaModalProps {
  monedas: { id: number; denominacion: string }[];
  onDelete: (id: number) => void;
  isOpen: boolean;
  onClose: () => void;
}

const DeleteMonedaModal: React.FC<DeleteMonedaModalProps> = ({ monedas, onDelete, isOpen, onClose }) => {
  const [selectedMonedaId, setSelectedMonedaId] = useState<string>('');

  const handleDelete = () => {
    if (selectedMonedaId) {
      onDelete(parseInt(selectedMonedaId, 10));
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Eliminar Moneda</DialogTitle>
          <DialogDescription>
            Seleccione la moneda que desea eliminar.
          </DialogDescription>
        </DialogHeader>
        <Select onValueChange={setSelectedMonedaId} value={selectedMonedaId}>
          <SelectTrigger>
            <SelectValue placeholder="Seleccione una moneda" />
          </SelectTrigger>
          <SelectContent>
            {monedas.map((moneda) => (
              <SelectItem key={moneda.id} value={moneda.id.toString()}>
                {moneda.denominacion}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancelar</Button>
          <Button onClick={handleDelete} disabled={!selectedMonedaId}>Eliminar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteMonedaModal;
