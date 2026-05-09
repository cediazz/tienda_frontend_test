"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";
import { AuthForm } from "./AuthForm";

export function MobileAuthButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button 
        variant="default" 
        className="w-full gap-2"
        onClick={() => setIsOpen(true)}
      >
        <LogIn className="h-4 w-4" />
        Iniciar Sesión
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl">
              Bienvenido a Tienda
            </DialogTitle>
          </DialogHeader>
          <AuthForm onSuccess={() => setIsOpen(false)} />
        </DialogContent>
      </Dialog>
    </>
  );
}