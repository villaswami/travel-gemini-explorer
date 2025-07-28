import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { CreditCard } from "lucide-react";

interface PaymentButtonProps {
  amount: number;
  currency?: string;
  bookingDetails: any;
  onSuccess?: () => void;
}

export const PaymentButton = ({ 
  amount, 
  currency = "usd", 
  bookingDetails, 
  onSuccess 
}: PaymentButtonProps) => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  const handlePayment = async () => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to continue with payment",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);
      
      const { data, error } = await supabase.functions.invoke('create-payment', {
        body: {
          amount,
          currency,
          bookingDetails
        }
      });

      if (error) throw error;

      if (data.url) {
        // Open Stripe checkout in a new tab
        window.open(data.url, '_blank');
        onSuccess?.();
      }

    } catch (error: any) {
      console.error('Payment error:', error);
      toast({
        title: "Payment Error",
        description: error.message || "Failed to initiate payment",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button 
      onClick={handlePayment} 
      disabled={loading}
      className="w-full"
      size="lg"
    >
      <CreditCard className="mr-2 h-4 w-4" />
      {loading ? "Processing..." : `Pay $${amount.toFixed(2)}`}
    </Button>
  );
};