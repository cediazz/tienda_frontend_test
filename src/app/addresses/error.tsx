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
    console.error("Error en direcciones:", error);
  }, [error]);

  return (
    <ErrorComponent 
      errorMessage={error.message}
      reset={reset}
    />
  );
}