
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
import Trains from "./pages/transport/Trains";
import Buses from "./pages/transport/Buses";
import Cars from "./pages/transport/Cars";
import Places from "./pages/transport/Places";
import Checkout from "./pages/checkout/Checkout";
import BookingConfirmed from "./pages/checkout/BookingConfirmed";
import Profile from "./pages/profile/Profile";
import MyBookings from "./pages/profile/MyBookings";
import Bookings from "./pages/Bookings";
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
            <Route path="/trains" element={<Trains />} />
            <Route path="/buses" element={<Buses />} />
            <Route path="/cars" element={<Cars />} />
            <Route path="/places" element={<Places />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/booking-confirmed" element={<BookingConfirmed />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/bookings" element={<MyBookings />} />
            <Route path="/bookings" element={<Bookings />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
