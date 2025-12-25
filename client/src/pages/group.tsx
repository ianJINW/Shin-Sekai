import { type FC, useEffect, useRef, useState, type FormEventHandler } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetInfo, usePostInfo } from "../lib/apiRequests";
import useSocket, { socket } from "../hooks/useSocket";
import PageSkeleton from "../components/ui/PageSkeleton";
import { toast } from "sonner";
import useAuthStore from "../store/auth.store";
import useChatStore from "../store/chat.store";
import Button from "../components/ui/button";
import { MenuIcon, UserIcon } from "lucide-react";

export interface Member {
  id?: number;
  user: string | { _id?: string; username?: string; image?: string };
  role: "owner" | "admin" | "member";
  joinedAt?: string;
  _id?: string;
}

interface Message {
  _id?: string;
  text: string;
  timestamp: string;
  sender?: { _id: string; username?: string; image?: string };
}

const Group: FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);

  const { data, isPending, isError, error } = useGetInfo(`/api/v1/groups/${id}`);
  const { isError: sendingError, error: sendError } = usePostInfo(`/api/v1/groups/${id}`);

  // persisted store
  const messages = useChatStore((s) => s.messages);
  const setMessages = useChatStore((s) => s.setMessages);
  const addMessage = useChatStore((s) => s.addMessage);
  const clearMessages = useChatStore((s) => s.clearMessages);
  const setLastOpenedGroupId = useChatStore((s) => s.setLastOpenedGroupId);
  const setLastReadMessageId = useChatStore((s) => s.setLastReadMessageId);

  const [input, setInput] = useState("");
  const [atBottom, setAtBottom] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const messagesContainerRef = useRef<HTMLDivElement | null>(null);

  const group = data?.group;

  /* Join group socket room and persist last opened group */
  useEffect(() => {
    if (!group?._id) return;

    setLastOpenedGroupId(group._id);

    const join = () => socket.emit("joinGroup", group._id);

    if (socket.connected) join();
    else socket.once("connect", join);

    return () => {
      socket.off("connect", join);
    };
  }, [group?._id, setLastOpenedGroupId]);

  /* Clear messages when switching groups to avoid showing previous group's messages */
  useEffect(() => {
    // clear local store before loading new group's messages
    clearMessages();
  }, [group?._id, clearMessages]);

  /* Populate messages when group data loads */
  useEffect(() => {
    if (!data?.messages) return;

    const mapped = (data.messages as any[]).map((m) => ({
      _id: m._id,
      text: m.text,
      timestamp: m.createdAt ? new Date(m.createdAt).toISOString() : (m.timestamp ?? new Date().toISOString()),
      sender: m.sender ? { _id: m.sender._id ?? m.sender._id, username: m.sender.username, image: m.sender.image } : undefined,
    })) as Message[];

    setMessages(mapped);

    // mark last read if user is at bottom
    if (mapped.length > 0 && atBottom) {
      const last = mapped[mapped.length - 1];
      if (last?._id) setLastReadMessageId(last._id);
    }
  }, [data?.messages, setMessages, setLastReadMessageId, atBottom]);

  /* Socket listener to append incoming messages */
  useSocket("groupMessage", (incoming: unknown) => {
    if (typeof incoming !== "object" || incoming === null) return;

    const msg = incoming as { _id?: string; text: string; sender?: { _id: string; username?: string; image?: string }; timestamp: string };

    addMessage({ _id: msg._id, text: msg.text, timestamp: msg.timestamp, sender: msg.sender });
  });

  /* Auto-scroll when new messages arrive if user is at bottom */
  useEffect(() => {
    if (atBottom) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, atBottom]);

  /* Handle scroll position and mark last read message */
  useEffect(() => {
    const cont = messagesContainerRef.current;
    if (!cont) return;

    let raf = 0;
    const handleScroll = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const atBottomNow = cont.scrollHeight - cont.scrollTop - cont.clientHeight < 60;
        setAtBottom(atBottomNow);

        if (atBottomNow && messages.length > 0) {
          const last = messages[messages.length - 1];
          if (last?._id) setLastReadMessageId(last._id);
        }
      });
    };

    cont.addEventListener("scroll", handleScroll, { passive: true });
    // run once to initialize
    handleScroll();

    return () => {
      cont.removeEventListener("scroll", handleScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [messages, setLastReadMessageId]);

  /* Keep last message visible when virtual keyboard opens on mobile */
  useEffect(() => {
    const onViewportResize = () => {
      // small delay to allow layout to settle
      setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }), 50);
    };

    const vv = window.visualViewport;
    if (vv) {
      vv.addEventListener("resize", onViewportResize);
      return () => vv.removeEventListener("resize", onViewportResize);
    }
    return;
  }, []);

  const sendMsg: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;

    socket.emit("groupMessage", { groupId: id, text: trimmed, sender: user?._id });
    setInput("");
    // optimistic scroll
    setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }), 50);
  };

  if (isPending) return <PageSkeleton title="Groups loading" count={8} />;

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-500">
        Error loading group: {(error as Error)?.message}
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50 w-full">
      {/* Header */}
      <header
        className="bg-white shadow-md px-4 sm:px-6 py-3 sm:py-4 flex flex-col sm:flex-row items-start sm:items-center sm:justify-between gap-3"
        onClick={() => group?._id && navigate(`/groups/info/${group._id}`)}
      >
        <div className="flex items-center gap-3 w-full sm:w-auto">
          {group?.image ? (
            <img
              src={group.image}
              alt={`Group ${group?.name}`}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border-2 border-indigo-300 flex-shrink-0"
            />
          ) : (
            <UserIcon className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400" />
          )}

          <div className="min-w-0">
            <h1 className="text-lg sm:text-xl font-semibold text-gray-900 truncate">{group?.name ?? "Group"}</h1>
            <p className="text-xs sm:text-sm text-gray-500 truncate">{group?.description}</p>
          </div>
        </div>

        <div className="self-end sm:self-auto">
          <Button onClick={() => { }} variant="ghost" className="p-2">
            <MenuIcon />
          </Button>
        </div>
      </header>

      {/* New messages indicator */}
      {!atBottom && messages.length > 0 && (
        <div
          className="fixed bottom-20 left-1/2 transform -translate-x-1/2 bg-indigo-600 text-white px-4 py-2 rounded-lg cursor-pointer shadow-md z-20"
          onClick={() => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })}
        >
          New messages
        </div>
      )}

      {/* Messages container */}
      <main
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto px-3 sm:px-4 py-3 pb-[calc(1rem+env(safe-area-inset-bottom))]"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {!group ? (
          <p className="text-center text-lg text-gray-600">No group found</p>
        ) : messages.length === 0 ? (
          <p className="text-center text-gray-400">No messages yet</p>
        ) : (
              <>
                {messages.map((msg, i) => {
                  const mine = msg.sender?._id === user?._id;
                  return (
                    <div
                      key={msg._id ?? i}
                      className={`px-3 py-2 rounded-2xl shadow-sm text-sm break-words inline-block
                    ${mine ? "ml-auto bg-indigo-500 text-white" : "mr-auto bg-gray-200 text-gray-900"}
                    max-w-[80%] sm:max-w-xs`}
                    >
                      {msg.sender && (
                        <div className="flex items-center gap-2 mb-1">
                          {msg.sender.image ? (
                            <img src={msg.sender.image} alt={msg.sender.username} className="w-5 h-5 rounded-full object-cover" />
                          ) : (
                            <div className="w-5 h-5 rounded-full bg-gray-300 text-[10px] flex items-center justify-center">
                              {msg.sender.username?.[0]?.toUpperCase() ?? "?"}
                            </div>
                          )}
                          <span className="text-xs font-medium">{msg.sender.username ?? "Unknown"}</span>
                        </div>
                      )}

                      <div>{msg.text}</div>

                      <div className="text-[10px] text-gray-400 text-right mt-1">
                        {new Date(msg.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </div>
                    </div>
                  );
                })}

                {/* Scroll anchor */}
                <div ref={messagesEndRef} />
              </>
        )}
      </main>

      {/* Input bar (sticky on mobile) */}
      <form
        onSubmit={sendMsg}
        className="border-t bg-white p-3 flex gap-2 items-center fixed bottom-0 left-0 right-0 sm:static sm:relative z-30"
        style={{ paddinginset- block - end: "env(safe-area-inset-bottom)" }}
      >
        <input
        aria-label="Type a message"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        className="flex-1 border rounded-lg px-3 py-2 outline-none text-sm"
          placeholder="Type a message…"
        />
      <button
        type="submit"
        className="bg-indigo-500 text-white px-4 py-2 rounded-lg text-sm"
        aria-label="Send message"
      >
          Send
        </button>
      </form>

      {/* Error */}
      {sendingError && (
    <div className="fixed left-0 right-0 bottom-[calc(3.5rem+env(safe-area-inset-bottom))] z-40">
      <p className="text-center text-red-500 text-sm py-2 bg-white/90">
        Error sending: {(sendError as Error)?.message}
        {toast.error(`Error sending message ${(sendError as Error)?.message}`)}
      </p>
    </div>
      )}
    </div>
  );
};

export default Group;
