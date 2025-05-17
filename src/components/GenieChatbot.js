import React, { useState, useRef, useEffect } from 'react';
import './GenieChatbot.css';

const initialMessages = [
  {
    sender: 'genie',
    text: 'Hello! I am Genie, your assistant. How can I help you today? 😊',
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }
];

const politeResponses = [
  "I'm here to help you with anything you need!",
  "Let me look that up for you...",
  "Of course! Here's what I found:",
  "Thank you for your question!",
  "I'm always happy to assist you!"
];

function getPoliteResponse(userMsg) {
  // For demo, just echo with a polite prefix. Replace with real AI logic or API call.
  if (/order|track|status/i.test(userMsg)) {
    return "You can view and track your orders in the 'My Orders' section. If you need more help, let me know!";
  }
  if (/refund|return/i.test(userMsg)) {
    return "For refunds or returns, please visit the 'My Orders' page and select the relevant order. If you need further assistance, I'm here!";
  }
  if (/dark mode|theme/i.test(userMsg)) {
    return "You can switch between dark and light mode using the toggle in the navigation bar near Home.";
  }
  if (/contact|support|help/i.test(userMsg)) {
    return "You can reach our support team via the Contact page, or just ask me here!";
  }
  if (/product|search/i.test(userMsg)) {
    return "You can search for products using the search bar at the top of the Products page. Need help finding something specific?";
  }
  if (/hello|hi|hey/i.test(userMsg)) {
    return "Hello! How can I assist you today?";
  }
  return politeResponses[Math.floor(Math.random() * politeResponses.length)] + ' (Genie is still learning!)';
}

const GenieChatbot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState('');
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (open && chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, open]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMsg = {
      sender: 'user',
      text: input,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages((msgs) => [...msgs, userMsg]);
    setInput('');
    setTimeout(() => {
      const genieMsg = {
        sender: 'genie',
        text: getPoliteResponse(input),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((msgs) => [...msgs, genieMsg]);
    }, 900);
  };

  return (
    <div className={`genie-chatbot-container${open ? ' open' : ''}`}>  
      <button className="genie-fab" onClick={() => setOpen((v) => !v)} aria-label="Open Genie chatbot">
        <span className="genie-fab-inner">
          <i className="fas fa-robot"></i>
        </span>
      </button>
      {open && (
        <div className="genie-chatbot-window">
          <div className="genie-header">
            <span className="genie-avatar-outer">
              <i className="fas fa-robot genie-avatar"></i>
            </span>
            <span>Genie Assistant</span>
            <button className="genie-close" onClick={() => setOpen(false)} aria-label="Close Genie">×</button>
          </div>
          <div className="genie-messages">
            {messages.map((msg, idx) => (
              <div key={idx} className={`genie-msg ${msg.sender}`}> 
                <div className="msg-bubble">
                  <span>{msg.text}</span>
                  <span className="msg-time">{msg.time}</span>
                </div>
              </div>
            ))}
            <div ref={chatEndRef}></div>
          </div>
          <form className="genie-input-bar" onSubmit={handleSend} autoComplete="off">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Ask Genie anything..."
              aria-label="Type your message"
            />
            <button type="submit" aria-label="Send"><i className="fas fa-paper-plane"></i></button>
          </form>
        </div>
      )}
    </div>
  );
};

export default GenieChatbot; 