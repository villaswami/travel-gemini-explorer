
import { Booking } from "@/lib/database";
import { BookingsList } from "./BookingsList";
import { EmptyBookingsState } from "./EmptyBookingsState";

interface BookingsTabContentProps {
  bookings: Booking[];
  isEmpty: boolean;
}

export const BookingsTabContent = ({ bookings, isEmpty }: BookingsTabContentProps) => {
  if (isEmpty) {
    return <EmptyBookingsState />;
  }
  
  return <BookingsList bookings={bookings} />;
};
