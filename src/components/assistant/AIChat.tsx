
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { Send } from "lucide-react";
import { GeminiMessage, getGeminiResponse } from "@/lib/gemini";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { ChatMessage } from "./ChatMessage";

interface AIChatProps {
  initialMessage?: string;
}

export const AIChat = ({ initialMessage }: AIChatProps) => {
  const [messages, setMessages] = useState<GeminiMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();
  const firstMessageSent = useRef(false);

  useEffect(() => {
    // Set welcome message but don't add it to the chat history for API calls
    if (!firstMessageSent.current) {
      const welcomeMessage: GeminiMessage = {
        role: "model",
        content: user 
          ? `Hello ${user.user_metadata?.full_name || "there"}! I'm your AI travel assistant. How can I help with your travel plans today?`
          : "Hello there! I'm your AI travel assistant. How can I help with your travel plans today?"
      };
      
      setMessages([welcomeMessage]);
      firstMessageSent.current = true;
    }

    // Check if there's an initial message to process
    if (initialMessage) {
      handleSendMessage(initialMessage);
    }
  }, [initialMessage, user]);

  useEffect(() => {
    // Scroll to bottom of messages whenever messages change
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (messageText: string = input) => {
    if (!messageText.trim()) return;

    // First, check if user is logged in
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to use the AI assistant",
        variant: "destructive",
      });
      navigate("/signin");
      return;
    }

    const userMessage: GeminiMessage = {
      role: "user",
      content: messageText,
    };

    // Add user message to UI
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // For API calls, only send user messages
      const apiHistory = messages.filter(msg => msg.role === "user");
      const response = await getGeminiResponse(messageText, apiHistory);
      
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

  return (
    <div className="flex-grow overflow-hidden flex flex-col pt-6">
      <div className="flex-grow overflow-y-auto mb-4 pr-2" style={{ maxHeight: "60vh" }}>
        {messages.map((message, index) => (
          <ChatMessage key={index} message={message} />
        ))}
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
    </div>
  );
};
