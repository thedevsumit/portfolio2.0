// ChatllyPreview — interactive real-time chat mini-demo
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Send, MessageCircle, Smile, Users } from "lucide-react";
import { cn } from "../../../utils/cn";

const PEER_REPLIES = {
  hi: ["Hey Nigga! did my site snapped?", "Hi wassup dawgg", "Hey! cutiepie"],
  react: [
    "I am in love with you!",
    "Haha amma kick you ass nigga!",
    "Lmao you are too unfunny!",
  ],
  default: ["Listen to Ghar by Bharat Chauhan!", "Listen to Kohra!", "Listen to Gandi Aulaad!"],
};

const pickReply = (text) => {
  const t = text.toLowerCase();
  if (t.includes("hi") || t.includes("hey") || t.includes("hello")) {
    return PEER_REPLIES.hi[Math.floor(Math.random() * PEER_REPLIES.hi.length)];
  }
  if (t.includes("❤") || t.includes("react") || t.includes("nice")) {
    return PEER_REPLIES.react[
      Math.floor(Math.random() * PEER_REPLIES.react.length)
    ];
  }
  return PEER_REPLIES.default[
    Math.floor(Math.random() * PEER_REPLIES.default.length)
  ];
};

const initials = (name) =>
  name
    .split(" ")
    .map((s) => s[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

const Message = ({ msg, isMe, reduced }) => (
  <motion.div
    initial={reduced ? { opacity: 0 } : { opacity: 0, y: 10, scale: 0.96 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
    className={cn(
      "flex gap-2 items-end",
      isMe ? "flex-row-reverse" : "flex-row",
    )}
  >
    {!isMe && (
      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-cyan-500/40 to-mint-500/30 border border-cyan-500/30 flex items-center justify-center text-[10px] font-mono text-primary shrink-0">
        t
      </div>
    )}
    <div
      className={cn(
        "max-w-[78%] px-3 py-2 text-sm leading-snug",
        isMe
          ? "rounded-[14px] rounded-br-sm bg-gradient-to-br from-cyan-500/30 to-mint-500/20 border border-cyan-500/30 text-primary"
          : "rounded-[14px] rounded-bl-sm bg-[var(--elev-2)] border border-[var(--border-soft)] text-secondary/95",
      )}
    >
      {msg.text}
    </div>
  </motion.div>
);

const TypingDots = () => (
  <div className="flex items-center gap-1 px-3 py-2 rounded-[14px] rounded-bl-sm bg-[var(--elev-2)] border border-[var(--border-soft)]">
    {[0, 1, 2].map((i) => (
      <motion.span
        key={i}
        className="w-1.5 h-1.5 rounded-full bg-cyan-500"
        animate={{ opacity: [0.3, 1, 0.3], y: [0, -2, 0] }}
        transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }}
      />
    ))}
  </div>
);

export const ChatllyPreview = ({ liveUrl }) => {
  const reduceMotion = useReducedMotion();
  const [messages, setMessages] = useState([
    {
      id: 1,
      from: "them",
      text: "Which college has best Coding Culutre and Infra",
      ts: "14:02",
    },
    { id: 2, from: "me", text: "Definately not NITJ", ts: "14:02" },
    { id: 3, from: "them", text: "Absolutely Right blud", ts: "14:03" },
  ]);
  const [draft, setDraft] = useState("");
  const [typing, setTyping] = useState(false);
  const [online, setOnline] = useState(8);
  const scrollRef = useRef(null);
  const idRef = useRef(100);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, typing]);

  useEffect(() => {
    const t = setInterval(() => {
      setOnline((o) => Math.max(1, o + (Math.random() > 0.5 ? 1 : -1)));
    }, 4000);
    return () => clearInterval(t);
  }, []);

  const send = (text) => {
    const t = text.trim();
    if (!t) return;
    const meId = ++idRef.current;
    setMessages((m) => [...m, { id: meId, from: "me", text: t, ts: "now" }]);
    setDraft("");

    if (reduceMotion) {
      setMessages((m) => [
        ...m,
        { id: ++idRef.current, from: "them", text: pickReply(t), ts: "now" },
      ]);
      return;
    }

    setTyping(true);
    setTimeout(
      () => {
        setTyping(false);
        setMessages((m) => [
          ...m,
          { id: ++idRef.current, from: "them", text: pickReply(t), ts: "now" },
        ]);
      },
      900 + Math.random() * 600,
    );
  };

  const onSubmit = (e) => {
    e.preventDefault();
    send(draft);
  };

  const quickChips = ["Send hi 👋", "Sounds good!", "React with ❤️", "TBSM4L"];

  return (
    <div className="surface overflow-hidden">
      <div className="flex items-center gap-2 px-3 py-2 border-b border-[var(--border-soft)] bg-[var(--elev-2)]">
        <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        <div className="ml-2 flex-1 max-w-[60%] mx-auto">
          {liveUrl ? (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-pill bg-[var(--bg-page)] border border-[var(--border-soft)] text-[10px] font-mono text-faint hover:text-cyan-500 hover:border-cyan-500/40 transition-colors truncate"
            >
              <MessageCircle size={10} className="shrink-0" />
              <span className="truncate">
                {liveUrl.replace(/^https?:\/\//, "")}
              </span>
            </a>
          ) : (
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-pill bg-[var(--bg-page)] border border-[var(--border-soft)] text-[10px] font-mono text-faint">
              <MessageCircle size={10} />
              chatlly://dm/thedevsumit
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3 px-4 py-3 border-b border-[var(--border-soft)]">
        <div className="relative">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-cyan-500/40 to-mint-500/30 border border-cyan-500/30 flex items-center justify-center text-[11px] font-mono text-primary">
            t
          </div>
          <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-success border-2 border-[var(--bg-card)]" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-primary truncate">
            thedevsumit
          </p>
          <p className="text-[10px] font-mono text-success inline-flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
            online · zoned in
          </p>
        </div>
        <div className="text-right">
          <p className="text-[10px] font-mono text-faint inline-flex items-center gap-1">
            <Users size={10} /> {online}
          </p>
          <p className="text-[10px] font-mono text-cyan-500">live</p>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="h-56 overflow-y-auto p-3 space-y-2.5 flex flex-col"
      >
        {messages.map((m) => (
          <Message
            key={m.id}
            msg={m}
            isMe={m.from === "me"}
            reduced={reduceMotion}
          />
        ))}
        <AnimatePresence>
          {typing && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              className="flex gap-2 items-end"
            >
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-cyan-500/40 to-mint-500/30 border border-cyan-500/30 flex items-center justify-center text-[10px] font-mono text-primary shrink-0">
                t
              </div>
              <TypingDots />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="px-3 pt-2 pb-1 flex flex-wrap gap-1.5 border-t border-[var(--border-soft)] bg-[var(--elev-1)]">
        {quickChips.map((chip) => (
          <button
            key={chip}
            type="button"
            onClick={() =>
              send(chip.replace("Send ", "").replace("…", "").trim())
            }
            className="text-[10px] font-mono px-2 py-1 rounded-pill border border-[var(--border-soft)] bg-[var(--elev-2)] text-muted hover:text-primary hover:border-cyan-500/40 transition-colors"
          >
            {chip}
          </button>
        ))}
      </div>

      <form
        onSubmit={onSubmit}
        className="flex items-center gap-2 p-3 border-t border-[var(--border-soft)]"
      >
        <button
          type="button"
          className="text-faint hover:text-cyan-500 transition-colors"
          aria-label="Add emoji"
        >
          <Smile size={16} />
        </button>
        <input
          type="text"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Message thedevsumit"
          className="flex-1 bg-[var(--elev-1)] border border-[var(--border-soft)] rounded-pill px-3 py-1.5 text-sm text-primary placeholder:text-faint focus:outline-none focus:border-cyan-500/50 transition-colors"
        />
        <button
          type="submit"
          disabled={!draft.trim()}
          className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-mint-500 flex items-center justify-center text-bg-page disabled:opacity-30 disabled:cursor-not-allowed transition-opacity"
          aria-label="Send message"
        >
          <Send size={13} />
        </button>
      </form>
    </div>
  );
};
