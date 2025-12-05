"use client";

import { useState } from "react";
import { MessageSquare, X, Send } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/Card";

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg z-50"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
      >
        <MessageSquare className="h-6 w-6" />
      </Button>

      {isOpen && (
        <Card className="fixed bottom-24 right-6 w-80 sm:w-96 shadow-xl z-50 animate-in slide-in-from-bottom-5">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 border-b">
            <CardTitle className="text-sm font-medium">
              AI Shopping Assistant
            </CardTitle>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="h-80 overflow-y-auto p-4 space-y-4">
            <div className="bg-muted p-3 rounded-lg text-sm max-w-[85%] self-start">
              Hi! I can help you find products or answer questions. What are you
              looking for today?
            </div>
            {/* Chat history placeholder */}
          </CardContent>
          <CardFooter className="p-3 border-t">
            <form
              className="flex w-full items-center space-x-2"
              onSubmit={(e) => e.preventDefault()}
            >
              <Input
                type="text"
                placeholder="Ask anything..."
                className="flex-1"
              />
              <Button type="submit" size="icon" variant="ghost">
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
