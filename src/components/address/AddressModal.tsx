"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AddressForm } from "./AddressForm";
import { Address } from "@/interfaces/addressInterfaces";

interface AddressModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => Promise<void>;
  initialData?: Address;
  isLoading?: boolean;
}

export function AddressModal({ isOpen, onClose, onSubmit, initialData, isLoading }: AddressModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {initialData ? "Editar dirección" : "Agregar nueva dirección"}
          </DialogTitle>
        </DialogHeader>
        <AddressForm
          initialData={initialData}
          onSubmit={async (data) => {
            await onSubmit(data);
            onClose();
          }}
          onCancel={onClose}
          isLoading={isLoading}
        />
      </DialogContent>
    </Dialog>
  );
}