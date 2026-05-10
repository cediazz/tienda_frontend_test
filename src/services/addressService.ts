import { Address } from "@/interfaces/addressInterfaces";

// Simular una API con localStorage
const STORAGE_KEY = 'shipping_addresses';
const API_DELAY = 500; // Simular delay de red

// Obtener todas las direcciones
export async function fetchAddresses(): Promise<Address[]> {
  await new Promise(resolve => setTimeout(resolve, API_DELAY));
  
  if (typeof window === 'undefined') return [];
  
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    // Datos de ejemplo
    const defaultAddresses: Address[] = [
      {
        id: 1,
        name: "Casa",
        phone: "+53 55555555",
        address: "Calle 23 #456 e/ 2 y 4",
        municipality: "Plaza de la Revolución",
        notes: "Dejar en la puerta principal, timbre rojo",
        isDefault: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: 2,
        name: "Oficina",
        phone: "+53 55555556",
        address: "Calle 42 #123 e/ 5 y 7",
        municipality: "Miramar",
        notes: "Horario de oficina 9am-5pm",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultAddresses));
    return defaultAddresses;
  }
  
  return JSON.parse(stored);
}

// Guardar todas las direcciones
async function saveAddresses(addresses: Address[]): Promise<void> {
  await new Promise(resolve => setTimeout(resolve, API_DELAY));
  localStorage.setItem(STORAGE_KEY, JSON.stringify(addresses));
}

// Crear nueva dirección
export async function createAddress(data: Omit<Address, 'id' | 'createdAt' | 'updatedAt'>): Promise<Address> {
  const addresses = await fetchAddresses();
  
  const newAddress: Address = {
    ...data,
    id: Date.now(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  
  // Si es la primera dirección o es predeterminada, actualizar otras
  if (addresses.length === 0 || data.isDefault) {
    addresses.forEach(a => a.isDefault = false);
  }
  
  addresses.push(newAddress);
  await saveAddresses(addresses);
  return newAddress;
}

// Actualizar dirección
export async function updateAddress(id: number, data: Partial<Address>): Promise<Address> {
  const addresses = await fetchAddresses();
  const index = addresses.findIndex(a => a.id === id);
  
  if (index === -1) throw new Error('Address not found');
  
  // Si esta dirección se marca como predeterminada, quitar de las demás
  if (data.isDefault) {
    addresses.forEach(a => a.isDefault = false);
  }
  
  addresses[index] = {
    ...addresses[index],
    ...data,
    updatedAt: new Date().toISOString(),
  };
  
  await saveAddresses(addresses);
  return addresses[index];
}

// Eliminar dirección
export async function deleteAddress(id: number): Promise<void> {
  const addresses = await fetchAddresses();
  const filtered = addresses.filter(a => a.id !== id);
  
  // Si eliminamos la dirección predeterminada y quedan direcciones, marcar la primera como default
  const deletedWasDefault = addresses.find(a => a.id === id)?.isDefault;
  if (deletedWasDefault && filtered.length > 0) {
    filtered[0].isDefault = true;
  }
  
  await saveAddresses(filtered);
}

// Establecer dirección predeterminada
export async function setDefaultAddress(id: number): Promise<void> {
  const addresses = await fetchAddresses();
  addresses.forEach(address => {
    address.isDefault = address.id === id;
  });
  await saveAddresses(addresses);
}