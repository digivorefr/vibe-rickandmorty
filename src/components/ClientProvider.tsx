"use client";

import { QueryClientProvider, type QueryClient } from "@tanstack/react-query";

export default function ClientProvider({
  children,
  queryClient,
}: {
  children: React.ReactNode;
  queryClient: QueryClient;
}) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
