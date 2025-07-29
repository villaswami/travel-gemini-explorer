
import { GeminiMessage } from "@/lib/gemini";

interface ChatMessageProps {
  message: GeminiMessage;
}

export const ChatMessage = ({ message }: ChatMessageProps) => {
  const isUser = message.role === "user";
  
  return (
    <div
      className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}
    >
      <div
        className={`max-w-[80%] md:max-w-[70%] rounded-lg p-4 ${
          isUser
            ? "bg-primary text-primary-foreground"
            : "bg-muted text-muted-foreground"
        }`}
      >
        <div className="whitespace-pre-wrap text-current">{message.content}</div>
      </div>
    </div>
  );
};
