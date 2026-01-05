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
import MessageItem, { type Message } from '../components/message';

export interface Member {
  id?: number; user: string | { _id?: string; username?: string; image?: string }; role: "owner" | "admin" | "member"; joinedAt?: string; _id?: string;
}

const Group: FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);

  const { data, isPending, isError, error } = useGetInfo(`/api/v1/groups/${id}`);
  const { isError: sendingError, error: sendError } = usePostInfo(`/api/v1/groups/${id}`);

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

  useEffect(() => {
    if (!group?._id) return;

    setLastOpenedGroupId(group._id);
    const join = () => socket.emit("joinGroup", group._id);

    if (socket.connected) join();
    else socket.once("connect", join);

    return () => { socket.off("connect", join); };
  }, [group?._id, setLastOpenedGroupId]);

  useEffect(() => clearMessages(), [group?._id, clearMessages]);

  useEffect(() => {
    if (!data?.messages) return;

    const mapped = (data.messages as Message[]).map((m) => ({
      _id: m._id,
      text: m.text,
      timestamp: m.createdAt
        ? new Date(m.createdAt).toISOString()
        : m.timestamp ?? new Date().toISOString(),
      createdAt: m.createdAt ? new Date(m.createdAt) : new Date(),
      sender: m.sender
        ? { _id: m.sender._id, username: m.sender.username, image: m.sender.image }
        : undefined,
    }));

    setMessages(mapped);

    if (mapped.length > 0 && atBottom)
      setLastReadMessageId(mapped[mapped.length - 1]._id!);
  }, [data?.messages, setMessages, setLastReadMessageId, atBottom]);

  useSocket("groupMessage", (incoming: unknown) => {
    if (typeof incoming !== "object" || incoming === null) return;

    const msg = incoming as {
      _id?: string;
      text: string;
      sender?: { _id: string; username?: string; image?: string };
      timestamp: string;
    };

    addMessage({
      _id: msg._id,
      text: msg.text,
      timestamp: msg.timestamp,
      sender: msg.sender,
    });
  });

  useEffect(() => {
    if (atBottom) messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, atBottom]);

  useEffect(() => {
    const cont = messagesContainerRef.current;
    if (!cont) return;

    let raf = 0;
    const handleScroll = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const bottom = cont.scrollHeight - cont.scrollTop - cont.clientHeight < 60;
        setAtBottom(bottom);

        if (bottom && messages.length)
          setLastReadMessageId(messages[messages.length - 1]._id!);
      });
    };

    cont.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      cont.removeEventListener("scroll", handleScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [messages, setLastReadMessageId]);

  useEffect(() => {
    const onResize = () =>
      setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }), 50);

    const view = window.visualViewport;
    if (view) {
      view.addEventListener("resize", onResize);
      return () => view.removeEventListener("resize", onResize);
    }
  }, []);

  const sendMsg: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;

    socket.emit("groupMessage", { groupId: id, text: trimmed, sender: user?._id });
    setInput("");
    setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }), 50);
  };

  if (isPending) return <PageSkeleton title="Groups loading" count={8} />;

  if (isError)
    return (
      <div className="flex items-center justify-center min-h-screen text-red-500">
        Error loading group: {(error as Error)?.message}
      </div>
    );

  return (
    <div className="flex flex-col h-screen bg-gray-50 w-full">
      <header
        className="bg-white shadow-md px-4 py-3 flex justify-between items-center"
        onClick={() => group?._id && navigate(`/groups/info/${group._id}`)}
      >
        <div className="flex items-center gap-3">
          {group?.image ? (
            <img
              src={group.image}
              alt={group.name}
              className="w-12 h-12 rounded-full object-cover"
            />
          ) : (
              <UserIcon className="w-12 h-12 text-gray-400" />
          )}
          <div className="truncate">
            <h1 className="font-semibold text-lg text-gray-900 truncate">
              {group?.name}
            </h1>
            <p className="text-sm text-gray-500 truncate">{group?.description}</p>
          </div>
        </div>

        <Button variant="ghost" className="" onClick={() => { toast.info(`Group info ${group.name}`) }} >
          <MenuIcon />
        </Button>
      </header>

      {!atBottom && messages.length > 0 && (
        <div
          className="fixed bottom-20 left-1/2 -translate-x-1/2 bg-indigo-600 text-white px-4 py-2 rounded-lg cursor-pointer"
          onClick={() => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })}
        >
          New messages
        </div>
      )}

      <main
        ref={messagesContainerRef}
        className="flex flex-col overflow-y-auto px-3 py-3"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {!group ? (
          <p className="text-center text-gray-600">No group found</p>
        ) : messages.length === 0 ? (
          <p className="text-center text-gray-400">No messages yet</p>
        ) : (
              messages.map((msg, i) => (
                <MessageItem
                  key={msg._id ?? i}
                  msg={msg}
                  mine={msg.sender?._id === user?._id}
                />
              ))
        )}

        <div ref={messagesEndRef} />
      </main>

      <form
        onSubmit={sendMsg}
        className="border-t bg-white p-3 flex gap-2 items-center fixed bottom-0 left-0 right-0"
        style={{ paddingBlockEnd: "env(safe-area-inset-bottom)" }}
      >
        <input
          aria-label="Type a message"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 border rounded-lg px-3 py-2 text-sm"
          placeholder="Type a message…"
        />

        <button
          type="submit"
          className="bg-indigo-500 text-white px-4 py-2 rounded-lg text-sm"
        >
          Send
        </button>
      </form>

      {sendingError && (
        <div className="fixed left-0 right-0 bottom-[5rem] text-center text-red-500 bg-white py-2">
          Error sending: {(sendError as Error)?.message}
          {toast.error(`Error sending message ${(sendError as Error)?.message}`)}
        </div>
      )}
    </div>
  );
};

export default Group;
