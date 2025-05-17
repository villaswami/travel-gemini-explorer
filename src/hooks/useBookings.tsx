
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { Booking, getUserBookings } from "@/lib/database";

export const useBookings = () => {
  const { user, isLoading: authLoading } = useAuth();
  const { toast } = useToast();
  
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (authLoading) return;

    if (!user && !authLoading) {
      console.log("No user found in useBookings hook");
      return;
    }
    
    const fetchBookings = async () => {
      if (!user) return;
      
      try {
        console.log("Fetching bookings for user:", user.id);
        const userBookings = await getUserBookings(user.id);
        setBookings(userBookings);
      } catch (error) {
        console.error("Error fetching bookings:", error);
        toast({
          title: "Error",
          description: "Failed to load your bookings",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchBookings();
  }, [user, authLoading, toast]);

  const filterBookingsByType = (type: string) => {
    return bookings.filter(booking => booking.booking_type === type);
  };
  
  return {
    bookings,
    loading,
    filterBookingsByType,
    flightBookings: filterBookingsByType('flight'),
    trainBookings: filterBookingsByType('train'),
    busBookings: filterBookingsByType('bus'),
    carBookings: filterBookingsByType('car'),
    placeBookings: filterBookingsByType('place')
  };
};
