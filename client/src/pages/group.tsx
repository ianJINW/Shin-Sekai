import { type FC, useState, useEffect, useCallback, type FormEvent } from "react";
import { useParams } from "react-router-dom";
import { useGetInfo, usePostInfo } from "../lib/apiRequests";
import { socket } from "../hooks/useSocket";
import PageSkeleton from "../components/ui/PageSkeleton";
import { toast } from 'sonner';

export interface Member {
  user: string;
  role: string;
  id: number;
  joinedAt: Date;
}

const Group: FC = () => {
  const { id } = useParams<{ id: string }>();

  const { data, isPending, isError, error } = useGetInfo(`/api/v1/groups/${id}`);
  const { isError: sendingError, error: sendError } = usePostInfo(`/api/v1/groups/${id}`);

  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState("");

  const handleMsg = useCallback((msg: string) => {
    setMessages((prev) => [...prev, msg]);
  }, []);

  useEffect(() => {
    socket.on("message", handleMsg);

    socket.on("connect_error", (err) => {
      console.error("Socket connect error:", err.message);
    });
    return () => {
      socket.off("message", handleMsg);
    };
  }, [handleMsg]);

  const sendMsg = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;

    socket.emit("message", trimmed);
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




  const group = data?.group;


  return (
    <div className="flex flex-col h-screen bg-gray-50 w-full">
      {/* 📌 Group Header */}
      <header className="bg-white shadow-md px-6 py-4 flex items-center gap-4">
        {group?.image && (
          <img
            src={group.image}
            alt={`Group ${group.name}`}
            className="w-12 h-12 rounded-full object-cover border-2 border-indigo-300"
          />
        )}
        <div>
          <h1 className="text-xl font-semibold text-gray-900">{group?.name}</h1>
          <p className="text-sm text-gray-500">{group?.description}</p>
        </div>
      </header>

      {/* 🗨️ Messages */}
      <main className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
        {!group ? (
          <p className="text-center text-lg text-gray-600">No group found</p>
        ) : messages.length === 0 ? (
          <p className="text-center text-gray-400">No messages yet</p>
        ) : (
          messages.map((msg, i) => (
            <div
              key={i}
              className={`max-w-xs px-3 py-2 rounded-2xl shadow-sm text-sm break-words ${i % 2 === 0
                ? "ml-auto bg-indigo-500 text-white"
                : "mr-auto bg-gray-200 text-gray-900"
                }`}
            >
              {msg}
              <div className="text-[10px] text-gray-300 text-right mt-1">
                {new Date().toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            </div>
          ))
        )}
      </main>

      {/* ✉️ Input Bar */}
      <form className="sticky bottom-0 bg-white border-t border-gray-200 px-4 py-3 flex gap-3 items-center">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message…"
          className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <button
          onClick={sendMsg}
          className="bg-indigo-600 text-white px-5 py-2 rounded-full hover:bg-indigo-700 transition"
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
