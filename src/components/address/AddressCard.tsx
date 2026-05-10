"use client";

import { Address } from "@/interfaces/addressInterfaces";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash2, Star, Phone, MapPin, Building, FileText } from "lucide-react";

interface AddressCardProps {
  address: Address;
  onEdit: (address: Address) => void;
  onDelete: (id: number) => void;
  onSetDefault?: (id: number) => void;
  isSelected?: boolean;
  onSelect?: (id: number) => void;
  showSelectButton?: boolean;
}

export function AddressCard({ 
  address, 
  onEdit, 
  onDelete, 
  onSetDefault,
  isSelected = false,
  onSelect,
  showSelectButton = false 
}: AddressCardProps) {
  return (
    <Card className={`transition-all ${isSelected ? 'ring-2 ring-primary shadow-lg' : 'hover:shadow-md'}`}>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            <CardTitle className="text-lg">{address.name}</CardTitle>
            {address.isDefault && (
              <Badge variant="secondary" className="gap-1">
                <Star className="h-3 w-3" />
                Predeterminada
              </Badge>
            )}
          </div>
          <div className="flex gap-1">
            <Button
              variant="outline"
              size="icon"
              onClick={() => onEdit(address)}
              className="h-8 w-8"
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => onDelete(address.id)}
              className="h-8 w-8 text-red-600 hover:text-red-700"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-2">
        <div className="flex items-start gap-2 text-sm">
          <Phone className="h-4 w-4 text-gray-500 mt-0.5" />
          <span>{address.phone}</span>
        </div>
        <div className="flex items-start gap-2 text-sm">
          <MapPin className="h-4 w-4 text-gray-500 mt-0.5" />
          <span>{address.address}</span>
        </div>
        <div className="flex items-start gap-2 text-sm">
          <Building className="h-4 w-4 text-gray-500 mt-0.5" />
          <span>{address.municipality}</span>
        </div>
        {address.notes && (
          <div className="flex items-start gap-2 text-sm">
            <FileText className="h-4 w-4 text-gray-500 mt-0.5" />
            <span className="text-gray-600">{address.notes}</span>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="pt-0 flex gap-2">
        {onSetDefault && !address.isDefault && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => onSetDefault(address.id)}
            className="mt-2"
          >
            Establecer como predeterminada
          </Button>
        )}
        {showSelectButton && onSelect && (
          <Button
            variant={isSelected ? "default" : "outline"}
            size="sm"
            className="flex-1"
            onClick={() => onSelect(address.id)}
          >
            {isSelected ? "✓ Seleccionada" : "Seleccionar"}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}