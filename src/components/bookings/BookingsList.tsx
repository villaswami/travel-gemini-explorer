
import { Booking } from "@/lib/database";
import { BookingCard } from "./BookingCard";

interface BookingsListProps {
  bookings: Booking[];
}

export const BookingsList = ({ bookings }: BookingsListProps) => {
  if (bookings.length === 0) {
    return (
      <div className="text-center py-8">
        <p>No bookings found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {bookings.map((booking) => (
        <BookingCard key={booking.id} booking={booking} />
      ))}
    </div>
  );
};
