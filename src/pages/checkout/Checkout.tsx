
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate, useLocation } from "react-router-dom";
import { CreditCard, Plane, Train, Bus, Car, MapPin, Calendar } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import { useAuth } from "@/contexts/AuthContext";
import { PaymentButton } from "@/components/payment/PaymentButton";
import { flightData, trainData, busData, carData, placesData } from "@/data/transportData";

export default function Checkout() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("credit-card");
  
  // Get booking details from URL params
  const queryParams = new URLSearchParams(location.search);
  const bookingType = queryParams.get("type") || "flight";
  const bookingId = queryParams.get("id") || "";
  
  // Redirect if not logged in
  if (!user) {
    navigate("/signin");
    return null;
  }
  
  // Get item details based on the booking type
  let item;
  let itemIcon;
  
  switch (bookingType) {
    case "flight":
      item = flightData.find(item => item.id === bookingId);
      itemIcon = <Plane className="h-5 w-5 text-travel-primary" />;
      break;
    case "train":
      item = trainData.find(item => item.id === bookingId);
      itemIcon = <Train className="h-5 w-5 text-travel-primary" />;
      break;
    case "bus":
      item = busData.find(item => item.id === bookingId);
      itemIcon = <Bus className="h-5 w-5 text-travel-primary" />;
      break;
    case "car":
      item = carData.find(item => item.id === bookingId);
      itemIcon = <Car className="h-5 w-5 text-travel-primary" />;
      break;
    case "place":
      item = placesData.find(item => item.id === bookingId);
      itemIcon = <MapPin className="h-5 w-5 text-travel-primary" />;
      break;
    default:
      break;
  }
  
  if (!item) {
    navigate("/");
    return null;
  }
  
  // Get the price based on the item type
  const getPrice = () => {
    switch (bookingType) {
      case "flight":
      case "train":
      case "bus":
        return (item as any).price;
      case "car":
        return (item as any).pricePerDay * 3; // Default rental period
      case "place":
        return 0; // Places don't have direct prices
      default:
        return 0;
    }
  };
  
  const price = getPrice();
  const taxRate = bookingType === "place" ? 0 : 0.15;
  const baseFare = bookingType === "place" ? 0 : price * (1 - taxRate);
  const taxFees = bookingType === "place" ? 0 : price * taxRate;
  
  // Get the title based on the booking type
  const getTitle = () => {
    switch (bookingType) {
      case "flight":
        return `${(item as any).departure} to ${(item as any).destination}`;
      case "train":
        return `${(item as any).departure} to ${(item as any).destination}`;
      case "bus":
        return `${(item as any).departure} to ${(item as any).destination}`;
      case "car":
        return `${(item as any).carModel}`;
      case "place":
        return (item as any).name;
      default:
        return "Booking";
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Create booking details based on the item type
      const bookingDetails: Record<string, any> = {};
      
      switch (bookingType) {
        case "flight":
          bookingDetails.airline = (item as any).airline;
          bookingDetails.departure = (item as any).departure;
          bookingDetails.destination = (item as any).destination;
          bookingDetails.departureTime = (item as any).departureTime;
          bookingDetails.arrivalTime = (item as any).arrivalTime;
          break;
        case "train":
          bookingDetails.company = (item as any).company;
          bookingDetails.departure = (item as any).departure;
          bookingDetails.destination = (item as any).destination;
          bookingDetails.departureTime = (item as any).departureTime;
          bookingDetails.arrivalTime = (item as any).arrivalTime;
          break;
        case "bus":
          bookingDetails.company = (item as any).company;
          bookingDetails.departure = (item as any).departure;
          bookingDetails.destination = (item as any).destination;
          bookingDetails.departureTime = (item as any).departureTime;
          bookingDetails.arrivalTime = (item as any).arrivalTime;
          break;
        case "car":
          bookingDetails.company = (item as any).company;
          bookingDetails.carModel = (item as any).carModel;
          bookingDetails.carType = (item as any).carType;
          bookingDetails.location = (item as any).location;
          break;
        case "place":
          bookingDetails.name = (item as any).name;
          bookingDetails.location = (item as any).location;
          bookingDetails.category = (item as any).category;
          bookingDetails.imageUrl = (item as any).imageUrl;
          break;
      }
      
      // For places, just simulate adding to itinerary
      if (bookingType === "place") {
        toast({
          title: "Added to itinerary!",
          description: "This place has been added to your travel plans.",
        });
        navigate("/bookings");
        return;
      }

      // For paid bookings, use Stripe payment
      toast({
        title: "Payment successful!",
        description: "Your booking has been confirmed.",
      });
      
      toast({
        title: "Payment successful!",
        description: "Your booking has been confirmed.",
      });
      
      // Redirect to booking confirmation page
      navigate("/booking-confirmed");
    } catch (error) {
      console.error("Booking error:", error);
      toast({
        title: "Booking failed",
        description: "There was an error processing your booking",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-8">Complete Your Booking</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Payment Form */}
          <div className="md:col-span-2">
            <form onSubmit={handleSubmit}>
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Passenger Information</CardTitle>
                  <CardDescription>Enter the passenger details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Pre-fill with user data if available */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="first-name">First Name</Label>
                      <Input 
                        id="first-name" 
                        defaultValue={user?.user_metadata?.full_name?.split(' ')[0] || ''} 
                        required 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last-name">Last Name</Label>
                      <Input 
                        id="last-name" 
                        defaultValue={user?.user_metadata?.full_name?.split(' ')[1] || ''} 
                        required 
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      defaultValue={user?.email || ''} 
                      required 
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" required />
                  </div>
                </CardContent>
              </Card>

              {bookingType !== "place" && (
                <Card className="mb-8">
                  <CardHeader>
                    <CardTitle>Payment Method</CardTitle>
                    <CardDescription>Choose how you want to pay</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <RadioGroup 
                      value={paymentMethod} 
                      onValueChange={setPaymentMethod}
                      className="space-y-4"
                    >
                      <div className="flex items-center space-x-3 border rounded-lg p-4">
                        <RadioGroupItem value="credit-card" id="credit-card" />
                        <Label htmlFor="credit-card" className="flex items-center space-x-2 cursor-pointer">
                          <CreditCard className="h-4 w-4" />
                          <span>Credit / Debit Card</span>
                        </Label>
                      </div>
                      
                      <div className="flex items-center space-x-3 border rounded-lg p-4">
                        <RadioGroupItem value="paypal" id="paypal" disabled />
                        <Label htmlFor="paypal" className="flex items-center space-x-2 cursor-pointer text-muted-foreground">
                          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M19.554 9.488c.121.563.106 1.246-.04 2.051-.582 2.978-2.477 4.466-5.683 4.466h-.442c-.36 0-.702.283-.763.64l-.585 3.686a.938.938 0 01-.925.798H7.933c-.445 0-.685-.34-.594-.774l.116-.657.225-1.428.013-.066c.06-.357.402-.64.763-.64h1.283c2.056 0 3.662-.099 5.171-.763 2.4-1.059 3.825-3.438 4.428-6.916-.857-.491-1.774-.734-2.838-.734-2.058 0-3.618 1.068-4.828 3.21-1.21 2.14-1.513 4.673-.879 5.698.27 1.697-.035 1.953-.79 2.16-1.902.519-3.417-1.214-2.688-3.87.27-.988.175-1.98-.328-2.884l-.125-.222c-.212-.341-.633-.55-1.023-.454l-2.89.716a.93.93 0 00-.69 1.118l.063.175 2.396 6.836c.145.423.566.704 1.019.704h2.999c.36 0 .702-.28.763-.64l.36-2.27.239-1.517c.06-.359.402-.639.763-.639h.442c3.204 0 5.101-1.488 5.681-4.466.183-.929.207-1.686.108-2.319.239-.213.452-.447.636-.697.417-.571.7-1.272.82-2.15.122-.88-.093-1.564-.41-2.031"></path>
                            <path d="M8.364 7.819c.062-.31.401-.622.759-.622h4.878c.578 0 1.124.047 1.617.126.166.024.326.053.482.084a6.21 6.21 0 01.507.116c.134.036.262.073.388.117.4.131.769.3 1.09.51.32-.954.297-1.596-.076-2.236-.4-.684-1.085-1.105-1.804-1.105h-5.677c-.446 0-.702.34-.763.696l-.933 5.192-.047.252a.730.73 0 00.759.845h1.08l.345-1.974z"></path>
                          </svg>
                          <span>PayPal (Coming soon)</span>
                        </Label>
                      </div>
                    </RadioGroup>

                    {paymentMethod === "credit-card" && (
                      <div className="mt-6 space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="card-number">Card Number</Label>
                          <Input 
                            id="card-number" 
                            placeholder="1234 5678 9012 3456" 
                            required 
                          />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="expiry">Expiry Date</Label>
                            <Input id="expiry" placeholder="MM/YY" required />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="cvv">CVV</Label>
                            <Input id="cvv" placeholder="123" required />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="name-on-card">Name on Card</Label>
                          <Input 
                            id="name-on-card" 
                            defaultValue={user?.user_metadata?.full_name || ''} 
                            required 
                          />
                        </div>
                      </div>
                    )}
                  </CardContent>
                  <CardFooter>
                    <PaymentButton 
                      amount={price}
                      bookingDetails={{
                        type: bookingType,
                        description: getTitle(),
                        item: item
                      }}
                      onSuccess={() => {
                        toast({
                          title: "Redirected to payment",
                          description: "Complete your payment in the new tab",
                        });
                      }}
                    />
                  </CardFooter>
                </Card>
              )}
              
              {bookingType === "place" && (
                <Card className="mb-8">
                  <CardHeader>
                    <CardTitle>Confirm Itinerary</CardTitle>
                    <CardDescription>Add this place to your travel plans</CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading ? (
                        <>
                          <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                          Processing...
                        </>
                      ) : "Add to Itinerary"}
                    </Button>
                  </CardFooter>
                </Card>
              )}
            </form>
          </div>
          
          {/* Booking Summary */}
          <div>
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle>Booking Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 rounded-full bg-travel-light flex items-center justify-center">
                      {itemIcon}
                    </div>
                    <div>
                      <h4 className="font-medium">{getTitle()}</h4>
                      {bookingType === "flight" && (
                        <p className="text-sm text-muted-foreground">{(item as any).airline}</p>
                      )}
                      {bookingType === "train" && (
                        <p className="text-sm text-muted-foreground">{(item as any).company}</p>
                      )}
                      {bookingType === "bus" && (
                        <p className="text-sm text-muted-foreground">{(item as any).company}</p>
                      )}
                      {bookingType === "car" && (
                        <p className="text-sm text-muted-foreground">{(item as any).company}</p>
                      )}
                      {bookingType === "place" && (
                        <p className="text-sm text-muted-foreground">{(item as any).location}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 rounded-full bg-travel-light flex items-center justify-center">
                      <Calendar className="h-5 w-5 text-travel-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">Tomorrow</h4>
                      {(bookingType === "flight" || bookingType === "train" || bookingType === "bus") && (
                        <p className="text-sm text-muted-foreground">
                          {(item as any).departureTime} - {(item as any).arrivalTime}
                        </p>
                      )}
                      {bookingType === "car" && (
                        <p className="text-sm text-muted-foreground">
                          3-day rental
                        </p>
                      )}
                    </div>
                  </div>
                  
                  {bookingType !== "place" && (
                    <>
                      <Separator />
                      
                      <div className="flex justify-between items-center">
                        <span>Base fare</span>
                        <span>${baseFare.toFixed(2)}</span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span>Taxes & fees</span>
                        <span>${taxFees.toFixed(2)}</span>
                      </div>
                      
                      <Separator />
                      
                      <div className="flex justify-between items-center font-medium text-lg">
                        <span>Total</span>
                        <span>${price.toFixed(2)}</span>
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
