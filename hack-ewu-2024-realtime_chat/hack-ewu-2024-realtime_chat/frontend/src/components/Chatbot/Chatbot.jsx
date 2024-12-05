import axios from "axios";
import { useState } from "react";
import Markdown from "react-markdown";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([
    {
      text: "Hello! How can I assist you today?",
      sender: "bot",
    },
  ]);
  const [input, setInput] = useState("");

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = async () => {
    if (input.trim() === "") return;

    setIsLoading(true);
    const userMessage = {
      text: input,
      sender: "user",
    };
    setMessages([...messages, userMessage]);
    setInput("");

    try {
      const res = await axios.post(`http://localhost:3000/api/generate-content`, {
        input,
      });

      const responseText = res.data.content?.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't understand the response.";

      const botMessage = {
        text: responseText,
        sender: "bot",
      };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: "Sorry, something went wrong. Please try again.", sender: "bot" },
      ]);
    }

    setIsLoading(false);
  };

  return (
    <div className="relative z-50">
      {/* Button to open/close the chat overlay */}
      <button
        onClick={toggleChat}
        className="fixed bottom-5 right-5 btn btn-primary rounded-full"
      >
        {isOpen ? "Close" : "AI Assistant"}
      </button>

      {/* Chat overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-300">
          <div className="bg-white w-full max-w-xl rounded-lg shadow-lg p-4 relative">
            {/* Chat header */}
            <div className="flex justify-between items-center border-b pb-2 mb-2">
              <h2 className="text-lg font-semibold">
                Basha Lagbe AI Assistant
              </h2>
              <button onClick={toggleChat} className="btn btn-circle btn-sm">
                ✕
              </button>
            </div>

            {/* Chat messages */}
            <div className="overflow-y-auto max-h-80 mb-4 space-y-2">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`chat ${
                    msg.sender === "user" ? "chat-end" : "chat-start"
                  }`}
                >
                  <div
                    className={`chat-bubble ${
                      msg.sender === "user"
                        ? "text-white"
                        : "text-white bg-blue-700"
                    }`}
                  >
                    {msg.sender === "bot" ? (
                      <Markdown>{msg.text}</Markdown>
                    ) : (
                      msg.text
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Message input */}
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                className="input input-bordered w-full"
                placeholder="Type a message..."
                disabled={isLoading}
              />
              <button
                onClick={handleSendMessage}
                className="btn btn-primary"
                disabled={isLoading}
              >
                {isLoading ? "Loading..." : "Submit"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
