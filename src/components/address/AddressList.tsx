"use client";

import { Address } from "@/interfaces/addressInterfaces";
import { AddressCard } from "./AddressCard";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface AddressListProps {
  addresses: Address[];
  onEdit: (address: Address) => void;
  onDelete: (id: number) => void;
  onSetDefault: (id: number) => void;
  onAddNew: () => void;
  selectedAddressId?: number;
  onSelectAddress?: (id: number) => void;
  showSelectButtons?: boolean;
}

export function AddressList({ 
  addresses, 
  onEdit, 
  onDelete, 
  onSetDefault,
  onAddNew,
  selectedAddressId,
  onSelectAddress,
  showSelectButtons = false
}: AddressListProps) {
  if (addresses.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 mb-4">No tienes direcciones guardadas</p>
        <Button onClick={onAddNew}>
          <Plus className="h-4 w-4 mr-2" />
          Agregar dirección
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Mis direcciones</h2>
        <Button onClick={onAddNew} size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Nueva dirección
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {addresses.map((address) => (
          <AddressCard
            key={address.id}
            address={address}
            onEdit={onEdit}
            onDelete={onDelete}
            onSetDefault={onSetDefault}
            isSelected={selectedAddressId === address.id}
            onSelect={onSelectAddress}
            showSelectButton={showSelectButtons}
          />
        ))}
      </div>
    </div>
  );
}