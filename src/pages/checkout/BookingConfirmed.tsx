
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, Calendar, MapPin, User, Download, Plane, Train, Bus, Car } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { Link } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";

// Mock booking confirmation data
const bookingConfirmation = {
  bookingNumber: "TRV-" + Math.floor(100000 + Math.random() * 900000),
  date: new Date().toLocaleDateString(),
  status: "Confirmed",
};

export default function BookingConfirmed() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    // Show success toast when component mounts
    toast({
      title: "Booking confirmed!",
      description: `Your booking #${bookingConfirmation.bookingNumber} has been confirmed.`,
    });
  }, [toast]);
  
  const handleDownloadTicket = () => {
    setLoading(true);
    
    // Simulate download delay
    setTimeout(() => {
      toast({
        title: "Ticket downloaded",
        description: "Your e-ticket has been downloaded successfully.",
      });
      setLoading(false);
    }, 1500);
  };
  
  // Generate a random icon for the booking
  const BookingIcon = () => {
    const icons = [Plane, Train, Bus, Car];
    const RandomIcon = icons[Math.floor(Math.random() * icons.length)];
    return <RandomIcon className="h-8 w-8 text-travel-primary" />;
  };
  
  return (
    <MainLayout>
      <div className="container mx-auto py-8 px-4 max-w-4xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Booking Confirmed!</h1>
          <p className="text-lg text-muted-foreground">
            Thank you for your booking. All the details have been sent to your email.
          </p>
        </div>
        
        <Card className="mb-8">
          <CardContent className="py-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <div className="bg-travel-light w-12 h-12 rounded-full flex items-center justify-center mr-4">
                  <BookingIcon />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Booking Reference</h3>
                  <p className="text-lg font-mono">{bookingConfirmation.bookingNumber}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Booking Date</p>
                <p className="font-medium">{bookingConfirmation.date}</p>
              </div>
            </div>
            
            <Separator className="my-6" />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-start">
                <Calendar className="h-5 w-5 mr-3 text-travel-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Travel Date</p>
                  <p className="text-muted-foreground">Tomorrow</p>
                  <p className="text-sm">Booking Status: <span className="text-green-600 font-medium">{bookingConfirmation.status}</span></p>
                </div>
              </div>
              
              <div className="flex items-start">
                <MapPin className="h-5 w-5 mr-3 text-travel-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Location</p>
                  <p className="text-muted-foreground">Check your email for details</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <User className="h-5 w-5 mr-3 text-travel-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Traveler</p>
                  <p className="text-muted-foreground">Primary Contact</p>
                </div>
              </div>
            </div>
            
            <Separator className="my-6" />
            
            <div className="text-center space-y-4">
              <Button
                className="px-8"
                onClick={handleDownloadTicket}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                    Downloading...
                  </>
                ) : (
                  <>
                    <Download className="mr-2 h-4 w-4" /> Download E-Ticket
                  </>
                )}
              </Button>
              <p className="text-sm text-muted-foreground">
                Your booking details have been emailed to you.
              </p>
            </div>
          </CardContent>
        </Card>
        
        <div className="text-center space-y-6">
          <h3 className="text-xl font-medium">What's next?</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <Link to="/assistant" className="block">
              <Card className="hover:shadow-md transition-shadow h-full">
                <CardContent className="p-6 text-center">
                  <div className="bg-travel-light w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="h-6 w-6 text-travel-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                  </div>
                  <h4 className="font-medium">Travel Assistant</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Get recommendations and assistance
                  </p>
                </CardContent>
              </Card>
            </Link>
            
            <Link to="/profile/bookings" className="block">
              <Card className="hover:shadow-md transition-shadow h-full">
                <CardContent className="p-6 text-center">
                  <div className="bg-travel-light w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="h-6 w-6 text-travel-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <h4 className="font-medium">View My Bookings</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Manage all your travel bookings
                  </p>
                </CardContent>
              </Card>
            </Link>
            
            <Link to="/places" className="block">
              <Card className="hover:shadow-md transition-shadow h-full">
                <CardContent className="p-6 text-center">
                  <div className="bg-travel-light w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="h-6 w-6 text-travel-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <h4 className="font-medium">Explore Places</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Find more places to visit
                  </p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
