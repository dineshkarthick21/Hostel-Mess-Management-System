import { useState, useEffect, useRef } from "react";
import { Navbar } from "../Navbar";
import { toast } from "react-toastify";

export default function AIAssistant() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your HMS AI Assistant. How can I help you today? You can ask me about hostel management, mess facilities, attendance, complaints, or any other queries.",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

    if (!apiKey) {
      toast.error("API Key not found in environment variables", {
        position: "top-right",
        autoClose: 3000,
        theme: "dark",
      });
      return;
    }

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: input,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `You are a helpful AI assistant for a Hostel Management System. Answer the following query related to hostel management, mess, attendance, complaints, invoices, suggestions, or general hostel queries. Be concise and helpful.\n\nUser Query: ${input}`,
                  },
                ],
              },
            ],
          }),
        }
      );

      const data = await response.json();

      if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
        const botReply = {
          id: messages.length + 2,
          text: data.candidates[0].content.parts[0].text,
          sender: "bot",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, botReply]);
      } else {
        toast.error("Failed to get response from AI", {
          position: "top-right",
          autoClose: 3000,
          theme: "dark",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error connecting to AI service", {
        position: "top-right",
        autoClose: 3000,
        theme: "dark",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="w-full h-full bg-black flex flex-col">
      <div className="w-full h-full flex flex-col bg-gradient-to-b from-slate-900 to-black">
        <div className="flex-1 overflow-y-auto px-4 sm:px-8 py-6 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs sm:max-w-md lg:max-w-lg xl:max-w-xl px-4 py-3 rounded-lg ${
                  message.sender === "user"
                    ? "bg-blue-600 text-white"
                    : "bg-slate-700 text-slate-100"
                }`}
              >
                <p className="text-sm sm:text-base break-words">{message.text}</p>
                <p
                  className={`text-xs mt-2 ${
                    message.sender === "user"
                      ? "text-blue-100"
                      : "text-slate-400"
                  }`}
                >
                  {message.timestamp.toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-slate-700 text-slate-100 px-4 py-3 rounded-lg">
                <div className="flex gap-2">
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="px-4 sm:px-8 py-4 sm:py-6 border-t border-slate-700 bg-slate-900">
          <div className="flex gap-3">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything about the hostel..."
              className="flex-1 bg-slate-800 text-white rounded-lg px-4 py-3 border border-slate-600 focus:border-blue-500 focus:outline-none resize-none max-h-24"
              rows="2"
            />
            <button
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-700 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-medium transition-all"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 12L3.269 3.125A59.769 59.769 0 0121.94 19.29m0 0C23.471 20.997 24 21 24 21m0 0l-5.694-5.694m0 0A3 3 0 005.306 5.306m0 0A3 3 0 0121.694 21"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
