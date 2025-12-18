import { type FC, useState, useEffect, useCallback, type FormEvent } from "react";
import { useParams } from "react-router-dom";
import { useGetInfo, usePostInfo } from "../lib/apiRequests";
import { socket } from "../hooks/useSocket";
import Editor from "../components/editor";

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
  const [editing, setEditing] = useState(false)

  const handleMsg = useCallback((msg: string) => {
    setMessages((prev) => [...prev, msg]);
  }, []);

  useEffect(() => {
    socket.on("message", handleMsg);
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
      <div className="flex items-center justify-center min-h-screen text-gray-500">
        Loading group info…
      </div>
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
    <div className="max-w-3xl mx-auto p-4 space-y-6">
      {!group ? (
        <p className="text-center text-lg text-gray-600">No group found</p>
      ) : (
        <>
            {/* Group Header */}
            <header className="text-center">
              <h1 className="text-2xl font-bold text-gray-800">{group.name}</h1>
              <p className="text-sm text-gray-500">{group.description}</p>
            </header>

            {/* Group Image */}
          {group.image && (
              <div className="flex justify-center">
                <img popoverTarget="editor"
                  src={group.image}
                  alt={`Group ${group.name}`}
                  className="w-40 h-40 rounded-full object-cover border-2 border-indigo-300"
                />
              </div>
            )}

            <Editor id='editor' />

            {/* Messages Panel */}
            <section className="bg-white shadow-lg rounded-lg p-4 flex flex-col gap-3 max-h-96 overflow-y-auto" popover id="editor" >
              {messages.length === 0 ? (
                <p className="text-center text-gray-400">No messages yet</p>
              ) : (
                messages.map((msg, i) => (
                  <div
                    key={i}
                    className="bg-indigo-100 text-indigo-900 px-4 py-2 rounded-lg shadow-sm max-w-xs break-words"
                  >
                    {msg}
                  </div>
                ))
              )}
            </section>

            {/* Input Bar */}
            <form className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message…"
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
              <button
                onClick={sendMsg}
                className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition"
              >
                Send
              </button>
            </form>

            {/* Group Info */}
            <div className="text-gray-700 text-sm">
              <p>
                <strong>Created:</strong>{" "}
                {new Date(group.createdAt).toLocaleString()}
              </p>
              <p>
                <strong>Posts:</strong> {group.postsCount}
              </p>
            </div>

            {/* Members List */}
            <section>
              <h2 className="text-lg font-semibold text-gray-800">Members</h2>
              {group.members?.length > 0 ? (
                <ul className="space-y-2">
                {group.members.map((member: Member) => (
                  <li
                    key={member.id}
                    className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-lg px-4 py-2"
                  >
                    <span className="text-gray-800 font-medium">
                      {member.user}
                    </span>
                    <span className="text-xs text-gray-500 italic">
                      {member.role}
                    </span>
                    <small className="text-gray-400">
                      {new Date(member.joinedAt).toLocaleDateString()}
                    </small>
                  </li>
                ))}
                </ul>
              ) : (
                <p className="text-gray-500">No members yet</p>
              )}
            </section>

            {/* Error Sending */}
            {sendingError && (
              <p className="text-red-500 text-sm">
                Error sending data: {(sendError as Error)?.message}
              </p>
            )}
        </>
      )}
    </div>
  );
};

export default Group;
