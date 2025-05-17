
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { CheckCircle, Calendar, Plane, Download, MessageSquare } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";

export default function BookingConfirmed() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const bookingDetails = {
    bookingId: "TME" + Math.floor(1000000 + Math.random() * 9000000),
    type: "Flight",
    title: "New York (JFK) to Los Angeles (LAX)",
    date: new Date(Date.now() + 86400000).toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    }),
    time: "08:30 - 11:45",
    passengers: 1,
    airline: "Blue Sky Airlines",
    flightNumber: "BS1234",
    terminal: "Terminal 4",
    gate: "G12"
  };

  return (
    <MainLayout>
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-green-100 text-green-600 mb-4">
              <CheckCircle className="h-8 w-8" />
            </div>
            <h1 className="text-3xl font-bold mb-2">Booking Confirmed!</h1>
            <p className="text-muted-foreground">
              Your booking has been confirmed and your e-ticket has been sent to your email.
            </p>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Booking Details</span>
                <span className="text-sm font-normal text-muted-foreground">
                  Booking ID: {bookingDetails.bookingId}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-6">
                <div className="h-12 w-12 rounded-full bg-travel-light flex items-center justify-center">
                  <Plane className="h-6 w-6 text-travel-primary" />
                </div>
                <div className="flex-grow">
                  <h3 className="text-xl font-medium">{bookingDetails.title}</h3>
                  <p className="text-muted-foreground">{bookingDetails.airline} · Flight {bookingDetails.flightNumber}</p>
                </div>
              </div>

              <Separator />

              <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-6">
                <div className="h-12 w-12 rounded-full bg-travel-light flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-travel-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-medium">{bookingDetails.date}</h3>
                  <p className="text-muted-foreground">{bookingDetails.time}</p>
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Terminal</h4>
                  <p className="text-lg">{bookingDetails.terminal}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Gate</h4>
                  <p className="text-lg">{bookingDetails.gate}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Passengers</h4>
                  <p className="text-lg">{bookingDetails.passengers}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Class</h4>
                  <p className="text-lg">Economy</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
              <Button className="w-full md:w-auto">
                <Download className="mr-2 h-4 w-4" />
                Download E-Ticket
              </Button>
              <Button variant="outline" className="w-full md:w-auto">
                <MessageSquare className="mr-2 h-4 w-4" />
                Contact Support
              </Button>
            </CardFooter>
          </Card>

          <div className="bg-travel-light rounded-lg p-6 mb-8">
            <h3 className="text-lg font-medium mb-3">Important Information</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <svg className="h-5 w-5 text-travel-primary mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>Please arrive at the airport at least 2 hours before your flight's departure time.</span>
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-travel-primary mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>Bring a valid government-issued photo ID for domestic flights or passport for international flights.</span>
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-travel-primary mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>Check your airline's website for the latest baggage policy and restrictions.</span>
              </li>
            </ul>
          </div>

          <div className="text-center space-y-4">
            <p>Need any assistance with your booking?</p>
            <div className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-4">
              <Button asChild variant="outline">
                <Link to="/bookings">View All Bookings</Link>
              </Button>
              <Button asChild>
                <Link to="/">Book Another Trip</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
