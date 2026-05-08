"use client";
import { useCart } from "@/context/cartContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Trash2, Minus, Plus, ShoppingBag, ArrowLeft, CreditCard } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Cart() {
  const { items, removeItem, updateQuantity, clearCart, total, itemCount } = useCart();
  const [isCreatingOrder, setIsCreatingOrder] = useState(false);

  const handleCreateOrder = async () => {
    setIsCreatingOrder(true);
    
    try {
      // Preparar los datos de la orden
      const orderData = {
        items: items.map(item => ({
          product_id: item.id,
          quantity: item.quantity,
          price: item.price
        })),
        total: total,
        status: "pending",
        created_at: new Date().toISOString()
      };
      
      console.log("Creando orden:", orderData);
      
      // Aquí iría la llamada a tu API para crear la orden
      // const response = await fetch('/api/orders', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(orderData)
      // });
      
      // Simular llamada a API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      alert("Orden creada exitosamente");
      // clearCart(); // Opcional: limpiar carrito después de crear orden
      
    } catch (error) {
      console.error("Error al crear orden:", error);
      alert("Error al crear la orden. Por favor, intenta de nuevo.");
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
              <p className="text-gray-600">
                Parece que aún no has agregado productos a tu carrito.
              </p>
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
        {/* Columna izquierda - Lista de productos */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              Mi Carrito ({itemCount} {itemCount === 1 ? "producto" : "productos"})
            </h1>
            <Button
              variant="destructive"
              onClick={clearCart}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Vaciar carrito
            </Button>
          </div>

          <div className="space-y-4">
            {items.map((item) => (
              <Card key={item.id} className="overflow-hidden">
                <div className="flex flex-col sm:flex-row gap-4 p-4">
                  {/* Imagen del producto */}
                  <div className="relative w-full sm:w-32 h-32 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={item.image_url}
                      alt={item.name}
                      fill
                      className="object-contain p-2"
                      sizes="128px"
                    />
                  </div>

                  {/* Información del producto */}
                  <div className="flex-1 space-y-2">
                    <Link href={`/products/${item.id}`}>
                      <h3 className="font-semibold text-gray-900 hover:text-primary transition line-clamp-2">
                        {item.name}
                      </h3>
                    </Link>
                    <p className="text-2xl font-bold text-primary">
                      ${item.price.toFixed(2)}
                    </p>
                  </div>

                  {/* Controles de cantidad */}
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

        {/* Columna derecha - Resumen de la orden */}
        <div className="lg:w-96">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle className="text-xl">Resumen de la orden</CardTitle>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Lista de costos */}
              <div className="space-y-2">
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
              </div>
            </CardContent>

            <CardFooter>
              <Button
                className="w-full gap-2"
                size="lg"
                onClick={handleCreateOrder}
                disabled={isCreatingOrder}
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