import React, { useState, useRef, useEffect } from 'react';
import { cn } from '../../utils/cn';
import Button from './Button';
import { Send, X, MessageSquare, Bot } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: '1',
    content: "Hello! I'm your AI assistant. How can I help you with investing today?",
    sender: 'bot',
    timestamp: new Date(),
  },
];

const botResponses = [
  "I can help you find startups that match your investment criteria.",
  "Based on your profile, you might be interested in fintech startups.",
  "The current trending sectors are clean energy and healthcare AI.",
  "For new investors, I recommend starting with lower-risk opportunities.",
  "You can diversify your portfolio by investing smaller amounts across multiple startups.",
  "Our platform uses blockchain to ensure all transactions are secure and transparent.",
  "You can earn reward tokens by completing your profile and making regular investments.",
];

interface ChatbotProps {
  className?: string;
}

const Chatbot = ({ className }: ChatbotProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [botResponseIndex, setBotResponseIndex] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate bot response after delay
    setTimeout(() => {
      const response =
        botResponses[botResponseIndex % botResponses.length];
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        sender: 'bot',
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
      setBotResponseIndex((prev) => prev + 1);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chatbot toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-lg bg-primary-500 text-white transition-all duration-300 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-300',
          isOpen && 'bg-error-500 hover:bg-error-600 focus:ring-error-300'
        )}
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </button>

      {/* Chatbot window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={cn(
              'fixed bottom-24 right-6 z-40 w-80 sm:w-96 max-h-[70vh] bg-white rounded-lg shadow-xl flex flex-col overflow-hidden',
              className
            )}
          >
            {/* Header */}
            <div className="p-4 bg-primary-500 text-white flex items-center">
              <Bot className="mr-2" size={20} />
              <div className="flex-1">
                <h3 className="font-medium">Investment Assistant</h3>
                <p className="text-xs opacity-80">Ask me anything about investing</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white focus:outline-none transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      'flex',
                      message.sender === 'user' ? 'justify-end' : 'justify-start'
                    )}
                  >
                    <div
                      className={cn(
                        'max-w-[80%] rounded-lg p-3 text-sm',
                        message.sender === 'user'
                          ? 'bg-primary-500 text-white rounded-tr-none'
                          : 'bg-white border border-gray-200 rounded-tl-none'
                      )}
                    >
                      {message.content}
                      <div
                        className={cn(
                          'text-[10px] mt-1',
                          message.sender === 'user' ? 'text-primary-100' : 'text-gray-400'
                        )}
                      >
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-white border border-gray-200 rounded-lg rounded-tl-none p-3 text-sm">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: '0ms' }} />
                        <div className="w-2 h-2 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: '150ms' }} />
                        <div className="w-2 h-2 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-200 bg-white">
              <div className="flex items-center">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type your message..."
                  className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-300 text-sm"
                />
                <Button
                  variant="primary"
                  size="icon"
                  className="ml-2"
                  onClick={handleSendMessage}
                  disabled={!input.trim()}
                >
                  <Send size={16} />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;