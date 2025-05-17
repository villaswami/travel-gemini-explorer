
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DatePicker } from "@/components/ui/date-picker";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { MapPin, Calendar, Search, Users, Plane } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import { useLocation, useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";

// Sample flight data
const sampleFlights = [
  {
    id: "f1",
    airline: "Blue Sky Airlines",
    logo: "BS",
    departureTime: "08:30",
    arrivalTime: "11:45",
    duration: "3h 15m",
    departureAirport: "JFK",
    arrivalAirport: "LAX",
    price: 299,
    direct: true,
  },
  {
    id: "f2",
    airline: "Atlantic Airways",
    logo: "AA",
    departureTime: "10:15",
    arrivalTime: "14:05",
    duration: "3h 50m",
    departureAirport: "JFK",
    arrivalAirport: "LAX",
    price: 275,
    direct: false,
  },
  {
    id: "f3",
    airline: "United Airlines",
    logo: "UA",
    departureTime: "12:30",
    arrivalTime: "15:55",
    duration: "3h 25m",
    departureAirport: "JFK",
    arrivalAirport: "LAX",
    price: 322,
    direct: true,
  },
  {
    id: "f4",
    airline: "Delta",
    logo: "DL",
    departureTime: "14:45",
    arrivalTime: "18:20",
    duration: "3h 35m",
    departureAirport: "JFK",
    arrivalAirport: "LAX",
    price: 289,
    direct: true,
  },
  {
    id: "f5",
    airline: "SkyJet",
    logo: "SJ",
    departureTime: "16:20",
    arrivalTime: "19:40",
    duration: "3h 20m",
    departureAirport: "JFK",
    arrivalAirport: "LAX",
    price: 310,
    direct: true,
  },
];

export default function Flights() {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const queryParams = new URLSearchParams(location.search);
  const destinationParam = queryParams.get('destination');
  
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const nextWeek = new Date(today);
  nextWeek.setDate(nextWeek.getDate() + 7);
  
  const [from, setFrom] = useState("New York");
  const [to, setTo] = useState(destinationParam || "Los Angeles");
  const [departureDate, setDepartureDate] = useState<Date | undefined>(tomorrow);
  const [returnDate, setReturnDate] = useState<Date | undefined>(nextWeek);
  const [passengers, setPassengers] = useState("1");
  const [cabinClass, setCabinClass] = useState("economy");
  const [directFlights, setDirectFlights] = useState(false);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [selectedFlightId, setSelectedFlightId] = useState<string | null>(null);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchPerformed(true);
    
    // Simulate search
    toast({
      title: "Search complete",
      description: `Found ${sampleFlights.length} flights from ${from} to ${to}`,
    });
  };
  
  const handleBookFlight = (flightId: string) => {
    setSelectedFlightId(flightId);
    navigate(`/checkout?type=flight&id=${flightId}`);
  };
  
  const filteredFlights = directFlights 
    ? sampleFlights.filter(flight => flight.direct)
    : sampleFlights;
  
  return (
    <MainLayout>
      <div className="bg-travel-primary relative py-12 px-4">
        <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1512289407358-7a82bdbd6148?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80')` }}></div>
        <div className="container mx-auto relative z-10">
          <h1 className="text-3xl font-bold text-white mb-2">Flight Search</h1>
          <p className="text-white/80 text-lg">Find and book the best flights for your journey</p>
        </div>
      </div>
      
      <div className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Search Form */}
          <div>
            <Card>
              <CardContent className="pt-6">
                <form onSubmit={handleSearch} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="from">From</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input 
                        id="from"
                        placeholder="City or Airport" 
                        className="pl-9"
                        value={from}
                        onChange={(e) => setFrom(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="to">To</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input 
                        id="to"
                        placeholder="City or Airport" 
                        className="pl-9"
                        value={to}
                        onChange={(e) => setTo(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="departure-date">Departure</Label>
                      <DatePicker 
                        date={departureDate} 
                        setDate={setDepartureDate}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="return-date">Return</Label>
                      <DatePicker 
                        date={returnDate} 
                        setDate={setReturnDate}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="passengers">Passengers</Label>
                      <Select 
                        value={passengers} 
                        onValueChange={setPassengers}
                      >
                        <SelectTrigger id="passengers" className="w-full">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent position="popper">
                          <SelectItem value="1">1 Passenger</SelectItem>
                          <SelectItem value="2">2 Passengers</SelectItem>
                          <SelectItem value="3">3 Passengers</SelectItem>
                          <SelectItem value="4">4 Passengers</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="cabin-class">Cabin Class</Label>
                      <Select 
                        value={cabinClass}
                        onValueChange={setCabinClass}
                      >
                        <SelectTrigger id="cabin-class" className="w-full">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent position="popper">
                          <SelectItem value="economy">Economy</SelectItem>
                          <SelectItem value="premium">Premium Economy</SelectItem>
                          <SelectItem value="business">Business</SelectItem>
                          <SelectItem value="first">First Class</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="direct-flights"
                      checked={directFlights}
                      onCheckedChange={setDirectFlights}
                    />
                    <Label htmlFor="direct-flights">Direct flights only</Label>
                  </div>
                  
                  <Button type="submit" className="w-full">
                    <Search className="mr-2 h-4 w-4" /> Search Flights
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
          
          {/* Results */}
          <div className="lg:col-span-2">
            {!searchPerformed ? (
              <div className="flex flex-col items-center justify-center h-full border border-dashed rounded-lg p-12 text-center">
                <div className="bg-travel-light w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  <Plane className="h-8 w-8 text-travel-primary" />
                </div>
                <h3 className="text-xl font-medium mb-2">Search for Flights</h3>
                <p className="text-muted-foreground">
                  Enter your departure and destination cities to find available flights
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">
                    {filteredFlights.length} flights found
                  </h2>
                  <span className="text-sm text-muted-foreground">
                    {from} to {to} · {departureDate && new Date(departureDate).toLocaleDateString()}
                  </span>
                </div>
                
                <div className="space-y-4">
                  {filteredFlights.map((flight) => (
                    <Card
                      key={flight.id}
                      className={cn(
                        "hover:border-primary transition-colors cursor-pointer",
                        selectedFlightId === flight.id && "border-primary"
                      )}
                      onClick={() => setSelectedFlightId(flight.id)}
                    >
                      <CardContent className="p-4 md:p-6">
                        <div className="flex flex-col md:flex-row md:items-center justify-between">
                          <div className="flex items-center mb-4 md:mb-0">
                            <div className="bg-travel-light h-12 w-12 rounded-full flex items-center justify-center text-travel-primary font-bold text-sm mr-4">
                              {flight.logo}
                            </div>
                            <div>
                              <p className="font-medium">{flight.airline}</p>
                              <p className="text-sm text-muted-foreground">
                                {flight.direct ? "Direct Flight" : "1 Stop"}
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between md:justify-center flex-grow">
                            <div className="text-center">
                              <p className="text-lg font-semibold">{flight.departureTime}</p>
                              <p className="text-sm text-muted-foreground">{flight.departureAirport}</p>
                            </div>
                            
                            <div className="flex flex-col items-center px-4">
                              <div className="text-xs text-muted-foreground">{flight.duration}</div>
                              <div className="relative w-24 md:w-32">
                                <Separator className="my-2" />
                                <div className="absolute left-0 top-1.5 w-2 h-2 rounded-full bg-travel-primary"></div>
                                <div className="absolute right-0 top-1.5 w-2 h-2 rounded-full bg-travel-primary"></div>
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {flight.direct ? "Non-stop" : "1 Connection"}
                              </div>
                            </div>
                            
                            <div className="text-center">
                              <p className="text-lg font-semibold">{flight.arrivalTime}</p>
                              <p className="text-sm text-muted-foreground">{flight.arrivalAirport}</p>
                            </div>
                          </div>
                          
                          <div className="flex flex-col items-end mt-4 md:mt-0">
                            <p className="text-2xl font-bold">${flight.price}</p>
                            <p className="text-sm text-muted-foreground mb-2">per person</p>
                            <Button onClick={() => handleBookFlight(flight.id)}>Select</Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
