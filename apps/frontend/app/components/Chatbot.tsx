import React, { useState } from 'react';
import { AiOutlineMessage, AiOutlineClose, AiOutlineRobot } from 'react-icons/ai';
import { useTheme } from '../context/ThemeContext';
const ChatBot: React.FC = () => {
  const { selectedTheme, themeStyles, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ sender: string, text: string, time: string }[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // time in 'hh:mm AM/PM' format
  const getCurrentTime = () => {
    const date = new Date();
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // submit message
  const handleSendMessage = async () => {
    if (userInput.trim() === '') return;

    // Add chat+time =>user
    setMessages([...messages, { sender: 'user', text: userInput, time: getCurrentTime() }]);
    setUserInput('');

    // Simulate bot is typing
    setIsTyping(true);
    try {
      let url = '';
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
      url = `${backendUrl}/chat/userQuery?query=${encodeURIComponent(userInput)}`

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (data.result) {
        console.log(JSON.stringify(data));
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: 'bot', text: data.result.answer, time: getCurrentTime() },
        ]);
      } else {
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: 'bot', text: 'There has been an error in the response.', time: getCurrentTime() },
        ]);
      }
      setIsTyping(false);
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
    }

  };

  // Handle pressing "Enter" key
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Floating Chat Icon */}
      {!isOpen && (
        <button
          className="bg-gray-900 p-4 rounded-full text-white shadow-lg"
          onClick={() => setIsOpen(true)}
          style={{background: themeStyles.navbarColor}}
        >
          <AiOutlineMessage size={30} />
        </button>
      )}

      {/* Chat Modal */}
      {isOpen && (
        <div className="bg-white w-96 h-[32rem] p-4 shadow-lg rounded-lg flex flex-col">
          {/* Modal Header */}
          <div className="flex justify-between items-center border-b pb-2">
            <h2 className="text-lg font-bold flex items-center">
              <AiOutlineRobot className="mr-2" />
              Need some help? Pop a message!
            </h2>
            <AiOutlineClose
              size={24}
              className="cursor-pointer"
              onClick={() => setIsOpen(false)}
            />
          </div>

          {/* Chat Area */}
          <div className="flex-grow overflow-y-auto mt-4 mb-2 space-y-3 message-container">
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`rounded-lg p-3 max-w-xs ${msg.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'} speech-bubble`}>
                  {msg.text}
                  <div className="text-xs text-gray-500 mt-1 text-right">{msg.time}</div> {/* Timestamp */}
                </div>
              </div>
            ))}
            {isTyping && <div className="text-sm text-gray-500">Chatbot is typing...</div>}
          </div>

          {/* User Input */}
          <div className="border-t pt-2 flex">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              className="flex-grow p-2 border rounded-md"
            />
            <button
              onClick={handleSendMessage}
              className="bg-gray-900 text-white p-2 rounded-md ml-2"
              style={{background: themeStyles.navbarColor}}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;