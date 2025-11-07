import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import DashboardLayout from "@/components/DashboardLayout";
import { Bot, User, Send, Sparkles, Loader2 } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  id: number;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

const initialMessages: Message[] = [
  {
    id: 1,
    role: "assistant",
    content:
      "Hello! I'm your NutriZen AI wellness assistant. I'm here to help you with meal planning, nutrition advice, and wellness guidance. How can I support your health journey today? 🌱",
    timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
  },
];

const suggestedPrompts = [
  "Plan a high-protein meal for dinner",
  "What are good foods for better sleep?",
  "Create a weekly meal prep plan",
  "Help me understand my macros",
];

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userInput = input.trim();
    setInput("");

    // Add user message
    const userMessage: Message = {
      id: Date.now(),
      role: "user",
      content: userInput,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    try {
      // Prepare conversation history (last 10 messages)
      const conversationHistory = messages.slice(-10).map(msg => ({
        role: msg.role,
        content: msg.content
      }));

      // Call the API
      const response = await fetch(`${API_URL}/chat/message`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userInput,
          conversationHistory
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to get response');
      }

      // Add AI response
      const aiMessage: Message = {
        id: Date.now() + 1,
        role: "assistant",
        content: data.data.response,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error: any) {
      console.error('Chat error:', error);

      // Add error message
      const errorMessage: Message = {
        id: Date.now() + 1,
        role: "assistant",
        content: "I apologize, but I'm having trouble connecting right now. Please make sure the server is running and try again. 🔄",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handlePromptClick = (prompt: string) => {
    setInput(prompt);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <DashboardLayout>
      <main className="flex-1 container mx-auto px-4 md:px-6 pt-6 pb-6 flex flex-col">
        {/* Header */}
        <div className="mb-6 animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">AI Wellness Chat</h1>
          <p className="text-muted-foreground">
            Your 24/7 nutrition assistant
          </p>
        </div>

        {/* Chat Container */}
        <div className="flex-1 flex flex-col max-w-5xl mx-auto w-full">
          <Card className="flex-1 flex flex-col shadow-strong border-border/50 overflow-hidden animate-scale-in">
            {/* Chat Header */}
            <div className="bg-gradient-hero p-4 flex items-center gap-3 border-b border-border">
              <div className="w-12 h-12 rounded-full bg-primary-foreground/20 backdrop-blur-sm flex items-center justify-center">
                <Bot className="w-7 h-7 text-primary-foreground" />
              </div>
              <div className="flex-1">
                <div className="font-semibold text-primary-foreground">NutriZen AI Assistant</div>
                <div className="text-xs text-primary-foreground/80 flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-primary-foreground animate-pulse" />
                  Online
                </div>
              </div>
              <Sparkles className="w-5 h-5 text-primary-foreground animate-pulse-glow" />
            </div>

            {/* Messages Area */}
            <ScrollArea ref={scrollAreaRef} className="flex-1 p-6 bg-gradient-card">
              <div className="space-y-6">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 animate-fade-in ${message.role === "user" ? "flex-row-reverse" : "flex-row"
                      }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${message.role === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-gradient-accent text-accent-foreground"
                        }`}
                    >
                      {message.role === "user" ? (
                        <User className="w-5 h-5" />
                      ) : (
                        <Bot className="w-5 h-5" />
                      )}
                    </div>
                    <div className="flex-1 max-w-[80%]">
                      <div
                        className={`rounded-2xl px-5 py-3 ${message.role === "user"
                            ? "bg-primary text-primary-foreground ml-auto"
                            : "bg-card text-card-foreground border border-border shadow-soft"
                          }`}
                      >
                        <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                      </div>
                      <div
                        className={`text-xs text-muted-foreground mt-1 px-2 ${message.role === "user" ? "text-right" : "text-left"
                          }`}
                      >
                        {message.timestamp}
                      </div>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex gap-3 animate-fade-in">
                    <div className="w-10 h-10 rounded-full bg-gradient-accent text-accent-foreground flex items-center justify-center flex-shrink-0">
                      <Bot className="w-5 h-5" />
                    </div>
                    <div className="bg-card border border-border rounded-2xl px-5 py-3 shadow-soft">
                      <div className="flex gap-1 items-center">
                        <Loader2 className="w-4 h-4 animate-spin text-primary" />
                        <span className="text-sm text-muted-foreground ml-2">Thinking...</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            {/* Suggested Prompts */}
            {messages.length === 1 && !isTyping && (
              <div className="px-6 py-4 border-t border-border bg-muted/30">
                <p className="text-sm text-muted-foreground mb-3">Try asking me about:</p>
                <div className="flex flex-wrap gap-2">
                  {suggestedPrompts.map((prompt) => (
                    <button
                      key={prompt}
                      onClick={() => handlePromptClick(prompt)}
                      className="px-4 py-2 rounded-lg bg-card border border-border text-sm hover:border-primary hover:bg-primary/5 transition-colors"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Area */}
            <CardContent className="p-4 border-t border-border bg-background">
              <div className="flex gap-3 items-end">
                {/* Input */}
                <div className="flex-1 relative">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask me anything about nutrition, meals, or wellness..."
                    className="pr-12 h-12 bg-muted border-border"
                    disabled={isTyping}
                  />
                </div>

                {/* Send Button */}
                <Button
                  onClick={handleSend}
                  disabled={!input.trim() || isTyping}
                  variant="hero"
                  size="icon"
                  className="flex-shrink-0 h-12 w-12"
                >
                  {isTyping ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Send className="w-5 h-5" />
                  )}
                </Button>
              </div>

              <p className="text-xs text-muted-foreground mt-3 text-center">
                AI responses are suggestions. Always consult healthcare professionals for medical advice.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </DashboardLayout>
  );
};

export default Chat;
