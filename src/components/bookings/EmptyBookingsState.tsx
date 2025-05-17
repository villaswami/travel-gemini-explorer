
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const EmptyBookingsState = () => {
  const navigate = useNavigate();
  
  return (
    <div className="text-center py-12 border rounded-lg">
      <h3 className="text-xl font-medium mb-2">No bookings found</h3>
      <p className="text-muted-foreground mb-6">
        You haven't made any bookings yet
      </p>
      <Button onClick={() => navigate("/")}>
        Explore Travel Options
      </Button>
    </div>
  );
};
