import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import TazaCambioMatrix from './TazaCambioMatrix';

interface TazaCambioMatrixModalProps {
  isOpen: boolean;
  onClose: () => void;
  tazaCambio: Record<string, Record<string, number>>;
  fecha: string;
}

const TazaCambioMatrixModal: React.FC<TazaCambioMatrixModalProps> = ({ isOpen, onClose, tazaCambio, fecha }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[80%]">
        <DialogHeader>
          <DialogTitle>Tasa de Cambio del {new Date(fecha).toLocaleString()}</DialogTitle>
        </DialogHeader>
        <TazaCambioMatrix tazaCambio={tazaCambio} />
      </DialogContent>
    </Dialog>
  );
};

export default TazaCambioMatrixModal;
