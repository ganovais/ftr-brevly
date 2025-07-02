import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";

import { LinkProvider } from "./providers/link";
import { Routes } from "./routes";
import "./styles/global.css";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster richColors />
      <LinkProvider>
        <Routes />
      </LinkProvider>
    </QueryClientProvider>
  );
}

export default App;
