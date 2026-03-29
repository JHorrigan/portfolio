'use client';

import { useEffect, useRef, useState } from 'react';

const SUGGESTED = [
  "What's James's tech stack?",
  'What has James worked on recently?',
  'What kind of roles has James held?',
  "What are James's strengths?",
];

interface Message {
  role: 'user' | 'assistant';
  text: string;
}

function TypingDots() {
  return (
    <span className="inline-flex items-center gap-1 py-1">
      <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:0ms]" />
      <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:150ms]" />
      <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:300ms]" />
    </span>
  );
}

function SendIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="14" y1="2" x2="6" y2="10" />
      <polyline points="14,2 9,14 6,10 2,7" />
    </svg>
  );
}

export default function DigitalTwin() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [remaining, setRemaining] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch('/api/chat').then((r) => r.json()).then(({ remaining }) => setRemaining(remaining)).catch(() => {});
  }, []);

  async function send(text: string) {
    const question = text.trim();
    if (!question || loading) return;

    setMessages((prev) => [...prev, { role: 'user', text: question }]);
    setInput('');
    setLoading(true);

    let answer = '';
    setMessages((prev) => [...prev, { role: 'assistant', text: '' }]);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: question }),
      });

      if (res.status === 429) {
        setMessages((prev) => [
          ...prev.slice(0, -1),
          { role: 'assistant', text: "You've used all 5 questions for today. Come back tomorrow and I'll be happy to answer more." },
        ]);
        setRemaining(0);
        setLoading(false);
        return;
      }

      if (!res.ok || !res.body) throw new Error('Request failed');

      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });

        const remainingMatch = chunk.match(/__remaining:(\d+)__/);
        if (remainingMatch) {
          setRemaining(parseInt(remainingMatch[1], 10));
          answer += chunk.replace(/__remaining:\d+__/, '');
        } else {
          answer += chunk;
        }

        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = { role: 'assistant', text: answer };
          return updated;
        });
      }

      setTimeout(() => {
        if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }, 50);
    } catch {
      setMessages((prev) => [
        ...prev.slice(0, -1),
        { role: 'assistant', text: 'Something went wrong. Please try again.' },
      ]);
    } finally {
      setLoading(false);
    }
  }

  const showSuggestions = messages.length === 0;

  function reset() {
    setMessages([]);
    setInput('');
  }

  return (
    <section className="glass rounded-3xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 border-b border-slate-700/50 px-5 py-4 md:px-10 md:py-6">
        <div>
          <p className={`text-xs font-mono uppercase tracking-widest mb-1 ${remaining === 0 ? 'text-rose-400' : 'text-cyan-400'}`}>Digital Twin</p>
          <h2 className="text-2xl font-semibold text-white md:text-3xl">Ask James</h2>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          {remaining !== null && (
            <span className={`font-mono text-[10px] tracking-widest rounded-full border px-2.5 py-1 ${
              remaining === 0
                ? 'border-rose-500/40 bg-rose-500/10 text-rose-400'
                : remaining <= 2
                ? 'border-amber-500/40 bg-amber-500/10 text-amber-400'
                : 'border-slate-700 bg-slate-800/50 text-slate-500'
            }`}>
              {remaining}/5 today
            </span>
          )}
          {messages.length > 0 && (
            <button
              onClick={reset}
              aria-label="Clear conversation"
              className="flex items-center gap-1.5 rounded-full border border-slate-700/60 px-3 py-1 text-xs text-slate-400 transition hover:border-slate-500 hover:text-slate-200 hover:bg-slate-800/50"
            >
              <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                <line x1="2" y1="2" x2="10" y2="10" />
                <line x1="10" y1="2" x2="2" y2="10" />
              </svg>
              New chat
            </button>
          )}
          <div className="w-8 h-8 rounded-full bg-cyan-950 border border-cyan-500/30 flex items-center justify-center text-xs font-semibold text-cyan-300 select-none">
            JH
          </div>
          <div className="hidden sm:block text-right">
            <p className="text-xs font-semibold text-slate-200">James Horrigan</p>
            <p className="text-[11px] text-slate-500 flex items-center gap-1 justify-end">
              <span className={`w-1.5 h-1.5 rounded-full inline-block ${remaining === 0 ? 'bg-rose-400' : 'bg-emerald-400'}`} />
              Digital Twin
            </p>
          </div>
        </div>
      </div>

      {/* Chat window */}
      <div ref={scrollRef} className="min-h-[260px] max-h-[420px] overflow-y-auto px-5 py-5 md:px-10 space-y-3">
        {showSuggestions && (
          <div className="flex flex-col gap-3">
            <div className="flex gap-2.5">
              <div className="mt-0.5 w-7 h-7 shrink-0 rounded-full bg-cyan-950 border border-cyan-500/30 flex items-center justify-center text-[10px] font-semibold text-cyan-300 select-none">
                JH
              </div>
              <div className="max-w-[80%] px-4 py-2.5 text-sm leading-6 bg-slate-800/60 border border-slate-700/50 text-slate-300 rounded-2xl rounded-tl-sm">
                Hey — I&apos;m James&apos;s digital twin. Ask me anything about his experience, tech stack, or career.
              </div>
            </div>
            <div className="flex flex-wrap gap-2 pl-9 pt-1">
              {SUGGESTED.map((q) => (
                <button
                  key={q}
                  onClick={() => send(q)}
                  className="flex items-center gap-1.5 rounded-full border border-slate-700 px-3 py-1.5 text-xs font-medium text-slate-400 transition hover:border-cyan-500/60 hover:text-cyan-300 hover:bg-cyan-400/5"
                >
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 opacity-50">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                    <line x1="12" y1="17" x2="12.01" y2="17" />
                  </svg>
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((m, i) => {
          const isUser = m.role === 'user';
          const isLastAssistant = !isUser && i === messages.length - 1;

          return (
            <div key={i} className={`flex gap-2.5 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
              {/* Avatar */}
              {!isUser ? (
                <div className="mt-0.5 w-7 h-7 shrink-0 rounded-full bg-cyan-950 border border-cyan-500/30 flex items-center justify-center text-[10px] font-semibold text-cyan-300 select-none">
                  JH
                </div>
              ) : (
                <div className="mt-0.5 w-7 h-7 shrink-0 rounded-full bg-slate-800 border border-slate-600/50 flex items-center justify-center text-[9px] font-semibold text-slate-400 select-none">
                  YOU
                </div>
              )}

              {/* Bubble */}
              <div
                className={`max-w-[80%] px-4 py-2.5 text-sm leading-6 ${
                  isUser
                    ? 'bg-cyan-950/80 border border-cyan-500/20 text-slate-100 rounded-2xl rounded-tr-sm'
                    : 'bg-slate-800/60 border border-slate-700/50 text-slate-300 rounded-2xl rounded-tl-sm'
                }`}
              >
                {loading && isLastAssistant && m.text === '' ? (
                  <TypingDots />
                ) : (
                  <>
                    {m.text}
                    {loading && isLastAssistant && (
                      <span className="inline-block w-1 h-3.5 bg-cyan-400/70 ml-0.5 align-middle animate-pulse rounded-sm" />
                    )}
                  </>
                )}
              </div>
            </div>
          );
        })}

      </div>

      {/* Input bar */}
      <div className="border-t border-slate-700/50 px-5 py-4 md:px-10">
        <div className="flex items-center gap-3 rounded-2xl border border-slate-700/70 bg-slate-900/50 px-4 py-2.5 transition focus-within:border-slate-600">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && send(input)}
            placeholder={remaining === 0 ? 'Daily limit reached' : 'Message James...'}
            maxLength={500}
            disabled={loading || remaining === 0}
            className="flex-1 bg-transparent text-sm text-slate-200 placeholder-slate-600 outline-none disabled:opacity-40"
          />
          <span className="hidden sm:block text-[10px] text-slate-600 shrink-0">↵ to send</span>
          <button
            onClick={() => send(input)}
            disabled={loading || !input.trim() || remaining === 0}
            aria-label="Send message"
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-cyan-400 text-slate-950 transition hover:bg-cyan-300 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <SendIcon />
          </button>
        </div>
      </div>
    </section>
  );
}
