"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/interfaces/productInterfaces";
import { Loader2 } from "lucide-react";

export default function ProductImage({ product }: { product: Product }) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  return (
    <Link href={`/products/${product.id}`} className="block w-full h-full">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-10">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      )}
      
      {hasError ? (
        <div className="w-full h-full flex items-center justify-center bg-gray-100">
          <span className="text-gray-500 text-sm">Imagen no disponible</span>
        </div>
      ) : (
        <Image
          src={product.image}
          alt={product.title}
          width={200}
          height={200}
          className={`
            object-cover group-hover:scale-105 transition-all duration-300
            ${isLoading ? 'opacity-0' : 'opacity-100'}
          `}
          onLoadingComplete={() => setIsLoading(false)}
          onError={() => {
            setIsLoading(false);
            setHasError(true);
          }}
        />
      )}
    </Link>
  );
}