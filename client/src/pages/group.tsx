import { useCallback, useState, type FC, type FormEvent } from "react";
import { useGetInfo, usePostInfo } from "../lib/apiRequests";
import { useParams } from "react-router-dom";
import useSocket, { socket } from "../hooks/useSocket";

const Group: FC = () => {

  const { id } = useParams<{ id: string }>(); // Ensure param key matches your route
  const { data, isPending, isError, error } = useGetInfo(`/api/v1/groups/${id}`);
  const { mutate, isPending: sending, isError: sendingError, error: sendError } =
    usePostInfo(`/api/v1/groups/${id}`);

  const [messages, setMessages] = useState<string[]>([])
  const [input, setInput] = useState('')

  const handleMsg = useCallback((msg: string) => {
    setMessages((prev) => [...prev, msg])
  }, [])

  useSocket('message', handleMsg)

  const sendMsg = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (!input.trim()) return

    socket.emit('message', input)
    setInput('')
  }

  if (isPending) return <p>Loading group info…</p>;
  if (isError) return <p>Error loading group: {(error as Error).message}</p>;

  const group = data?.group;
  console.log('group', group);


  return (
    <main className="group-page">
      {!group ? (
        <p>No group found</p>
      ) : (
        <>
          <h1>{group.name}</h1>
          <p>{group.description}</p>

          {group.image && (
            <img
              src={group.image}
              alt={`Group ${group.name}`}
              width={200}
              height={200}
            />
          )}

            <div>
              <section>
                {messages.map((msg, i) => (
                  <li key={i}>{msg}</li>
                ))}
              </section>

              <form action="">
                <input type="text" value={input} onChange={e => setInput(e.target.value)} placeholder="Input text here" />
                <button onClick={sendMsg} >Send Message</button>
              </form>
            </div>

          <p><strong>Created:</strong> {new Date(group.createdAt).toLocaleString()}</p>
          <p><strong>Posts:</strong> {group.postsCount}</p>

          <h2>Members</h2>
          {group.members && group.members.length > 0 ? (
            <ul>
                {group.members.map((member: any) => (
                <li key={member.id}>
                  <span>
                    {member.user} — <em>{member.role}</em>
                  </span>
                  <small>
                    {" "}
                    (joined {new Date(member.joinedAt).toLocaleDateString()})
                  </small>
                </li>
              ))}
            </ul>
          ) : (
            <p>No members yet</p>
          )}

          {sendingError && <p>Error sending data: {(sendError as Error).message}</p>}

        </>
      )}
    </main>
  );
};

export default Group;
