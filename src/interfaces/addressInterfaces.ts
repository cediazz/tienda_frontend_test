
export interface Address {
  id: number;
  name: string;           // Nombre de la dirección (ej: "Casa", "Oficina")
  phone: string;          // Teléfono de contacto
  address: string;        // Dirección completa
  municipality: string;   // Municipio
  notes?: string;         // Notas o instrucciones opcionales
  isDefault?: boolean;    // Dirección predeterminada
  createdAt: string;
  updatedAt: string;
}