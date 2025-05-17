
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Plane, Train, Bus, Car } from "lucide-react";
import { travelPrompts } from "@/lib/gemini";

interface QuickPromptsProps {
  onPromptSelect: (prompt: string) => void;
}

export const QuickPrompts = ({ onPromptSelect }: QuickPromptsProps) => {
  const quickPrompts = [
    {
      category: "flights",
      icon: Plane,
      prompts: [
        "What's the best time to book international flights?",
        "How to find the cheapest flights to Europe?",
        "What should I do if my flight gets canceled?",
      ],
    },
    {
      category: "trains",
      icon: Train,
      prompts: [
        "Compare high-speed trains vs flights in Europe",
        "What's the most scenic train route in Switzerland?",
        "Tips for overnight train travel",
      ],
    },
    {
      category: "buses",
      icon: Bus,
      prompts: [
        "Are sleeper buses comfortable for long journeys?",
        "Best bus companies for traveling in Southeast Asia",
        "How to prepare for a long bus journey",
      ],
    },
    {
      category: "cars",
      icon: Car,
      prompts: [
        "Should I get full coverage insurance for a rental car?",
        "Tips for an international road trip",
        "How to find the best car rental deals",
      ],
    },
  ];

  return (
    <>
      <Tabs defaultValue="flights">
        <TabsList className="grid grid-cols-4 mb-4">
          {quickPrompts.map((section) => (
            <TabsTrigger key={section.category} value={section.category} className="px-2">
              <section.icon className="h-4 w-4" />
              <span className="sr-only">{section.category}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {quickPrompts.map((section) => (
          <TabsContent key={section.category} value={section.category}>
            <div className="space-y-2">
              {section.prompts.map((prompt, idx) => (
                <Button
                  key={idx}
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => onPromptSelect(prompt)}
                >
                  {prompt}
                </Button>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      <Separator className="my-4" />

      <div>
        <h3 className="font-semibold mb-3">Destination Research</h3>
        <div className="grid grid-cols-2 gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPromptSelect(travelPrompts.destinationInfo("Barcelona"))}
          >
            About Barcelona
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPromptSelect(travelPrompts.destinationInfo("Tokyo"))}
          >
            About Tokyo
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPromptSelect(travelPrompts.itinerarySuggestion("Paris", 3))}
          >
            3 Days in Paris
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPromptSelect(travelPrompts.budgetEstimate("Thailand", 7, "budget"))}
          >
            Thailand Budget
          </Button>
        </div>
      </div>
    </>
  );
};
