
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import { useLocation } from "react-router-dom";
import { AIChat } from "@/components/assistant/AIChat";
import { QuickPrompts } from "@/components/assistant/QuickPrompts";

export default function AIAssistant() {
  const [promptParam, setPromptParam] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    // Check if there's a query parameter for the prompt
    const queryParams = new URLSearchParams(location.search);
    const prompt = queryParams.get('prompt');
    
    if (prompt) {
      setPromptParam(prompt);
    }
  }, [location.search]);

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
                <AIChat initialMessage={promptParam} />
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
                <QuickPrompts 
                  onPromptSelect={(prompt) => {
                    // Reset promptParam to allow it to trigger again if same prompt is selected
                    setPromptParam(null);
                    // Use setTimeout to ensure state is updated before setting new value
                    setTimeout(() => setPromptParam(prompt), 0);
                  }} 
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
