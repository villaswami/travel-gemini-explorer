
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { DatePicker } from "@/components/ui/date-picker";
import { Car, Calendar, MapPin, Search, Plane, Train, Bus } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import PopularDestinations from "@/components/home/PopularDestinations";
import TravelTips from "@/components/home/TravelTips";
import WhyChooseUs from "@/components/home/WhyChooseUs";

export default function Index() {
  const [selectedTab, setSelectedTab] = useState("flights");
  const [departureDate, setDepartureDate] = useState<Date | undefined>(
    new Date(Date.now() + 86400000) // Tomorrow
  );
  const [returnDate, setReturnDate] = useState<Date | undefined>(
    new Date(Date.now() + 7 * 86400000) // 1 week from now
  );

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative bg-travel-primary py-20 px-4">
        <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1935&q=80')` }}></div>
        <div className="container mx-auto relative z-10">
          <div className="text-center text-white mb-8">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Travel Made Easy</h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto opacity-90">
              Book your transportation and get AI-powered travel assistance all in one place
            </p>
          </div>
          
          {/* Search Card */}
          <div className="max-w-5xl mx-auto">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-1 sm:p-6">
                <Tabs defaultValue="flights" value={selectedTab} onValueChange={setSelectedTab}>
                  <TabsList className="grid grid-cols-4 mb-6">
                    <TabsTrigger value="flights" className="flex items-center space-x-2">
                      <Plane className="h-4 w-4" />
                      <span className="hidden sm:inline">Flights</span>
                    </TabsTrigger>
                    <TabsTrigger value="trains" className="flex items-center space-x-2">
                      <Train className="h-4 w-4" />
                      <span className="hidden sm:inline">Trains</span>
                    </TabsTrigger>
                    <TabsTrigger value="buses" className="flex items-center space-x-2">
                      <Bus className="h-4 w-4" />
                      <span className="hidden sm:inline">Buses</span>
                    </TabsTrigger>
                    <TabsTrigger value="cars" className="flex items-center space-x-2">
                      <Car className="h-4 w-4" />
                      <span className="hidden sm:inline">Car Rental</span>
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="flights" className="m-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-10 gap-4">
                      <div className="lg:col-span-3 space-y-2">
                        <label className="text-sm font-medium">From</label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input 
                            placeholder="Departure city" 
                            className="pl-9"
                          />
                        </div>
                      </div>
                      
                      <div className="lg:col-span-3 space-y-2">
                        <label className="text-sm font-medium">To</label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input 
                            placeholder="Destination city" 
                            className="pl-9"
                          />
                        </div>
                      </div>
                      
                      <div className="lg:col-span-2 space-y-2">
                        <label className="text-sm font-medium">Departure</label>
                        <div className="relative">
                          <DatePicker
                            date={departureDate}
                            setDate={setDepartureDate}
                            className="w-full"
                          />
                        </div>
                      </div>
                      
                      <div className="lg:col-span-2 space-y-2">
                        <label className="text-sm font-medium">Return</label>
                        <DatePicker
                          date={returnDate}
                          setDate={setReturnDate}
                          className="w-full"
                        />
                      </div>
                      
                      <Button className="mt-auto lg:col-span-10" size="lg">
                        <Search className="mr-2 h-4 w-4" /> Search Flights
                      </Button>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="trains" className="m-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-10 gap-4">
                      <div className="lg:col-span-3 space-y-2">
                        <label className="text-sm font-medium">From</label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input 
                            placeholder="Departure station" 
                            className="pl-9"
                          />
                        </div>
                      </div>
                      
                      <div className="lg:col-span-3 space-y-2">
                        <label className="text-sm font-medium">To</label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input 
                            placeholder="Destination station" 
                            className="pl-9"
                          />
                        </div>
                      </div>
                      
                      <div className="lg:col-span-2 space-y-2">
                        <label className="text-sm font-medium">Departure</label>
                        <div className="relative">
                          <DatePicker
                            date={departureDate}
                            setDate={setDepartureDate}
                            className="w-full"
                          />
                        </div>
                      </div>
                      
                      <div className="lg:col-span-2 space-y-2">
                        <label className="text-sm font-medium">Return (Optional)</label>
                        <DatePicker
                          date={returnDate}
                          setDate={setReturnDate}
                          className="w-full"
                        />
                      </div>
                      
                      <Button className="mt-auto lg:col-span-10" size="lg">
                        <Search className="mr-2 h-4 w-4" /> Search Trains
                      </Button>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="buses" className="m-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-10 gap-4">
                      <div className="lg:col-span-3 space-y-2">
                        <label className="text-sm font-medium">From</label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input 
                            placeholder="Departure city" 
                            className="pl-9"
                          />
                        </div>
                      </div>
                      
                      <div className="lg:col-span-3 space-y-2">
                        <label className="text-sm font-medium">To</label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input 
                            placeholder="Destination city" 
                            className="pl-9"
                          />
                        </div>
                      </div>
                      
                      <div className="lg:col-span-2 space-y-2">
                        <label className="text-sm font-medium">Departure</label>
                        <div className="relative">
                          <DatePicker
                            date={departureDate}
                            setDate={setDepartureDate}
                            className="w-full"
                          />
                        </div>
                      </div>
                      
                      <div className="lg:col-span-2 space-y-2">
                        <label className="text-sm font-medium">Return (Optional)</label>
                        <DatePicker
                          date={returnDate}
                          setDate={setReturnDate}
                          className="w-full"
                        />
                      </div>
                      
                      <Button className="mt-auto lg:col-span-10" size="lg">
                        <Search className="mr-2 h-4 w-4" /> Search Buses
                      </Button>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="cars" className="m-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-10 gap-4">
                      <div className="lg:col-span-3 space-y-2">
                        <label className="text-sm font-medium">Pickup Location</label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input 
                            placeholder="City, airport, or address" 
                            className="pl-9"
                          />
                        </div>
                      </div>
                      
                      <div className="lg:col-span-3 space-y-2">
                        <label className="text-sm font-medium">Drop-off Location</label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input 
                            placeholder="Same as pickup" 
                            className="pl-9"
                          />
                        </div>
                      </div>
                      
                      <div className="lg:col-span-2 space-y-2">
                        <label className="text-sm font-medium">Pickup Date</label>
                        <div className="relative">
                          <DatePicker
                            date={departureDate}
                            setDate={setDepartureDate}
                            className="w-full"
                          />
                        </div>
                      </div>
                      
                      <div className="lg:col-span-2 space-y-2">
                        <label className="text-sm font-medium">Return Date</label>
                        <DatePicker
                          date={returnDate}
                          setDate={setReturnDate}
                          className="w-full"
                        />
                      </div>
                      
                      <Button className="mt-auto lg:col-span-10" size="lg">
                        <Search className="mr-2 h-4 w-4" /> Search Cars
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* AI Assistant Promo Section */}
      <section className="py-16 bg-travel-light">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="order-2 md:order-1">
              <h2 className="text-3xl font-bold mb-4">AI Travel Assistant</h2>
              <p className="text-lg mb-6">
                Get personalized travel recommendations, itineraries, and answers to all your travel questions with our Gemini AI-powered assistant.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-travel-primary mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Personalized itinerary suggestions</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-travel-primary mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Local food and attraction recommendations</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-travel-primary mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Transportation advice and comparisons</span>
                </li>
              </ul>
              <Button asChild size="lg">
                <Link to="/assistant">
                  Try the AI Assistant
                </Link>
              </Button>
            </div>
            <div className="order-1 md:order-2">
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                <img
                  src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                  alt="AI Travel Assistant"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-black/10 to-transparent"></div>
                <div className="absolute bottom-4 left-4 bg-white/90 dark:bg-gray-900/90 p-3 rounded-lg max-w-[80%] shadow-lg">
                  <p className="text-sm font-medium">
                    "What are the best transportation options from Paris to Rome?"
                  </p>
                  <div className="mt-2 text-xs text-muted-foreground italic">
                    Ask our AI assistant for personalized advice
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <PopularDestinations />

      {/* Why Choose Us */}
      <WhyChooseUs />

      {/* Travel Tips */}
      <TravelTips />

      {/* CTA Section */}
      <section className="py-16 bg-travel-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to start your journey?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Book your transportation and get AI-powered travel assistance all in one place.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild variant="secondary" size="lg">
              <Link to="/flights">Book Transportation</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white hover:bg-white hover:text-travel-primary">
              <Link to="/assistant">Try AI Assistant</Link>
            </Button>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
