"use client";

import { useEffect } from "react";
import ErrorComponent from "@/components/error";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log del error a un servicio de monitoreo
    console.error("Error en productos:", error);
  }, [error]);

  return (
    <ErrorComponent errorMessage={error.message}/>
  );
}