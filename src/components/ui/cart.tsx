"use client";

import { useState } from "react";
import { useCart } from "@/context/cartContext";
import { useAddresses } from "@/context/AddressContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Trash2, Minus, Plus, ShoppingBag, ArrowLeft, CreditCard, MapPin, PlusCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Cart() {
  const { items, removeItem, updateQuantity, clearCart, total, itemCount } = useCart();
  const { addresses, isLoading: addressesLoading } = useAddresses();
  const [isCreatingOrder, setIsCreatingOrder] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState<string>("");

  // Encontrar la dirección seleccionada
  const selectedAddress = addresses.find(a => a.id.toString() === selectedAddressId);
  const hasAddresses = addresses.length > 0;

  // Si hay direcciones y ninguna seleccionada, seleccionar la primera o predeterminada
  if (hasAddresses && !selectedAddressId) {
    const defaultAddress = addresses.find(a => a.isDefault);
    setSelectedAddressId(defaultAddress ? defaultAddress.id.toString() : addresses[0].id.toString());
  }

  const handleCreateOrder = async () => {
    if (!selectedAddress) return;
    
    setIsCreatingOrder(true);
    try {
      const orderData = {
        items: items.map(item => ({
          product_id: item.id,
          quantity: item.quantity,
          price: item.price,
          name: item.name
        })),
        total: total,
        shipping_cost: total > 50 ? 0 : 5,
        address: selectedAddress,
        status: "pending",
        created_at: new Date().toISOString()
      };
      
      console.log("Creando orden:", orderData);
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert("Orden creada exitosamente");
      
    } catch (error) {
      console.error("Error:", error);
      alert("Error al crear la orden");
    } finally {
      setIsCreatingOrder(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <Card className="max-w-md mx-auto text-center">
          <CardContent className="pt-12">
            <div className="flex flex-col items-center gap-4">
              <div className="bg-gray-100 rounded-full p-4">
                <ShoppingBag className="h-12 w-12 text-gray-400" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Tu carrito está vacío</h2>
              <p className="text-gray-600">Parece que aún no has agregado productos a tu carrito.</p>
              <Link href="/products">
                <Button className="mt-4 gap-2">
                  <ShoppingBag className="h-4 w-4" />
                  Comenzar a comprar
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Columna izquierda - Productos */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              Mi Carrito ({itemCount} {itemCount === 1 ? "producto" : "productos"})
            </h1>
            <Button 
              variant="ghost" 
              onClick={clearCart} 
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Vaciar carrito
            </Button>
          </div>

          <div className="space-y-4">
            {items.map((item) => (
              <Card key={item.id} className="overflow-hidden">
                <div className="flex flex-col sm:flex-row gap-4 p-4">
                  {/* Imagen */}
                  <div className="relative w-full sm:w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                    <Image 
                      src={item.image_url} 
                      alt={item.name} 
                      fill 
                      className="object-contain p-2"
                    />
                  </div>
                  
                  {/* Información */}
                  <div className="flex-1">
                    <Link href={`/products/${item.id}`}>
                      <h3 className="font-semibold text-gray-900 hover:text-primary transition line-clamp-2">
                        {item.name}
                      </h3>
                    </Link>
                    <p className="text-xl font-bold text-primary mt-1">
                      ${item.price.toFixed(2)}
                    </p>
                  </div>
                  
                  {/* Controles */}
                  <div className="flex items-center justify-between sm:justify-end gap-4">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-12 text-center font-medium">
                        {item.quantity}
                      </span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                    
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeItem(item.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Botón para seguir comprando */}
          <div className="mt-6">
            <Link href="/products">
              <Button variant="outline" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Seguir comprando
              </Button>
            </Link>
          </div>
        </div>

        {/* Columna derecha - Resumen y dirección */}
        <div className="lg:w-96 space-y-4">
          {/* Sección de dirección de envío */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                Dirección de envío
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {addressesLoading ? (
                <div className="space-y-2">
                  <div className="h-10 bg-gray-100 rounded animate-pulse" />
                  <div className="h-20 bg-gray-100 rounded animate-pulse" />
                </div>
              ) : !hasAddresses ? (
                <div className="text-center py-6">
                  <p className="text-sm text-gray-600 mb-3">
                    No tienes direcciones guardadas
                  </p>
                  <Link href="/addresses">
                    <Button variant="outline" size="sm" className="gap-2">
                      <PlusCircle className="h-4 w-4" />
                      Agregar dirección
                    </Button>
                  </Link>
                </div>
              ) : (
                <>
                  {/* Selector de direcciones */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Seleccionar dirección
                    </label>
                    <Select 
                      value={selectedAddressId} 
                      onValueChange={setSelectedAddressId}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona una dirección" />
                      </SelectTrigger>
                      <SelectContent>
                        {addresses.map((address) => (
                          <SelectItem key={address.id} value={address.id.toString()}>
                            {address.name} {address.isDefault && "(Predeterminada)"}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Mostrar dirección seleccionada */}
                  {selectedAddress && (
                    <div className="bg-gray-50 rounded-lg p-3 space-y-1 text-sm">
                      <p className="font-medium">{selectedAddress.name}</p>
                      <p className="text-gray-600">{selectedAddress.phone}</p>
                      <p className="text-gray-600">{selectedAddress.address}</p>
                      <p className="text-gray-600">{selectedAddress.municipality}</p>
                      {selectedAddress.notes && (
                        <p className="text-gray-500 text-xs mt-1">
                          📝 {selectedAddress.notes}
                        </p>
                      )}
                    </div>
                  )}

                  <Link href="/addresses">
                    <Button variant="link" size="sm" className="text-primary w-full">
                      Gestionar direcciones →
                    </Button>
                  </Link>
                </>
              )}
            </CardContent>
          </Card>

          {/* Resumen de la orden */}
          <Card>
            <CardHeader>
              <CardTitle>Resumen de la orden</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">${total.toFixed(2)}</span>
              </div>
              <Separator />
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span className="text-primary">
                  ${total.toFixed(2)}
                </span>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full gap-2"
                size="lg"
                onClick={handleCreateOrder}
                disabled={!hasAddresses || !selectedAddress || isCreatingOrder}
              >
                <CreditCard className="h-4 w-4" />
                {isCreatingOrder ? "Procesando..." : "Crear orden"}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}