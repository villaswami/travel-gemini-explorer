
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Loader2, Plane, Train, Bus, Car, MapPin } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import { useAuth } from "@/contexts/AuthContext";
import { BookingsTabContent } from "@/components/bookings/BookingsTabContent";
import { useBookings } from "@/hooks/useBookings";

export default function MyBookings() {
  const { user, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();
  
  const {
    bookings,
    loading,
    flightBookings,
    trainBookings,
    busBookings,
    carBookings,
    placeBookings
  } = useBookings();
  
  useEffect(() => {
    // Only redirect if authentication check is complete
    if (!authLoading && !user) {
      console.log("No user found, redirecting to signin");
      navigate("/signin");
    }
  }, [user, authLoading, navigate]);
  
  // If still checking auth status, show loading
  if (authLoading) {
    return (
      <MainLayout>
        <div className="flex justify-center items-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </MainLayout>
    );
  }
  
  // If auth check complete and no user, we'll redirect in useEffect
  if (!user && !authLoading) {
    return null;
  }
  
  return (
    <MainLayout>
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-8">My Bookings</h1>
        
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : bookings.length === 0 ? (
          <BookingsTabContent bookings={[]} isEmpty={true} />
        ) : (
          <Tabs defaultValue="all">
            <TabsList className="grid grid-cols-6 mb-8">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="flights" className="flex items-center">
                <Plane className="mr-2 h-4 w-4" />
                Flights
              </TabsTrigger>
              <TabsTrigger value="trains" className="flex items-center">
                <Train className="mr-2 h-4 w-4" />
                Trains
              </TabsTrigger>
              <TabsTrigger value="buses" className="flex items-center">
                <Bus className="mr-2 h-4 w-4" />
                Buses
              </TabsTrigger>
              <TabsTrigger value="cars" className="flex items-center">
                <Car className="mr-2 h-4 w-4" />
                Cars
              </TabsTrigger>
              <TabsTrigger value="places" className="flex items-center">
                <MapPin className="mr-2 h-4 w-4" />
                Places
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="all">
              <BookingsTabContent bookings={bookings} isEmpty={bookings.length === 0} />
            </TabsContent>
            
            <TabsContent value="flights">
              <BookingsTabContent bookings={flightBookings} isEmpty={flightBookings.length === 0} />
            </TabsContent>
            
            <TabsContent value="trains">
              <BookingsTabContent bookings={trainBookings} isEmpty={trainBookings.length === 0} />
            </TabsContent>
            
            <TabsContent value="buses">
              <BookingsTabContent bookings={busBookings} isEmpty={busBookings.length === 0} />
            </TabsContent>
            
            <TabsContent value="cars">
              <BookingsTabContent bookings={carBookings} isEmpty={carBookings.length === 0} />
            </TabsContent>
            
            <TabsContent value="places">
              <BookingsTabContent bookings={placeBookings} isEmpty={placeBookings.length === 0} />
            </TabsContent>
          </Tabs>
        )}
      </div>
    </MainLayout>
  );
}
