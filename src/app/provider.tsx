import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { queryConfig } from "@/libs/react-query";
import { AuthLoader } from "@/libs/auth";
import { AuthProvider } from "@/providers/auth";
import { AppRouter } from "./router";

const queryClient = new QueryClient({
  defaultOptions: queryConfig,
});

export const AppProvider = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <AuthProvider>
        <AuthLoader />
        <AppRouter queryClient={queryClient} />
      </AuthProvider>
    </QueryClientProvider>
  );
};
