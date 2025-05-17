
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { MessageSquare, Send, Plane, Train, Bus, Car } from "lucide-react";
import { GeminiMessage, getGeminiResponse, travelPrompts } from "@/lib/gemini";
import MainLayout from "@/components/layout/MainLayout";
import { useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export default function AIAssistant() {
  const [messages, setMessages] = useState<GeminiMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const { user } = useAuth();
  const location = useLocation();

  useEffect(() => {
    // Scroll to bottom when messages change
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    // Set welcome message
    const welcomeMessage: GeminiMessage = {
      role: "model",
      content: user 
        ? `Hello ${user.user_metadata?.full_name || "there"}! I'm your AI travel assistant. How can I help with your travel plans today?`
        : "Hello there! I'm your AI travel assistant. How can I help with your travel plans today?"
    };

    setMessages([welcomeMessage]);

    // Check if there's a query parameter for the prompt
    const queryParams = new URLSearchParams(location.search);
    const promptParam = queryParams.get('prompt');
    
    if (promptParam) {
      handleSendMessage(promptParam);
    }
  }, [location.search, user]);

  const handleSendMessage = async (messageText: string = input) => {
    if (!messageText.trim()) return;

    const userMessage: GeminiMessage = {
      role: "user",
      content: messageText,
    };

    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await getGeminiResponse(messageText, messages);
      
      const assistantMessage: GeminiMessage = {
        role: "model",
        content: response,
      };

      setMessages((prevMessages) => [...prevMessages, assistantMessage]);
    } catch (error) {
      console.error("Error getting AI response:", error);
      toast({
        title: "Error",
        description: "Failed to get a response. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickPrompt = (prompt: string) => {
    setInput(prompt);
    handleSendMessage(prompt);
  };

  const renderMessage = (message: GeminiMessage, index: number) => {
    const isUser = message.role === "user";
    return (
      <div
        key={index}
        className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}
      >
        <div
          className={`max-w-[80%] md:max-w-[70%] rounded-lg p-4 ${
            isUser
              ? "bg-travel-primary text-white"
              : "bg-gray-100 dark:bg-gray-800"
          }`}
        >
          <div className="whitespace-pre-wrap">{message.content}</div>
        </div>
      </div>
    );
  };

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
    <MainLayout>
      <div className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main chat section */}
          <div className="lg:col-span-2">
            <Card className="h-full flex flex-col">
              <CardHeader className="pb-0">
                <CardTitle className="flex items-center space-x-2">
                  <div className="bg-travel-primary h-8 w-8 rounded-full flex items-center justify-center text-white">
                    <MessageSquare className="h-4 w-4" />
                  </div>
                  <span>AI Travel Assistant</span>
                </CardTitle>
                <p className="text-sm text-muted-foreground mt-2">
                  Ask me anything about transportation, destinations, travel tips, and more.
                </p>
              </CardHeader>

              <CardContent className="flex-grow overflow-hidden flex flex-col pt-6">
                <div className="flex-grow overflow-y-auto mb-4 pr-2" style={{ maxHeight: "60vh" }}>
                  {messages.map((message, index) => renderMessage(message, index))}
                  <div ref={messagesEndRef} />
                </div>

                <Separator className="my-4" />

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
                  className="flex space-x-2"
                >
                  <Input
                    placeholder="Ask about transportation, destinations, or travel tips..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    disabled={isLoading}
                    className="flex-grow"
                  />
                  <Button type="submit" disabled={!input.trim() || isLoading}>
                    {isLoading ? (
                      <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                    <span className="sr-only">Send message</span>
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Suggested prompts section */}
          <div className="hidden lg:block">
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Suggested Questions</CardTitle>
              </CardHeader>
              <CardContent>
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
                            onClick={() => handleQuickPrompt(prompt)}
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
                      onClick={() => handleQuickPrompt(travelPrompts.destinationInfo("Barcelona"))}
                    >
                      About Barcelona
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuickPrompt(travelPrompts.destinationInfo("Tokyo"))}
                    >
                      About Tokyo
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuickPrompt(travelPrompts.itinerarySuggestion("Paris", 3))}
                    >
                      3 Days in Paris
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuickPrompt(travelPrompts.budgetEstimate("Thailand", 7, "budget"))}
                    >
                      Thailand Budget
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
