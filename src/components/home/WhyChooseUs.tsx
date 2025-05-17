
import { Card, CardContent } from "@/components/ui/card";
import { Search, CreditCard, Clock, MessageSquare } from "lucide-react";

const features = [
  {
    icon: Search,
    title: "Compare All Options",
    description:
      "Find and compare flights, trains, buses, and car rentals all in one place to find the best option for your journey.",
  },
  {
    icon: CreditCard,
    title: "Secure Payments",
    description:
      "Book with confidence using our secure payment system that protects your sensitive information.",
  },
  {
    icon: Clock,
    title: "Fast Booking",
    description:
      "Our streamlined booking process lets you search and book transportation in just a few minutes.",
  },
  {
    icon: MessageSquare,
    title: "AI Travel Assistant",
    description:
      "Get personalized travel advice, recommendations, and answers to all your travel questions.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4">Why Choose Us</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We make travel transportation booking simple, efficient, and
            intelligent
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="border border-border">
              <CardContent className="pt-6">
                <div className="h-12 w-12 rounded-full bg-travel-light dark:bg-travel-primary/20 flex items-center justify-center mb-4 text-travel-primary">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
