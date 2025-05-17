
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DatePicker } from "@/components/ui/date-picker";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { MapPin, Calendar, Search, Users, Bus } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import { useLocation, useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { busData } from "@/data/transportData";

export default function Buses() {
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
  const [to, setTo] = useState(destinationParam || "Boston");
  const [departureDate, setDepartureDate] = useState<Date | undefined>(tomorrow);
  const [returnDate, setReturnDate] = useState<Date | undefined>(nextWeek);
  const [passengers, setPassengers] = useState("1");
  const [directBuses, setDirectBuses] = useState(false);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [selectedBusId, setSelectedBusId] = useState<string | null>(null);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchPerformed(true);
    
    toast({
      title: "Search complete",
      description: `Found ${busData.length} buses from ${from} to ${to}`,
    });
  };
  
  const handleBookBus = (busId: string) => {
    setSelectedBusId(busId);
    navigate(`/checkout?type=bus&id=${busId}`);
  };
  
  const filteredBuses = directBuses 
    ? busData.filter(bus => bus.stops === 0)
    : busData;
  
  return (
    <MainLayout>
      <div className="bg-travel-primary relative py-12 px-4">
        <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8YnVzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=1169&q=80')` }}></div>
        <div className="container mx-auto relative z-10">
          <h1 className="text-3xl font-bold text-white mb-2">Bus Search</h1>
          <p className="text-white/80 text-lg">Find and book affordable bus tickets for your journey</p>
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
                        placeholder="City or Terminal" 
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
                        placeholder="City or Terminal" 
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
                  
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="direct-buses"
                      checked={directBuses}
                      onCheckedChange={setDirectBuses}
                    />
                    <Label htmlFor="direct-buses">Direct buses only (no stops)</Label>
                  </div>
                  
                  <Button type="submit" className="w-full">
                    <Search className="mr-2 h-4 w-4" /> Search Buses
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
                  <Bus className="h-8 w-8 text-travel-primary" />
                </div>
                <h3 className="text-xl font-medium mb-2">Search for Buses</h3>
                <p className="text-muted-foreground">
                  Enter your departure and destination cities to find available buses
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">
                    {filteredBuses.length} buses found
                  </h2>
                  <span className="text-sm text-muted-foreground">
                    {from} to {to} · {departureDate && new Date(departureDate).toLocaleDateString()}
                  </span>
                </div>
                
                <div className="space-y-4">
                  {filteredBuses.map((bus) => (
                    <Card
                      key={bus.id}
                      className={cn(
                        "hover:border-primary transition-colors cursor-pointer",
                        selectedBusId === bus.id && "border-primary"
                      )}
                      onClick={() => setSelectedBusId(bus.id)}
                    >
                      <CardContent className="p-4 md:p-6">
                        <div className="flex flex-col md:flex-row md:items-center justify-between">
                          <div className="flex items-center mb-4 md:mb-0">
                            <div className="bg-travel-light h-12 w-12 rounded-full flex items-center justify-center text-travel-primary font-bold text-sm mr-4">
                              {bus.logo}
                            </div>
                            <div>
                              <p className="font-medium">{bus.company}</p>
                              <p className="text-sm text-muted-foreground">
                                {bus.stops === 0 ? "Non-stop" : `${bus.stops} ${bus.stops === 1 ? "stop" : "stops"}`}
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between md:justify-center flex-grow">
                            <div className="text-center">
                              <p className="text-lg font-semibold">{bus.departureTime}</p>
                              <p className="text-sm text-muted-foreground">{bus.departureStation}</p>
                            </div>
                            
                            <div className="flex flex-col items-center px-4">
                              <div className="text-xs text-muted-foreground">{bus.duration}</div>
                              <div className="relative w-24 md:w-32">
                                <Separator className="my-2" />
                                <div className="absolute left-0 top-1.5 w-2 h-2 rounded-full bg-travel-primary"></div>
                                <div className="absolute right-0 top-1.5 w-2 h-2 rounded-full bg-travel-primary"></div>
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {bus.stops > 0 ? `${bus.stops} ${bus.stops === 1 ? "stop" : "stops"}` : "Direct"}
                              </div>
                            </div>
                            
                            <div className="text-center">
                              <p className="text-lg font-semibold">{bus.arrivalTime}</p>
                              <p className="text-sm text-muted-foreground">{bus.arrivalStation}</p>
                            </div>
                          </div>
                          
                          <div className="flex flex-col items-end mt-4 md:mt-0">
                            <p className="text-2xl font-bold">${bus.price}</p>
                            <p className="text-sm text-muted-foreground mb-2">per person</p>
                            <Button onClick={() => handleBookBus(bus.id)}>Select</Button>
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
