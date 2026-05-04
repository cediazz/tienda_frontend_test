import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Truck, Shield } from "lucide-react";
import Image from "next/image";
import { Product } from "@/interfaces/productInterfaces";
import Link from "next/link";

interface productDetailProps{
    product:Product
}

export default async function ProductDetail({product}:productDetailProps) {
  
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      {/* Breadcrumb */}
      <nav className="mb-6 text-sm text-gray-500">
        <ol className="flex flex-wrap items-center gap-2">
          <li>
            <Link href="/" className="hover:text-primary transition">Inicio</Link>
          </li>
          <li>/</li>
          <li>
            <Link href="/products" className="hover:text-primary transition">Productos</Link>
          </li>
          <li>/</li>
          <li className="text-gray-700 font-medium truncate">{product.title}</li>
        </ol>
      </nav>

      {/* Grid de detalle */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {/* Columna izquierda - Imagen */}
        <div className="space-y-4">
          <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden relative">
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-contain p-6"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="aspect-square bg-gray-50 rounded-md overflow-hidden relative cursor-pointer hover:ring-2 hover:ring-primary transition"
              >
                <Image
                  src={product.image}
                  alt={`${product.title} - vista ${i}`}
                  fill
                  className="object-contain p-2"
                  sizes="100px"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Columna derecha - Información */}
        <div className="space-y-6">
          {/* Categoría */}
          <Badge variant="secondary" className="w-fit capitalize">
            {product.category}
          </Badge>

          {/* Título */}
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
            {product.title}
          </h1>

          {/* Precio */}
          <div className="border-t border-b py-6">
            <p className="text-3xl md:text-4xl font-bold text-primary">
              ${product.price.toFixed(2)}
            </p>
            {product.price > 50 && (
              <p className="text-sm text-green-600 mt-2 flex items-center gap-1">
                <Truck className="h-4 w-4" />
                Envío gratis disponible
              </p>
            )}
          </div>

          {/* Descripción */}
          <div className="space-y-3">
            <h2 className="text-lg font-semibold text-gray-900">Descripción</h2>
            <p className="text-gray-600 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Características */}
          <Card className="bg-gray-50 border-0">
            <CardContent className="p-4 space-y-2">
              <div className="flex items-center gap-3 text-sm">
                <Shield className="h-4 w-4 text-primary" />
                <span className="text-gray-600">Producto 100% original</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Truck className="h-4 w-4 text-primary" />
                <span className="text-gray-600">Envío a toda Cuba</span>
              </div>
            </CardContent>
          </Card>

          {/* Botones de acción */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button size="lg" className="flex-1 gap-2">
              <ShoppingCart className="h-5 w-5" />
              Agregar al carrito
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}