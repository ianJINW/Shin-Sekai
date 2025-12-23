import { type FC, useState, type FormEventHandler, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetInfo, usePostInfo } from "../lib/apiRequests";
import useSocket, { socket } from "../hooks/useSocket";
import PageSkeleton from "../components/ui/PageSkeleton";
import { toast } from "sonner";
import useAuthStore from "../store/auth.store";
import useChatStore from "../store/chat.store"; // <- import your zustand store
import Button from "../components/ui/button";
import { MenuIcon, UserIcon } from "lucide-react";

export interface Member {
  id: number;
  user: string;
  role: "owner" | "admin" | "member";
  joinedAt: string;
  _id: string;
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

  // Use persisted store instead of local messages state
  const messages = useChatStore((s) => s.messagesx);
  const setMessages = useChatStore((s) => s.setMessages);
  const addMessage = useChatStore((s) => s.addMessage);
  const setLastOpenedGroupId = useChatStore((s) => s.setLastOpenedGoupId);
  const setLastReadMessageId = useChatStore((s) => s.setLastReadMessageId);

  const [input, setInput] = useState("");
  const [bottom, setBottom] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const messagesContainerRef = useRef<HTMLDivElement | null>(null);

  const group = data?.group;

  // join group socket room when group loads
  useEffect(() => {
    if (!group?._id) return;

    // persist last opened group id
    setLastOpenedGroupId(group._id);

    const join = () => {
      socket.emit("joinGroup", group._id);
    };

    if (socket.connected) {
      join();
    } else {
      socket.once("connect", join);
    }

    return () => {
      socket.off("connect", join);
    };
  }, [group?._id, setLastOpenedGroupId]);

  // auto-scroll when new messages arrive and user is at bottom
  useEffect(() => {
    if (bottom) messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, bottom]);

  // track scroll position to update bottom state and lastReadMessageId
  useEffect(() => {
    const cont = messagesContainerRef.current;
    if (!cont) return;

    const handleScroll = () => {
      const atBottom = cont.scrollHeight - cont.scrollTop - cont.clientHeight < 50;
      setBottom(atBottom);

      // if at bottom, mark last read message id
      if (atBottom && messages.length > 0) {
        const last = messages[messages.length - 1];
        if (last?._id) setLastReadMessageId(last._id);
      }
    };

    cont.addEventListener("scroll", handleScroll);
    // run once to set initial bottom/read state
    handleScroll();

    return () => {
      cont.removeEventListener("scroll", handleScroll);
    };
  }, [messages, setLastReadMessageId]);

  // populate messages when group data loads
  useEffect(() => {
    if (!data?.messages) return;

    const mapped = (data.messages as any[]).map((m) => ({
      _id: m._id,
      text: m.text,
      timestamp: m.createdAt ? new Date(m.createdAt).toISOString() : (m.timestamp ?? new Date().toISOString()),
      sender: m.sender ? { _id: m.sender._id ?? m.sender._id, username: m.sender.username, image: m.sender.image } : undefined,
    })) as Message[];

    setMessages(mapped);
  }, [data?.messages, setMessages]);

  // socket listener to append incoming messages into the store
  useSocket("groupMessage", (incoming: unknown) => {
    if (typeof incoming !== "object" || incoming === null) return;

    const msg = incoming as { _id?: string; text: string; sender?: { _id: string; username?: string; image?: string }; timestamp: string };

    addMessage({ _id: msg._id, text: msg.text, timestamp: msg.timestamp, sender: msg.sender });
  });

  const sendMsg: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const trimmed = input.trim();
    if (!trimmed) return;
    socket.emit("groupMessage", { groupId: id, text: trimmed, sender: user?._id });
    setInput("");
  };

  if (isPending) {
    return <PageSkeleton title="Groups loading" count={8} />;
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-500">
        Error loading group: {(error as Error)?.message}
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50 w-full">
      {/* Group Header */}
      <header
        className="bg-white shadow-md px-6 py-4 flex justify-between w-full items-center gap-4"
        onClick={() => navigate(`/groups/info/${group._id}`)}
      >
        {group.image ? (
          <img
            src={group.image || "360_F_1591643371_wRpP6nKXtgWJWPNKokRvjwwaXEfZz5qX.webp"}
            alt={`Group ${group.name}`}
            className="w-12 h-12 rounded-full object-cover border-2 border-indigo-300"
          />
        ) : (
          <UserIcon />
        )}

        <div>
          <h1 className="text-xl font-semibold text-gray-900">{group?.name}</h1>
          <p className="text-sm text-gray-500">{group?.description}</p>
        </div>

        <Button className="" onClick={() => { }} variant="ghost">
          <MenuIcon />
        </Button>
      </header>

      {/* New messages indicator */}
      {!bottom && messages.length > 0 && (
        <div
          className="fixed bottom-20 left-1/2 transform -translate-x-1/2 bg-indigo-600 text-white px-4 py-2 rounded-lg cursor-pointer shadow-md"
          onClick={() => {
            messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          New messages
        </div>
      )}

      <main ref={messagesContainerRef} className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
        {!group ? (
          <p className="text-center text-lg text-gray-600">No group found</p>
        ) : messages.length === 0 ? (
          <p className="text-center text-gray-400">No messages yet</p>
        ) : (
              <>
                {messages.map((msg, i) => (
                  <div
                    key={msg._id ?? i}
                    className={`max-w-xs px-3 py-2 rounded-2xl shadow-sm text-sm break-words ${msg.sender?._id === user?._id ? "ml-auto bg-indigo-500 text-white" : "mr-auto bg-gray-200 text-gray-900"
                      }`}
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

                    {msg.text}

                    <div className="text-[10px] text-gray-300 text-right mt-1">
                      {new Date(msg.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </div>
                  </div>
                ))}

                {/* Scroll anchor */}
                <div ref={messagesEndRef} />
              </>
        )}
      </main>

      {/* Input Bar */}
      <form onSubmit={sendMsg} className="border-t bg-white p-3 flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 border rounded-lg px-3 py-2 outline-none"
          placeholder="Type a message…"
        />
        <button type="submit" className="bg-indigo-500 text-white px-4 py-2 rounded-lg">
          Send
        </button>
      </form>

      {/* Error */}
      {sendingError && (
        <p className="text-center text-red-500 text-sm py-2">
          Error sending: {(sendError as Error)?.message}
          {toast.error(`Error sending message ${(sendError as Error)?.message}`)}
        </p>
      )}
    </div>
  );
};

export default Group;
