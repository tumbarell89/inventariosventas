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
      <DialogContent className="sm:max-w-[80%] bg-white rounded-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900">
            Tasa de Cambio del {new Date(fecha).toLocaleString()}
          </DialogTitle>
        </DialogHeader>
        <TazaCambioMatrix tazaCambio={tazaCambio} />
      </DialogContent>
    </Dialog>
  );
};

export default TazaCambioMatrixModal;

