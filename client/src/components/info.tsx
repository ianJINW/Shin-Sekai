import { useEffect, type FC } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetInfo } from "../lib/apiRequests";
import PageSkeleton from "./ui/PageSkeleton";
import { toast } from "sonner";
import { UserIcon } from "lucide-react";
import { Popover, Button } from "flowbite-react";
import PopoverInfo from './popoverInfo';
import useAuthStore from "../store/auth.store";
import type { Member } from "../pages/group";

const Info: FC = () => {
  const { id } = useParams<{ id: string }>();
  const user = useAuthStore(s => s.user)
  const { data, isLoading, isError, error } = useGetInfo(
    `/api/v1/groups/${id}`
  );
  const navigate = useNavigate()
  const group = data?.group;

  // Toast notifications once
  useEffect(() => {
    if (isLoading) toast.info("Loading group info…");
    if (isError) toast.error(`Error: ${String(error)}`);
  }, [isLoading, isError, error]);

  if (isLoading) {
    return <PageSkeleton title="Loading Group..." count={1} />;
  }

  if (isError || !group) {
    return (
      <main className="flex items-center justify-center min-h-screen p-6 text-center text-red-500">
        <p>Unable to load group information.</p>
      </main>
    );
  }

  const userId = user?._id ?? user?.id
  const memberId = (m: Member): string | undefined => {
    const u = (m as any).user

    if (!u) return undefined; if (typeof u === "string") return u;

    return u._id ?? u.id ?? undefined
  }

  const isMember = !!userId && group.members.some((m) => memberId(m) === userId);

  return (
    <main
      className="min-h-screen bg-cover bg-center p-8"
      style={{
        backgroundImage: group.image
          ? `url(${group.image})`
          : `url('/default-group-bg.jpg')`,
      }}
    >
      <section className="bg-white bg-opacity-90 backdrop-blur-md rounded-xl p-8 max-w-4xl mx-auto shadow-lg">
        <header className="text-center mb-6">
          <h1 className="text-4xl font-bold text-gray-900">
            {group.name}
          </h1>
        </header>

        {group.image && (
          <div className="flex justify-center mb-6">
            <img onClick={() => navigate(`/groups/${id}`)}
              src={group.image}
              alt={group.name}
              className="w-48 h-48 object-cover rounded-full border-4 border-gray-200"
            />
          </div>
        )}

        <p className="text-lg text-gray-700 mb-6 text-center">
          {group.description}
        </p>

        <div className="space-y-4 flex flex-col justify-center items-center">
          <h2 className="text-2xl font-semibold text-gray-900 text-center">
            Members ({group.members.length})
          </h2>

          <ul className="gap-4 flex flex-col ">{console.log('members', group.members)}
            {group.members.map((m: any) => {
              const userObj = typeof m.user === "object" ? m.user : undefined;
              const key = userObj?._id ?? String(m.user);
              const name = userObj?.username ?? String(m.user);

              return (
                <li
                  key={key}
                  className="flex items-center justify-center gap-3 bg-gray-100  rounded-lg p-3 w-full"
                >
                  {userObj?.image ? (
                    <img
                      src={userObj.image}
                      alt={name}
                      className="w-14 h-14 object-cover rounded-full"
                    />
                  ) : (
                    <UserIcon className="w-14 h-14 text-gray-600" />
                  )}
                  <span className="font-medium text-gray-800">
                    {name}{" "}
                    <span className="text-sm text-gray-500">
                      ({m.role})
                    </span>
                  </span>
                </li>
              );
            })}
          </ul>

          <Popover content={<PopoverInfo members={group.members} />} >
            <Button className="" onClick={() => {

            }} > {isMember ? 'Leave group' : "Join group"}</Button>
          </Popover>

        </div>

        <footer className="mt-6 text-right text-sm text-gray-600">
          Posts: {group.postsCount}
        </footer>
      </section>
    </main>
  );
};

export default Info;
