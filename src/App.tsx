
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import AIAssistant from "./pages/assistant/AIAssistant";
import Flights from "./pages/transport/Flights";
import Checkout from "./pages/checkout/Checkout";
import BookingConfirmed from "./pages/checkout/BookingConfirmed";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/assistant" element={<AIAssistant />} />
            <Route path="/flights" element={<Flights />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/booking-confirmed" element={<BookingConfirmed />} />
            {/* These routes will be implemented later */}
            <Route path="/trains" element={<Flights />} />
            <Route path="/buses" element={<Flights />} />
            <Route path="/cars" element={<Flights />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
