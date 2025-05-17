import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { Plane, Train, Bus, Car, MapPin, Calendar, Loader2 } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import { useAuth } from "@/contexts/AuthContext";
import { getUserBookings, Booking } from "@/lib/database";

export default function MyBookings() {
  const { user, isLoading: authLoading } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Only fetch bookings if authentication check is complete
    if (authLoading) return;

    // Redirect if not logged in
    if (!user && !authLoading) {
      console.log("No user found, redirecting to signin");
      navigate("/signin");
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
  }, [user, authLoading, toast, navigate]);
  
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
  
  const flightBookings = bookings.filter(booking => booking.booking_type === 'flight');
  const trainBookings = bookings.filter(booking => booking.booking_type === 'train');
  const busBookings = bookings.filter(booking => booking.booking_type === 'bus');
  const carBookings = bookings.filter(booking => booking.booking_type === 'car');
  const placeBookings = bookings.filter(booking => booking.booking_type === 'place');
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'cancelled':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };
  
  const BookingCard = ({ booking }: { booking: Booking }) => {
    const { details } = booking;
    
    let icon = <Plane className="h-5 w-5" />;
    let title = details.airline || details.company || details.name || "Booking";
    
    switch (booking.booking_type) {
      case 'flight':
        icon = <Plane className="h-5 w-5" />;
        break;
      case 'train':
        icon = <Train className="h-5 w-5" />;
        break;
      case 'bus':
        icon = <Bus className="h-5 w-5" />;
        break;
      case 'car':
        icon = <Car className="h-5 w-5" />;
        break;
      case 'place':
        icon = <MapPin className="h-5 w-5" />;
        break;
    }
    
    return (
      <Card>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="h-10 w-10 rounded-full bg-travel-light flex items-center justify-center text-travel-primary">
                {icon}
              </div>
              <div>
                <CardTitle className="text-xl">{title}</CardTitle>
                {booking.booking_type === 'flight' && (
                  <CardDescription>
                    {details.departure} to {details.destination}
                  </CardDescription>
                )}
                {booking.booking_type === 'train' && (
                  <CardDescription>
                    {details.departure} to {details.destination}
                  </CardDescription>
                )}
                {booking.booking_type === 'bus' && (
                  <CardDescription>
                    {details.departure} to {details.destination}
                  </CardDescription>
                )}
                {booking.booking_type === 'car' && (
                  <CardDescription>
                    {details.carModel} - {details.location}
                  </CardDescription>
                )}
                {booking.booking_type === 'place' && (
                  <CardDescription>
                    {details.location}
                  </CardDescription>
                )}
              </div>
            </div>
            <Badge className={getStatusColor(booking.status)}>
              {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center text-sm">
              <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
              <span>
                Booked on {new Date(booking.booking_date).toLocaleDateString()}
              </span>
            </div>
            
            {booking.booking_type !== 'place' && (
              <div className="mt-4">
                <Separator className="my-2" />
                <div className="flex justify-between mt-2 text-sm">
                  <span className="text-muted-foreground">Total Price:</span>
                  <span className="font-medium">${booking.total_price.toFixed(2)}</span>
                </div>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="pt-0">
          <Button variant="outline" className="w-full" onClick={() => navigate(`/booking-confirmed?id=${booking.id}`)}>
            View Details
          </Button>
        </CardFooter>
      </Card>
    );
  };
  
  return (
    <MainLayout>
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-8">My Bookings</h1>
        
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : bookings.length === 0 ? (
          <div className="text-center py-12 border rounded-lg">
            <h3 className="text-xl font-medium mb-2">No bookings found</h3>
            <p className="text-muted-foreground mb-6">
              You haven't made any bookings yet
            </p>
            <Button onClick={() => navigate("/")}>
              Explore Travel Options
            </Button>
          </div>
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {bookings.map((booking) => (
                  <BookingCard key={booking.id} booking={booking} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="flights">
              {flightBookings.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {flightBookings.map((booking) => (
                    <BookingCard key={booking.id} booking={booking} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p>No flight bookings found</p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="trains">
              {trainBookings.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {trainBookings.map((booking) => (
                    <BookingCard key={booking.id} booking={booking} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p>No train bookings found</p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="buses">
              {busBookings.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {busBookings.map((booking) => (
                    <BookingCard key={booking.id} booking={booking} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p>No bus bookings found</p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="cars">
              {carBookings.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {carBookings.map((booking) => (
                    <BookingCard key={booking.id} booking={booking} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p>No car bookings found</p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="places">
              {placeBookings.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {placeBookings.map((booking) => (
                    <BookingCard key={booking.id} booking={booking} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p>No place bookings found</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        )}
      </div>
    </MainLayout>
  );
}
