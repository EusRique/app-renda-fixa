import { retry } from "@reduxjs/toolkit/query";
import { QueryClient } from "@tanstack/react-query";

export const QueryClients = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 2, // 2 minutes
      retry: 1, // retry once on failure
    }
  }
});