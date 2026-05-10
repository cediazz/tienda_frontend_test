"use client";

import { useState, useEffect } from "react";
import { useAddresses } from "@/context/AddressContext";
import { AddressList } from "./AddressList";
import { AddressModal } from "./AddressModal";
import { Address } from "@/interfaces/addressInterfaces";

interface AddressesClientProps {
  initialAddresses?: Address[] | null;
}

export default function AddressesClient({ initialAddresses }: AddressesClientProps) {
  const { addresses, isLoading, addAddress, editAddress, removeAddress, setDefault, refreshAddresses } = useAddresses();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | undefined>(undefined);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Si hay datos iniciales del servidor, usarlos
  useEffect(() => {
    if (initialAddresses) {
      // Aquí podrías inicializar el contexto con los datos del servidor
      // Por ahora, el contexto ya maneja su propio estado
      refreshAddresses();
    }
  }, [initialAddresses, refreshAddresses]);

  const handleAddNew = () => {
    setEditingAddress(undefined);
    setModalOpen(true);
  };

  const handleEdit = (address: Address) => {
    setEditingAddress(address);
    setModalOpen(true);
  };

  const handleSubmit = async (data: any) => {
    setIsSubmitting(true);
    try {
      if (editingAddress) {
        await editAddress(editingAddress.id, data);
      } else {
        await addAddress(data);
      }
      setModalOpen(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm("¿Estás seguro de que quieres eliminar esta dirección?")) {
      await removeAddress(id);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              Mis direcciones de envío
            </h1>
          </div>
          
          <AddressList
            addresses={addresses}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onSetDefault={setDefault}
            onAddNew={handleAddNew}
            isLoading={isLoading}
          />
        </div>
      </main>

      <AddressModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        initialData={editingAddress}
        isLoading={isSubmitting}
      />
    </div>
  );
}