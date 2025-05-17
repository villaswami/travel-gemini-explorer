
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DatePicker } from "@/components/ui/date-picker";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Calendar, Search, Users, Car } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import { useLocation, useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { carData } from "@/data/transportData";

export default function Cars() {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const queryParams = new URLSearchParams(location.search);
  const locationParam = queryParams.get('location') || '';
  
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const inThreeDays = new Date(tomorrow);
  inThreeDays.setDate(inThreeDays.getDate() + 3);
  
  const [pickupLocation, setPickupLocation] = useState(locationParam || "New York");
  const [pickupDate, setPickupDate] = useState<Date | undefined>(tomorrow);
  const [returnDate, setReturnDate] = useState<Date | undefined>(inThreeDays);
  const [carType, setCarType] = useState("");
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [selectedCarId, setSelectedCarId] = useState<string | null>(null);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchPerformed(true);
    
    toast({
      title: "Search complete",
      description: `Found ${carData.length} cars available in ${pickupLocation}`,
    });
  };
  
  const handleBookCar = (carId: string) => {
    setSelectedCarId(carId);
    navigate(`/checkout?type=car&id=${carId}`);
  };
  
  const filteredCars = carType 
    ? carData.filter(car => car.carType.toLowerCase() === carType.toLowerCase())
    : carData;
  
  const getDays = () => {
    if (!pickupDate || !returnDate) return 1;
    const diffTime = Math.abs(returnDate.getTime() - pickupDate.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };
  
  const rentalDays = getDays();
  
  return (
    <MainLayout>
      <div className="bg-travel-primary relative py-12 px-4">
        <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cmVudGFsJTIwY2FyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=1169&q=80')` }}></div>
        <div className="container mx-auto relative z-10">
          <h1 className="text-3xl font-bold text-white mb-2">Car Rentals</h1>
          <p className="text-white/80 text-lg">Rent a car for your trip at the best prices</p>
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
                    <Label htmlFor="pickup-location">Pickup Location</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input 
                        id="pickup-location"
                        placeholder="City or Airport" 
                        className="pl-9"
                        value={pickupLocation}
                        onChange={(e) => setPickupLocation(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="pickup-date">Pickup Date</Label>
                      <DatePicker 
                        date={pickupDate} 
                        setDate={setPickupDate}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="return-date">Return Date</Label>
                      <DatePicker 
                        date={returnDate} 
                        setDate={setReturnDate}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="car-type">Car Type</Label>
                    <Select 
                      value={carType} 
                      onValueChange={setCarType}
                    >
                      <SelectTrigger id="car-type" className="w-full">
                        <SelectValue placeholder="Any Car Type" />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        <SelectItem value="any">Any Car Type</SelectItem>
                        <SelectItem value="compact">Compact</SelectItem>
                        <SelectItem value="mid-size">Mid-size</SelectItem>
                        <SelectItem value="SUV">SUV</SelectItem>
                        <SelectItem value="luxury">Luxury</SelectItem>
                        <SelectItem value="minivan">Minivan</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Button type="submit" className="w-full">
                    <Search className="mr-2 h-4 w-4" /> Search Cars
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
                  <Car className="h-8 w-8 text-travel-primary" />
                </div>
                <h3 className="text-xl font-medium mb-2">Search for Rental Cars</h3>
                <p className="text-muted-foreground">
                  Enter your pickup location and dates to find available cars
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">
                    {filteredCars.length} cars available
                  </h2>
                  <span className="text-sm text-muted-foreground">
                    {pickupLocation} · {rentalDays} day{rentalDays !== 1 ? 's' : ''}
                  </span>
                </div>
                
                <div className="space-y-4">
                  {filteredCars.map((car) => (
                    <Card
                      key={car.id}
                      className={cn(
                        "hover:border-primary transition-colors cursor-pointer",
                        selectedCarId === car.id && "border-primary"
                      )}
                      onClick={() => setSelectedCarId(car.id)}
                    >
                      <CardContent className="p-4 md:p-6">
                        <div className="flex flex-col md:flex-row md:items-center justify-between">
                          <div className="flex items-center mb-4 md:mb-0">
                            <div className="bg-travel-light h-12 w-12 rounded-full flex items-center justify-center text-travel-primary font-bold text-sm mr-4">
                              {car.logo}
                            </div>
                            <div>
                              <p className="font-medium">{car.carModel}</p>
                              <p className="text-sm text-muted-foreground">
                                {car.company}
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex flex-col md:flex-row items-start md:items-center justify-between md:justify-center flex-grow px-4">
                            <div className="space-y-1 md:text-center">
                              <div className="flex items-center text-sm">
                                <Users className="h-4 w-4 mr-1.5" />
                                <span>{car.seats} seats</span>
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {car.automatic ? "Automatic" : "Manual"}
                              </div>
                            </div>
                            
                            <Separator className="my-2 md:mx-4 md:h-8 md:w-px" orientation={window.innerWidth >= 768 ? "vertical" : "horizontal"} />
                            
                            <div className="space-y-1 md:text-center">
                              <div className="flex items-center text-sm">
                                <svg className="h-4 w-4 mr-1.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M19 7V5H5v2l7 8 7-8Z" />
                                  <path d="M5 19h14" />
                                </svg>
                                <span>{car.carType}</span>
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {car.fuelEfficiency}
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex flex-col items-end mt-4 md:mt-0">
                            <p className="text-2xl font-bold">${car.pricePerDay}</p>
                            <p className="text-sm text-muted-foreground mb-2">per day</p>
                            <Button onClick={() => handleBookCar(car.id)}>Select</Button>
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
