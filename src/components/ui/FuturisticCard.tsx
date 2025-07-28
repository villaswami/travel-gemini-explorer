import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { Plane, Train, Bus, Car, MapPin, Clock, Users, Star, Zap, Sparkles } from "lucide-react";

interface FuturisticCardProps {
  title: string;
  description: string;
  price: number;
  duration?: string;
  capacity?: number;
  rating?: number;
  icon: React.ReactNode;
  details: any;
  type: string;
  id: string;
}

export const FuturisticCard: React.FC<FuturisticCardProps> = ({
  title,
  description,
  price,
  duration,
  capacity,
  rating,
  icon,
  details,
  type,
  id,
}) => {
  const navigate = useNavigate();

  const handleBookNow = () => {
    navigate(`/checkout?type=${type}&id=${id}`);
  };

  return (
    <Card className="group relative overflow-hidden cyber-border hover:glow-effect transition-all duration-500 bg-gradient-dark animate-slide-up">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
      
      {/* Glow effect on hover */}
      <div className="absolute -inset-0.5 bg-gradient-primary rounded-lg blur opacity-0 group-hover:opacity-75 transition duration-500"></div>
      
      <div className="relative">
        <CardHeader className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-primary/20 text-primary group-hover:animate-pulse">
                {icon}
              </div>
              <div>
                <CardTitle className="text-lg font-bold group-hover:gradient-text transition-all duration-300">
                  {title}
                </CardTitle>
                <CardDescription className="text-muted-foreground group-hover:text-foreground transition-colors">
                  {description}
                </CardDescription>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-primary animate-pulse-glow">
                ${price}
              </div>
              {rating && (
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-accent fill-current" />
                  <span className="text-sm text-accent">{rating}</span>
                </div>
              )}
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {duration && (
              <Badge variant="outline" className="cyber-border bg-secondary/10 text-secondary">
                <Clock className="h-3 w-3 mr-1" />
                {duration}
              </Badge>
            )}
            {capacity && (
              <Badge variant="outline" className="cyber-border bg-accent/10 text-accent">
                <Users className="h-3 w-3 mr-1" />
                {capacity} seats
              </Badge>
            )}
            <Badge variant="outline" className="cyber-border bg-primary/10 text-primary animate-pulse">
              <Sparkles className="h-3 w-3 mr-1" />
              Premium
            </Badge>
          </div>

          {/* Type-specific details */}
          {type === 'flight' && details && (
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="space-y-1">
                <p className="text-muted-foreground">Departure</p>
                <p className="font-medium text-primary">{details.departureTime}</p>
                <p className="text-xs text-muted-foreground">{details.departure}</p>
              </div>
              <div className="space-y-1">
                <p className="text-muted-foreground">Arrival</p>
                <p className="font-medium text-primary">{details.arrivalTime}</p>
                <p className="text-xs text-muted-foreground">{details.destination}</p>
              </div>
            </div>
          )}

          {type === 'place' && details && (
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">{details.description}</p>
              <div className="flex flex-wrap gap-1">
                {details.highlights?.slice(0, 3).map((highlight: string, index: number) => (
                  <Badge key={index} variant="secondary" className="text-xs bg-accent/20 text-accent">
                    {highlight}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <Button 
            onClick={handleBookNow}
            className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300 font-semibold group-hover:animate-pulse-glow"
            size="lg"
          >
            <Zap className="mr-2 h-4 w-4" />
            {type === 'place' ? 'Add to Itinerary' : 'Book Now'}
          </Button>
        </CardContent>
      </div>
    </Card>
  );
};