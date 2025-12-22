import { useParams } from "react-router-dom";
import { usePostInfo } from "../lib/apiRequests";
import type { FC } from "react";
import useAuthStore from "../store/auth.store";
import { Button } from "flowbite-react";
import { toast } from "sonner";
import type { Member } from "../pages/group";

interface MembersProps {
  members: Member[];
}

const PopoverInfo: FC<MembersProps> = ({ members }) => {
  const { id } = useParams<{ id: string }>();
  const { mutate: joinMutate, isPending: joinPending, error: joinError } = usePostInfo(`/api/v1/groups/${id}/join`);
  const { mutate: leaveMutate, isPending: leavePending, error: leaveError } = usePostInfo(`/api/v1/groups/${id}/leave`);
  const user = useAuthStore((s) => s.user);

  const userId = user?.id;

  const memberId = (m: Member): string | undefined => {
    const u = (m as any).user;
    if (!u) return undefined;
    if (typeof u === "string") return u;
    return u._id ?? u.id ?? undefined;
  };

  const isMember = !!userId && members.some((m) => memberId(m) === userId);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userId) {
      toast.error("You are not logged in yet!");
      return;
    }

    if (!id) {
      toast.error("Group id is missing");
      return;
    }

    if (isMember) {
      toast.promise(leaveMutate({ userId }), {
        loading: "Leaving group...",
        success: "Left successfully!",
        error: `Leaving failed. ${String(leaveError ?? "")}`,
      });
    } else {
      toast.promise(joinMutate({ userId }), {
        loading: "Joining group...",
        success: "Joined successfully!",
        error: `Joining failed. ${String(joinError ?? "")}`,
      });
    }
  };

  const pending = joinPending || leavePending;

  return (
    <fieldset>
      <legend>{pending ? "Processing…" : isMember ? "Leave Group" : "Join Group"}</legend>

      <form className="flex flex-col gap-2 bg-cover bg-center p-8" onSubmit={handleSubmit}>
        <Button type="submit" disabled={pending}>
          {pending ? "Processing…" : isMember ? "Leave Group" : "Join Group"}
        </Button>
      </form>
    </fieldset>
  );
};

export default PopoverInfo;
