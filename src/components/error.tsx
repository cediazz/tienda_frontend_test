"use client";

import { AlertCircle } from "lucide-react";

interface errorProps {
    errorMessage : string
}

export default function ErrorComponent({errorMessage}:errorProps) {
  
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4 px-4">
      <div className="text-center max-w-md">
        <div className="bg-red-100 rounded-full p-3 mx-auto w-fit mb-4">
          <AlertCircle className="h-8 w-8 text-red-600" />
        </div>
        
        <h2 className="text-2xl font-bold text-red-600 mb-2">
          Algo salió mal
        </h2>
        
        <p className="text-gray-600 mb-4">
          No pudimos cargar la información. Por favor, intenta de nuevo.
        </p>
        
        {errorMessage && process.env.NODE_ENV === "development" && (
          <div className="bg-gray-100 p-3 rounded-md mb-4 text-left">
            <p className="text-sm font-mono text-red-600">
              Error: {errorMessage}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}