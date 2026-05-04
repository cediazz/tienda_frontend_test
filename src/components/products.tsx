"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Search, ShoppingCart, Filter, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Product } from "@/interfaces/productInterfaces";
import Image from "next/image";

export default function Products({ products }: { products: Product[] }) {
  const [category, setCategory] = useState("");

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <main className="flex-1">
        {/* Hero Section con título */}
        <section className="bg-gradient-to-r from-blue-50 to-indigo-50 py-12">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                Nuestros Productos
              </h1>
              <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                Descubre nuestra completa colección de productos de alta calidad
              </p>
            </div>
          </div>
        </section>

        {/* Card de Filtros - Mejorado */}
        <section className="container mx-auto px-4 -mt-8">
          <Card className="max-w-4xl mx-auto shadow-xl border-0 bg-white">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Filter className="h-5 w-5 text-primary" />
                  <CardTitle className="text-xl font-semibold text-gray-800">
                    Filtrar Productos
                  </CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Búsqueda por nombre */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <Search className="h-4 w-4 text-primary" />
                    Buscar por nombre
                  </label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      type="search"
                      placeholder="Ej: Aceite, Arroz, Café..."
                      className="pl-10 border-gray-200 focus:border-primary focus:ring-primary bg-gray-50"
                    />
                  </div>
                </div>

                {/* Filtro por categoría */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <Filter className="h-4 w-4 text-primary" />
                    Categoría
                  </label>
                  <select
                    className="w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="">Todas las categorías</option>
                  </select>
                </div>
              </div>
            </CardContent>
            <CardFooter className="pt-0 flex justify-between items-center border-t-0">
              <div className="text-sm text-gray-500">
                {products.length} producto{products.length !== 1 ? "s" : ""}{" "}
                encontrado{products.length !== 1 ? "s" : ""}
              </div>
            </CardFooter>
          </Card>
        </section>

        {/* Listado de Productos */}
        <section className="container mx-auto px-4 py-12">
          {products.length === 0 ? (
            <Card className="text-center py-12 bg-white shadow-sm">
              <CardContent className="pt-12">
                <p className="text-gray-500 mb-4">
                  No se encontraron productos con esos filtros.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <Card
                  key={product.id}
                  className="group hover:shadow-xl transition-all duration-300 overflow-hidden border-gray-100"
                >
                  <div className="aspect-square bg-gray-100 relative">
                    <div className="w-full h-full flex items-center justify-center">
                      <Image
                        src={product.image}
                        alt={product.title}
                        width={200}
                        height={200}
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        //onError={() => setImageError(true)}
                      />
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="line-clamp-2 text-lg text-gray-900">
                      {product.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="line-clamp-3 text-sm text-gray-600">
                      {product.description}
                    </p>
                    <p className="mt-3 text-2xl font-bold text-primary">
                      ${product.price.toFixed(2)}
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button
                      className="w-full gap-2"
                      onClick={() =>
                        console.log(`Agregar ${product.title} al carrito`)
                      }
                    >
                      <ShoppingCart className="h-4 w-4" />
                      Agregar al carrito
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
