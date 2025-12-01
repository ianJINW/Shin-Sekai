import { useState } from "react";
import { Link } from "react-router-dom";
import { UsersRound } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import { Group, getUserById, currentUser } from "../../lib/data";

interface GroupCardProps {
  group: Group;
}

export function GroupCard({ group }: GroupCardProps) {
  const [isJoined, setIsJoined] = useState(
    group.members.includes(currentUser.id)
  );
  const adminUser = getUserById(group.admins[0]);

  const handleJoinToggle = () => {
    setIsJoined(!isJoined);
  };

  return (
    <div className="anime-card overflow-hidden">
      {/* Cover Image */}
      <div className="h-36 overflow-hidden">
        <img
          src={group.coverImage}
          alt={group.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Group Info */}
      <div className="p-4">
        <Link to={`/groups/${group.id}`} className="group">
          <h3 className="font-semibold text-lg group-hover:text-anime-primary transition-colors">
            {group.name}
          </h3>
        </Link>

        <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1 mb-2">
          <UsersRound className="h-3 w-3" />
          <span>{group.members.length} members</span>
          <span className="mx-1">•</span>
          <span>{group.category}</span>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
          {group.description}
        </p>

        {/* Admin Info & Join Button */}
        <div className="flex items-center justify-between">
          {adminUser && (
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarImage
                  src={adminUser.avatar}
                  alt={adminUser.displayName}
                />
                <AvatarFallback>
                  {adminUser.displayName.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="text-xs">
                <span className="text-muted-foreground">Admin: </span>
                <span className="font-medium">{adminUser.displayName}</span>
              </div>
            </div>
          )}

          <Button
            variant={isJoined ? "outline" : "default"}
            size="sm"
            onClick={handleJoinToggle}
            className={
              isJoined ? "" : "bg-anime-primary hover:bg-anime-primary/90"
            }
          >
            {isJoined ? "Joined" : "Join"}
          </Button>
        </div>
      </div>
    </div>
  );
}
