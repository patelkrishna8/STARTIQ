import React, { useState } from 'react';
import { Send, Bot, User, Sparkles, MessageSquare, ArrowRight, CornerDownLeft } from 'lucide-react';
import { ChatMessage } from '../../lib/stratiq/types';
import { PRESET_COACH_QUESTIONS, getCoachResponse } from '../../lib/stratiq/coachService';

export const CoachChatPanel: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init-1',
      sender: 'coach',
      text:
        'Hello Vortex_FF! I have reviewed your last 5 Free Fire sessions. Your movement is crisp (78/100), but open-field exposure during initiation (61/100) is holding your rank push back. How can I help you improve today?',
      timestamp: 'Just now',
      suggestedAction: 'View Positioning Improvement Plan',
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    // Realistic typing delay
    setTimeout(() => {
      const coachReply = getCoachResponse(text);
      setMessages((prev) => [...prev, coachReply]);
      setIsTyping(false);
    }, 600);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSendMessage(inputText);
    }
  };

  return (
    <div className="bg-[#11141e] border border-cyan-500/30 rounded-2xl p-4 sm:p-6 space-y-4 shadow-xl flex flex-col h-[520px]">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 flex items-center justify-center">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <span>StratIQ AI Coach</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </h3>
            <p className="text-[11px] font-mono text-cyan-400">Grounded to your 5 analyzed matches</p>
          </div>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto space-y-3 pr-1">
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';
          return (
            <div key={msg.id} className={`flex gap-2.5 ${isUser ? 'justify-end' : 'justify-start'}`}>
              {!isUser && (
                <div className="w-7 h-7 rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 flex items-center justify-center shrink-0 mt-0.5">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`p-3.5 rounded-2xl max-w-[85%] text-xs leading-relaxed ${
                  isUser
                    ? 'bg-cyan-600 text-white rounded-br-none shadow-md shadow-cyan-600/20'
                    : 'bg-slate-900/90 text-slate-200 border border-slate-800 rounded-bl-none'
                }`}
              >
                <p>{msg.text}</p>
                {msg.suggestedAction && (
                  <div className="mt-2 pt-2 border-t border-slate-800/80 flex items-center gap-1 text-[11px] font-mono text-cyan-400 font-semibold">
                    <Sparkles className="w-3 h-3" />
                    <span>{msg.suggestedAction}</span>
                  </div>
                )}
                <span className="text-[9px] font-mono text-slate-400 mt-1 block text-right">
                  {msg.timestamp}
                </span>
              </div>

              {isUser && (
                <div className="w-7 h-7 rounded-lg bg-slate-800 text-slate-300 border border-slate-700 flex items-center justify-center shrink-0 mt-0.5">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          );
        })}

        {isTyping && (
          <div className="flex items-center gap-2 text-xs text-slate-400 pl-9">
            <div className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" />
            <div className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '0.2s' }} />
            <div className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '0.4s' }} />
          </div>
        )}
      </div>

      {/* Preset Questions Slider / Chips */}
      <div className="space-y-1.5 pt-1">
        <span className="text-[10px] font-mono uppercase text-slate-500">Quick Inquiries:</span>
        <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {PRESET_COACH_QUESTIONS.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(q)}
              className="text-[11px] font-mono text-slate-300 bg-slate-900/80 hover:bg-cyan-950/60 hover:text-cyan-300 border border-slate-800 hover:border-cyan-500/40 px-2.5 py-1.5 rounded-lg whitespace-nowrap transition-all shrink-0"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Input Form */}
      <div className="flex items-center gap-2 pt-1">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask Coach anything about your decisions or settings..."
          className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/60 transition-colors"
        />
        <button
          onClick={() => handleSendMessage(inputText)}
          disabled={!inputText.trim()}
          type="button"
          className="p-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 disabled:opacity-40 text-black transition-all active:scale-95 shrink-0"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
