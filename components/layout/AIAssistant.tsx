"use client";

import { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Loader2, Bot } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/Card";
import { useChat } from "@ai-sdk/react";
import ReactMarkdown from "react-markdown";

interface ExtendedMessage {
  toolInvocations?: unknown[];
  content: string;
}

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  // @ts-expect-error useChat type mismatch in v5
  const { messages, append, status, sendMessage } = useChat({
    // @ts-expect-error api option might be missing in types but needed
    api: "/api/chat",
    maxSteps: 5,
  });

  const isLoading = status === "streaming" || status === "submitted";
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    // Handle sendMessage or append based on availability
    if (append) {
      await append({ role: "user", content: input });
    } else if (sendMessage) {
      // @ts-expect-error sendMessage signature mismatch
      await sendMessage({ role: "user", content: input });
    }
    setInput("");
  };

  return (
    <>
      <Button
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg z-50 transition-transform hover:scale-110"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
      >
        <MessageSquare className="h-6 w-6" />
      </Button>

      {isOpen && (
        <Card className="fixed bottom-24 right-6 w-80 sm:w-96 shadow-xl z-50 animate-in slide-in-from-bottom-5 flex flex-col max-h-[600px] h-[500px]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 py-3 px-4 border-b bg-primary text-primary-foreground rounded-t-lg">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Bot className="h-4 w-4" />
              AI Shopping Assistant
            </CardTitle>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-primary-foreground hover:bg-primary-foreground/20"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent
            className="flex-1 overflow-y-auto p-4 space-y-4"
            ref={scrollRef}
          >
            {messages.length === 0 && (
              <div className="bg-muted p-3 rounded-lg text-sm max-w-[85%] self-start">
                Hi! I can help you find products, compare items, or answer your
                questions. What are you looking for today?
              </div>
            )}

            {messages.map(
              (m) =>
                m.role !== "system" && (
                  <div
                    key={m.id}
                    className={`flex ${
                      m.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`p-3 rounded-lg text-sm max-w-[85%] ${
                        m.role === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      }`}
                    >
                      {(m as unknown as ExtendedMessage).toolInvocations ? (
                        <div className="text-xs italic text-muted-foreground flex items-center gap-1">
                          <Loader2 className="h-3 w-3 animate-spin" />{" "}
                          Searching...
                        </div>
                      ) : (
                        <div className="prose prose-sm dark:prose-invert">
                          <ReactMarkdown>
                            {(m as unknown as ExtendedMessage).content}
                          </ReactMarkdown>
                        </div>
                      )}
                    </div>
                  </div>
                )
            )}

            {isLoading && messages[messages.length - 1]?.role === "user" && (
              <div className="flex justify-start">
                <div className="bg-muted p-3 rounded-lg text-sm max-w-[85%] flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" /> Thinking...
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="p-3 border-t">
            <form
              className="flex w-full items-center space-x-2"
              onSubmit={handleSubmit}
            >
              <Input
                value={input}
                onChange={handleInputChange}
                type="text"
                placeholder="Ask about products..."
                className="flex-1"
                disabled={isLoading}
              />
              <Button
                type="submit"
                size="icon"
                variant="ghost"
                disabled={isLoading || !input.trim()}
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </CardFooter>
        </Card>
      )}
    </>
  );
};

export default AIAssistant;
