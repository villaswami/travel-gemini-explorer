
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Search, Star } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import { placesData } from "@/data/transportData";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { createBooking } from "@/lib/database";

export default function Places() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchPerformed, setSearchPerformed] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const filteredPlaces = placesData.filter(
    place => 
      place.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      place.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      place.category.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchPerformed(true);
    
    toast({
      title: "Search complete",
      description: `Found ${filteredPlaces.length} places matching "${searchQuery}"`,
    });
  };
  
  const handleBookPlace = async (placeId: string) => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to book this place",
        variant: "destructive",
      });
      navigate("/signin");
      return;
    }
    
    const place = placesData.find(p => p.id === placeId);
    if (!place) return;
    
    try {
      // Create a booking record
      await createBooking({
        user_id: user.id,
        booking_type: 'place',
        item_id: placeId,
        booking_date: new Date().toISOString(),
        total_price: 0, // Places don't have direct prices
        status: 'confirmed',
        details: {
          placeName: place.name,
          location: place.location,
          category: place.category,
          imageUrl: place.imageUrl
        }
      });
      
      toast({
        title: "Added to your itinerary",
        description: `${place.name} has been added to your bookings`,
      });
      
      navigate(`/checkout?type=place&id=${placeId}`);
    } catch (error) {
      console.error("Error booking place:", error);
      toast({
        title: "Booking failed",
        description: "There was an error adding this place to your itinerary",
        variant: "destructive",
      });
    }
  };
  
  return (
    <MainLayout>
      <div className="bg-travel-primary relative py-12 px-4">
        <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80')` }}></div>
        <div className="container mx-auto relative z-10">
          <h1 className="text-3xl font-bold text-white mb-2">Places to Visit</h1>
          <p className="text-white/80 text-lg">Discover amazing destinations around the world</p>
        </div>
      </div>
      
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-2xl mx-auto mb-8">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-grow">
              <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search destinations, cities, or categories..." 
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button type="submit">
              <Search className="mr-2 h-4 w-4" /> Search
            </Button>
          </form>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlaces.map((place) => (
            <Card key={place.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 overflow-hidden">
                <img 
                  src={place.imageUrl} 
                  alt={place.name} 
                  className="w-full h-full object-cover transition-transform hover:scale-105"
                />
              </div>
              <CardContent className="pt-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-xl">{place.name}</h3>
                  <div className="flex items-center text-amber-500">
                    <Star className="h-4 w-4 fill-current" />
                    <span className="ml-1 text-sm">{place.rating}</span>
                  </div>
                </div>
                
                <div className="flex items-center text-sm text-muted-foreground mb-4">
                  <MapPin className="h-3.5 w-3.5 mr-1" />
                  <span>{place.location}</span>
                </div>
                
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {place.description}
                </p>
                
                <div className="flex justify-between items-center">
                  <div>
                    <span className="inline-block bg-travel-light text-travel-primary text-xs px-2 py-1 rounded-full mr-2">
                      {place.category}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {place.priceRange}
                    </span>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleBookPlace(place.id)}
                  >
                    Add to Itinerary
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {searchPerformed && filteredPlaces.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium mb-2">No places found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search criteria
            </p>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
