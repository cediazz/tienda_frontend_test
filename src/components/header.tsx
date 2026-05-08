"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  ShoppingCart,
  LogIn,
  Home,
  Package,
  MapPin,
  Menu,
  X,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useCart } from "@/context/cartContext";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { itemCount } = useCart();

  const navItems = [
    { name: "Inicio", href: "/", icon: Home },
    { name: "Productos", href: "/products", icon: Package },
    { name: "Destinos", href: "/destinos", icon: MapPin },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-md border-b border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo y Nombre */}
          <Link
            href="/"
            className="flex items-center space-x-2 hover:opacity-80 transition"
          >
            <span className="font-bold text-xl text-primary">TiendaLogo</span>
          </Link>

          {/* Navegación Desktop */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:text-primary hover:bg-gray-100 transition-all duration-200"
              >
                <item.icon className="h-4 w-4" />
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Acciones Desktop */}
          <div className="hidden md:flex items-center space-x-3">
            <Link href="/cart">
            <Button
              variant="outline"
              size="icon"
              aria-label="Carrito"
              className="relative hover:bg-gray-100"
            >
              <ShoppingCart className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full text-xs h-5 w-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Button>
            </Link>

            <Dialog>
              <DialogTrigger asChild>
                <Button variant="default" size="sm" className="gap-2">
                  <LogIn className="h-4 w-4" />
                  Iniciar Sesión
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Autenticación</DialogTitle>
                  <DialogDescription>
                    Ingresa tus credenciales para continuar
                  </DialogDescription>
                </DialogHeader>
                <form className="space-y-4 mt-4">
                  <input
                    type="email"
                    placeholder="Correo electrónico"
                    className="w-full px-3 py-2 border rounded-md"
                  />
                  <input
                    type="password"
                    placeholder="Contraseña"
                    className="w-full px-3 py-2 border rounded-md"
                  />
                  <Button className="w-full">Iniciar Sesión</Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {/* Menú Móvil (Responsive) */}
          <div className="flex md:hidden items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              aria-label="Carrito"
              onClick={() => console.log("Abrir carrito móvil")}
            >
              <ShoppingCart className="h-5 w-5" />
            </Button>

            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[250px] sm:w-[300px]">
                <div className="flex flex-col space-y-4 mt-8">
                  {navItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="flex items-center gap-3 px-3 py-2 text-base font-medium rounded-md hover:bg-gray-100 transition"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <item.icon className="h-5 w-5" />
                      {item.name}
                    </Link>
                  ))}
                  <div className="pt-4 border-t">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="default" className="w-full gap-2">
                          <LogIn className="h-4 w-4" />
                          Iniciar Sesión
                        </Button>
                      </DialogTrigger>
                    </Dialog>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
