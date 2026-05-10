"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Address } from '@/interfaces/addressInterfaces';
import { fetchAddresses, createAddress, updateAddress, deleteAddress, setDefaultAddress } from '@/services/addressService';

interface AddressContextType {
  addresses: Address[];
  isLoading: boolean;
  addAddress: (address: Omit<Address, 'id' | 'createdAt' | 'updatedAt'>) => Promise<Address>;
  editAddress: (id: number, address: Partial<Address>) => Promise<Address>;
  removeAddress: (id: number) => Promise<void>;
  setDefault: (id: number) => Promise<void>;
  refreshAddresses: () => Promise<void>;
}

const AddressContext = createContext<AddressContextType | undefined>(undefined);

export function AddressProvider({ children }: { children: React.ReactNode }) {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const refreshAddresses = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await fetchAddresses();
      setAddresses(data);
    } catch (error) {
      console.error('Error loading addresses:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshAddresses();
  }, [refreshAddresses]);

  const addAddress = async (address: Omit<Address, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newAddress = await createAddress(address);
    await refreshAddresses();
    return newAddress;
  };

  const editAddress = async (id: number, address: Partial<Address>) => {
    const updated = await updateAddress(id, address);
    await refreshAddresses();
    return updated;
  };

  const removeAddress = async (id: number) => {
    await deleteAddress(id);
    await refreshAddresses();
  };

  const setDefault = async (id: number) => {
    await setDefaultAddress(id);
    await refreshAddresses();
  };

  return (
    <AddressContext.Provider value={{
      addresses,
      isLoading,
      addAddress,
      editAddress,
      removeAddress,
      setDefault,
      refreshAddresses,
    }}>
      {children}
    </AddressContext.Provider>
  );
}

export function useAddresses() {
  const context = useContext(AddressContext);
  if (!context) {
    throw new Error('useAddresses must be used within AddressProvider');
  }
  return context;
}