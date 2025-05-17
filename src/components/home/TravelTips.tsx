
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";

const tips = {
  flights: [
    {
      title: "Book mid-week flights",
      description:
        "Tuesdays and Wednesdays typically have cheaper flight prices compared to weekends.",
    },
    {
      title: "Set price alerts",
      description:
        "Use price tracking tools to get notifications when flight prices drop.",
    },
    {
      title: "Pack essentials in carry-on",
      description:
        "Keep medications, documents, and a change of clothes in your carry-on bag.",
    },
  ],
  trains: [
    {
      title: "Book in advance for discounts",
      description:
        "Many train services offer early booking discounts up to 3 months ahead.",
    },
    {
      title: "Check seat assignments",
      description:
        "Choose seats based on your preference for views, table access, or quieter cars.",
    },
    {
      title: "Download entertainment",
      description:
        "Not all trains have reliable WiFi, so download shows or books beforehand.",
    },
  ],
  buses: [
    {
      title: "Arrive early",
      description:
        "Bus services often operate on a first-come, first-served basis for seating.",
    },
    {
      title: "Pack comfort items",
      description:
        "Bring a neck pillow, blanket, and noise-canceling headphones for longer journeys.",
    },
    {
      title: "Check luggage policies",
      description:
        "Bus companies often have strict policies on luggage size and weight.",
    },
  ],
  cars: [
    {
      title: "Inspect before driving off",
      description:
        "Document any existing damage before leaving the rental location.",
    },
    {
      title: "Understand insurance options",
      description:
        "Check if your credit card or personal insurance covers rental cars.",
    },
    {
      title: "Fill the tank before returning",
      description:
        "Avoid excessive fuel charges by returning the car with a full tank.",
    },
  ],
};

export default function TravelTips() {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4">Travel Tips</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Make your journey smoother with these helpful tips for different
            transportation modes
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="flights" className="w-full">
            <TabsList className="grid grid-cols-4">
              <TabsTrigger value="flights">Flights</TabsTrigger>
              <TabsTrigger value="trains">Trains</TabsTrigger>
              <TabsTrigger value="buses">Buses</TabsTrigger>
              <TabsTrigger value="cars">Car Rental</TabsTrigger>
            </TabsList>

            {Object.entries(tips).map(([category, categoryTips]) => (
              <TabsContent key={category} value={category} className="mt-6">
                <Card>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      {categoryTips.map((tip, index) => (
                        <div key={index}>
                          <h3 className="text-lg font-medium mb-2">
                            {tip.title}
                          </h3>
                          <p className="text-muted-foreground">
                            {tip.description}
                          </p>
                          {index < categoryTips.length - 1 && (
                            <Separator className="my-4" />
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                <div className="text-center mt-4">
                  <Link
                    to="/assistant"
                    className="text-sm text-primary hover:underline"
                  >
                    Ask our AI assistant for more {category} tips
                  </Link>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </section>
  );
}
