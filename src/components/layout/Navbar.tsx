import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Plane, Train, Bus, Car, MapPin, MessageSquare, User, LogOut, Zap } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const transportItems = [
    { name: "Flights", href: "/flights", icon: Plane },
    { name: "Trains", href: "/trains", icon: Train },
    { name: "Buses", href: "/buses", icon: Bus },
    { name: "Cars", href: "/cars", icon: Car },
    { name: "Places", href: "/places", icon: MapPin },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full glass-effect border-b cyber-border">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 group">
          <div className="relative">
            <Zap className="h-8 w-8 text-primary animate-pulse-glow" />
            <div className="absolute inset-0 h-8 w-8 bg-primary blur-md opacity-50 animate-pulse"></div>
          </div>
          <span className="font-bold text-xl gradient-text group-hover:text-glow transition-all duration-300">
            TravelGo
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="cyber-border bg-card/50 hover:bg-card/80 transition-all duration-300">
                  Transport
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid w-[400px] gap-2 p-4 glass-effect">
                    {transportItems.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className="flex items-center space-x-3 rounded-lg p-3 hover:bg-primary/10 transition-all duration-300 group cyber-border"
                      >
                        <item.icon className="h-5 w-5 text-primary group-hover:animate-pulse" />
                        <span className="font-medium group-hover:text-primary transition-colors">
                          {item.name}
                        </span>
                      </Link>
                    ))}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <Link
            to="/assistant"
            className="flex items-center space-x-2 px-4 py-2 rounded-lg cyber-border bg-secondary/10 hover:bg-secondary/20 transition-all duration-300 group"
          >
            <MessageSquare className="h-4 w-4 text-secondary group-hover:animate-pulse" />
            <span className="text-secondary group-hover:text-glow">AI Assistant</span>
          </Link>

          {user && (
            <Link
              to="/bookings"
              className="px-4 py-2 rounded-lg cyber-border bg-accent/10 hover:bg-accent/20 transition-all duration-300 text-accent hover:text-glow"
            >
              My Bookings
            </Link>
          )}
        </div>

        {/* User Menu */}
        <div className="flex items-center space-x-4">
          {user ? (
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-2 px-3 py-2 rounded-lg cyber-border bg-primary/10">
                <User className="h-4 w-4 text-primary" />
                <span className="text-sm text-primary hidden sm:inline">
                  {user.user_metadata?.full_name || user.email}
                </span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleSignOut}
                className="cyber-border hover:bg-destructive/20 hover:text-destructive transition-all duration-300"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:ml-2 sm:inline">Sign Out</span>
              </Button>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Button asChild variant="outline" className="cyber-border hover:glow-effect">
                <Link to="/signin">Sign In</Link>
              </Button>
              <Button asChild className="bg-gradient-primary hover:shadow-glow transition-all duration-300">
                <Link to="/signup">Sign Up</Link>
              </Button>
            </div>
          )}

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden cyber-border">
                <Menu className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="glass-effect cyber-border">
              <div className="flex flex-col space-y-4 mt-8">
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold gradient-text">Transport</h3>
                  {transportItems.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center space-x-3 rounded-lg p-3 hover:bg-primary/10 transition-all duration-300 group cyber-border"
                    >
                      <item.icon className="h-5 w-5 text-primary group-hover:animate-pulse" />
                      <span className="group-hover:text-primary transition-colors">
                        {item.name}
                      </span>
                    </Link>
                  ))}
                </div>

                <Link
                  to="/assistant"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center space-x-3 rounded-lg p-3 cyber-border bg-secondary/10 hover:bg-secondary/20 transition-all duration-300"
                >
                  <MessageSquare className="h-5 w-5 text-secondary" />
                  <span className="text-secondary">AI Assistant</span>
                </Link>

                {user && (
                  <Link
                    to="/bookings"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center space-x-3 rounded-lg p-3 cyber-border bg-accent/10 hover:bg-accent/20 transition-all duration-300"
                  >
                    <User className="h-5 w-5 text-accent" />
                    <span className="text-accent">My Bookings</span>
                  </Link>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}