import { useEffect, type FC } from "react";
import { useParams } from "react-router-dom";
import { useGetInfo } from "../lib/apiRequests";
import PageSkeleton from "./ui/PageSkeleton";
import { toast } from "sonner";

const Info: FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError, error } = useGetInfo(
    `/api/v1/groups/${id}`
  );
  console.log(id);

  const group = data?.group;
  console.log('group', group);

  // Show toast one time
  useEffect(() => {
    if (isLoading) toast.info("Loading group info. Just a moment.");
    if (isError) toast.error(`Error occurred: ${String(error)}`);
  }, [isLoading, isError, error]);

  if (isLoading) {
    return <PageSkeleton title="Group loading" count={1} />;
  }

  if (isError || !group) {
    return (
      <main className="p-4 text-center text-red-500">
        <p>Unable to load group information.</p>
      </main>
    );
  }

  return (
    <main
      className="min-h-screen bg-cover bg-center p-6"
      style={{
        backgroundImage: group.image
          ? `url(${group.image})`
          : `url('/default-group-bg.jpg')`,
      }}
    >
      <div className="bg-white bg-opacity-80 rounded-lg p-6 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900">
          {group.name}
        </h1>
        {group.image && (
          <img
            src={group.image}
            alt={group.name}
            className="w-48 h-48 object-cover rounded-full my-4"
          />
        )}

        <p className="text-gray-700">{group.description}</p>

        <div className="mt-4">
          <strong>Members ({group.members.length}):</strong>
          <ul className="list-disc list-inside">
            {group.members.map((m: any) => {
              const userObj = typeof m.user === "object" ? m.user : undefined;
              const key = userObj?._id ?? String(m.user);
              const name = userObj?.username ?? String(m.user);
              return <li key={key}>{name} ({m.role})</li>;
            })}
          </ul>
        </div>

        <p className="mt-2 text-sm text-gray-500">
          Posts: {group.postsCount}
        </p>
      </div>
    </main>
  );
};

export default Info;
