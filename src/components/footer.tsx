// components/Footer.tsx
import Link from "next/link";
import { Phone, MapPin, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-primary text-white mt-16">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Columna 1: Descripción */}
          <div>
            <h3 className="font-bold text-xl text-white mb-4">Tienda</h3>
            <p className="text-sm text-blue-100 leading-relaxed">
              Eslogan
            </p>
          </div>

          {/* Columna 2: Enlaces Rápidos */}
          <div>
            <h4 className="font-semibold text-white mb-4">Enlaces Rápidos</h4>
            <ul className="space-y-2 text-sm text-blue-100">
              <li>
                <Link href="/products" className="hover:text-white hover:underline transition">
                  Productos
                </Link>
              </li>
              <li>
                <Link href="/destinos" className="hover:text-white hover:underline transition">
                  Destinos de Envío
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="hover:text-white hover:underline transition">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 3: Contacto */}
          <div>
            <h4 className="font-semibold text-white mb-4">Contacto</h4>
            <div className="space-y-3 text-sm text-blue-100">
              <div className="flex items-center gap-2">
                <a 
                  href="https://wa.me/16893523554" 
                  className="hover:text-white hover:underline transition"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  #Telf
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-blue-200" />
                <a 
                  href="" 
                  className="hover:text-white hover:underline transition"
                >
                  Email
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-blue-800 text-center text-xs text-blue-200">
          <p>© 2025 Tienda. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}