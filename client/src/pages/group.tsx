import type { FC } from "react";
import { useGetInfo, usePostInfo } from "../lib/apiRequests";
import { useParams } from "react-router-dom";

const Group: FC = () => {

  const { id } = useParams<{ id: string }>(); // Ensure param key matches your route

  const { data, isPending, isError, error } = useGetInfo(`/api/v1/groups/${id}`);
  const { mutate, isPending: sending, isError: sendingError, error: sendError } =
    usePostInfo(`/api/v1/groups/${id}`);

  // Optional: trigger POST action
  const handlePostSomething = () => {
    mutate({ someField: "someValue" });
  };

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

          <p><strong>Created:</strong> {new Date(group.createdAt).toLocaleString()}</p>
          <p><strong>Posts:</strong> {group.postsCount}</p>

          <h2>Members</h2>
          {group.members && group.members.length > 0 ? (
            <ul>
              {group.members.map((member:any) => (
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

          <button onClick={handlePostSomething} disabled={sending}>
            {sending ? "Sending…" : "Send something"}
          </button>
        </>
      )}
    </main>
  );
};

export default Group;
