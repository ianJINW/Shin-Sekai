import { type FC, useState, type FormEventHandler, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetInfo, usePostInfo } from "../lib/apiRequests";
import useSocket, { socket } from "../hooks/useSocket";
import PageSkeleton from "../components/ui/PageSkeleton";
import { toast } from 'sonner';
import useAuthStore from "../store/auth.store";
import Button from '../components/ui/button';
import { MenuIcon, UserIcon } from 'lucide-react';

export interface Member {
  id: number
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
  const navigate = useNavigate()
  const user = useAuthStore(s => s.user)

  const { data, isPending, isError, error } = useGetInfo(`/api/v1/groups/${id}`);
  const { isError: sendingError, error: sendError } = usePostInfo(`/api/v1/groups/${id}`);

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  const messagesEndRef = useRef<HTMLDivElement | null>(null)

  const group = data?.group;

  useEffect(() => {
    if (!group?._id) return;

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
  }, [group?._id]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages])

  // populate messages when group data loads
  useEffect(() => {
    if (!data?.messages) return;

    const mapped = (data.messages as any[]).map((m) => ({
      _id: m._id,
      text: m.text,
      timestamp: m.createdAt ? new Date(m.createdAt).toISOString() : (m.timestamp ?? new Date().toISOString()),
      sender: m.sender ? { _id: m.sender._id ?? m.sender._id, username: m.sender.username, image: m.sender.image } : undefined
    }));

    setMessages(mapped);
  }, [data?.messages]);


  useSocket("groupMessage", (data: unknown) => {
    if (typeof data !== "object" || data === null) return;

    const msg = data as { _id?: string; text: string; sender?: { _id: string; username?: string; image?: string }; timestamp: string }

    setMessages(prev => [...prev, { _id: msg._id, text: msg.text, timestamp: msg.timestamp, sender: msg.sender }])
  });

  const sendMsg: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const trimmed = input.trim();
    if (!trimmed) return;
    socket.emit("groupMessage", { groupId: id, text: trimmed, sender: user?._id });
    setInput("");
  };

  if (isPending) {
    return (
      <PageSkeleton title="Groups loadding" count={8} /> 
    );
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
      {/* 📌 Group Header */}
      <header className="bg-white shadow-md px-6 py-4 flex justify-between w-full items-center gap-4" onClick={() => navigate(`/groups/info/${group._id}`)} >
        {group.image ? <img
          src={group.image || '360_F_1591643371_wRpP6nKXtgWJWPNKokRvjwwaXEfZz5qX.webp'}
            alt={`Group ${group.name}`}
            className="w-12 h-12 rounded-full object-cover border-2 border-indigo-300"
        /> : <UserIcon />}

        <div
        >
          <h1 className="text-xl font-semibold text-gray-900">{group?.name}</h1>
          <p className="text-sm text-gray-500">{group?.description}</p>
        </div>

        <Button onClick={() => { /* menu action */ }} variant="ghost" className=""   > <MenuIcon /></Button>

      </header>

      {/* 🗨️ Messages */}
      <main className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
        {!group ? (
          <p className="text-center text-lg text-gray-600">No group found</p>
        ) : messages.length === 0 ? (
          <p className="text-center text-gray-400">No messages yet</p>
        ) : (
              <>
                {messages.map((msg, i) => (
                  <div
          key={msg._id ?? i}
          className={`max-w-xs px-3 py-2 rounded-2xl shadow-sm text-sm break-words ${msg.sender?._id === user?._id
              ? "ml-auto bg-indigo-500 text-white"
              : "mr-auto bg-gray-200 text-gray-900"
            }`}
        >
          {/* Sender */}
          {msg.sender && (
            <div className="flex items-center gap-2 mb-1">
              {msg.sender.image ? (
                <img
                  src={msg.sender.image}
                  alt={msg.sender.username}
                  className="w-5 h-5 rounded-full object-cover"
                />
              ) : (
                <div className="w-5 h-5 rounded-full bg-gray-300 text-[10px] flex items-center justify-center">
                  {msg.sender.username?.[0]?.toUpperCase() ?? "?"}
                </div>
              )}
              <span className="text-xs font-medium">
                {msg.sender.username ?? "Unknown"}
              </span>
            </div>
          )}

          {msg.text}

          <div className="text-[10px] text-gray-300 text-right mt-1">
            {new Date(msg.timestamp).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
        </div>
      ))}

                {/* 👇 Scroll anchor */}
                <div ref={messagesEndRef} />
              </>
        )}
      </main>


      {/* ✉️ Input Bar */}
      <form
        onSubmit={sendMsg}
        className="border-t bg-white p-3 flex gap-2"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 border rounded-lg px-3 py-2 outline-none"
          placeholder="Type a message…"
        />
        <button
          type="submit"
          className="bg-indigo-500 text-white px-4 py-2 rounded-lg"
        >
          Send
        </button>
      </form>


      {/* ⚠️ Error */}
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
