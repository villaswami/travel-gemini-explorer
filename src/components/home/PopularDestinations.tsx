
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const destinations = [
  {
    id: 1,
    name: "Paris",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1173&q=80",
    description: "Experience the city of romance with iconic landmarks and culinary delights.",
  },
  {
    id: 2,
    name: "Tokyo",
    image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    description: "Discover the perfect blend of tradition and innovation in Japan's vibrant capital.",
  },
  {
    id: 3,
    name: "New York",
    image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    description: "Explore the Big Apple with its iconic skyline, Broadway shows, and diverse neighborhoods.",
  },
  {
    id: 4,
    name: "Rome",
    image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1096&q=80",
    description: "Walk through history in the Eternal City with ancient ruins and vibrant street life.",
  }
];

export default function PopularDestinations() {
  return (
    <section className="py-16 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4">Popular Destinations</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore these trending destinations with our transportation services
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {destinations.map((destination) => (
            <Card key={destination.id} className="overflow-hidden border-0 shadow-md travel-card">
              <div className="relative h-48 overflow-hidden">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70"></div>
                <h3 className="absolute bottom-3 left-3 text-white text-xl font-bold">{destination.name}</h3>
              </div>
              <CardContent className="p-4">
                <p className="mb-4 text-sm text-muted-foreground">
                  {destination.description}
                </p>
                <div className="flex justify-between items-center">
                  <Button asChild variant="outline" size="sm">
                    <Link to={`/flights?destination=${destination.name}`}>
                      Book Flights
                    </Link>
                  </Button>
                  <Link 
                    to={`/assistant?prompt=Tell me about ${destination.name}`} 
                    className="text-sm text-primary hover:underline"
                  >
                    Learn More
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-10">
          <Button asChild variant="outline" size="lg">
            <Link to="/destinations">View All Destinations</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
