'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function Chatbot() {
  const { lang, t, formatPrice } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      text: 'Namaste! 🙏 Welcome to Southern Cravings! I can help you find delicious snacks and sweets from South India. What are you looking for today?',
      products: [],
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  useEffect(() => {
    if (messages.length === 1 && messages[0].type === 'bot') {
      setMessages([{
        type: 'bot',
        text: lang === 'ja' 
          ? 'ナマステ！🙏 Southern Cravingsへようこそ！南インドの美味しいスナックやスイーツを見つけるお手伝いをします。今日は何をお探しですか？' 
          : 'Namaste! 🙏 Welcome to Southern Cravings! I can help you find delicious snacks and sweets from South India. What are you looking for today?',
        products: [],
      }]);
    }
  }, [lang]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput('');
    setMessages((prev) => [...prev, { type: 'user', text: userMessage, products: [] }]);
    setIsTyping(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage, lang }),
      });
      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        {
          type: 'bot',
          text: data.reply,
          products: data.products || [],
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          type: 'bot',
          text: "Sorry, I'm having trouble right now. Please try again!",
          products: [],
        },
      ]);
    }

    setIsTyping(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Floating toggle button */}
      <button
        className="chatbot-toggle"
        onClick={() => setIsOpen(!isOpen)}
        title="Chat with us"
        style={{ padding: isOpen ? '16px' : '8px' }}
      >
        {isOpen ? '✕' : <img src="/bot-icon.png" alt="Chatbot Mascot" className="bot-mascot" />}
      </button>

      {/* Chat window */}
      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <h3>🍛 {t('chatbotTitle')}</h3>
            <button className="chatbot-close" onClick={() => setIsOpen(false)}>✕</button>
          </div>

          <div className="chatbot-messages">
            {messages.map((msg, index) => (
              <div key={index}>
                <div className={`chat-message ${msg.type}`}>
                  {msg.text}
                </div>
                {msg.products && msg.products.length > 0 && (
                  <div className="chat-product-cards">
                    {msg.products.map((product) => {
                      const displayName = lang === 'ja' && product.nameJa ? product.nameJa : product.name;
                      return (
                        <Link
                          href={`/product/${product.slug}`}
                          key={product.slug || product._id}
                          className="chat-product-card"
                          onClick={() => setIsOpen(false)}
                        >
                          <img src={product.image} alt={displayName} />
                          <div className="chat-product-card-info">
                            <h5>{displayName}</h5>
                            <span>{formatPrice(product.price)} • {t(product.state)}</span>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="chat-typing">
                <span></span>
                <span></span>
                <span></span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <div className="chatbot-input">
            <input
              type="text"
              placeholder={t('chatbotPlaceholder')}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button onClick={sendMessage} disabled={isTyping}>➤</button>
          </div>
        </div>
      )}
    </>
  );
}
