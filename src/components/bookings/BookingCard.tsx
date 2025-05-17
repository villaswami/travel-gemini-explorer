
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
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Plane, Train, Bus, Car, MapPin, Calendar } from "lucide-react";
import { Booking } from "@/lib/database";

interface BookingCardProps {
  booking: Booking;
}

export const getStatusColor = (status: string) => {
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

export const BookingCard = ({ booking }: BookingCardProps) => {
  const navigate = useNavigate();
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
