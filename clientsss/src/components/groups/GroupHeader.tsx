import { Users, Info, Calendar } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import { Tabs, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { Group, getUserById, currentUser } from "../../lib/data";

interface GroupHeaderProps {
  group: Group;
  activeTab: string;
  onTabChange: (value: string) => void;
}

export function GroupHeader({
  group,
  activeTab,
  onTabChange,
}: GroupHeaderProps) {
  const isAdmin = group.admins.includes(currentUser.id);
  const isMember = group.members.includes(currentUser.id);
  const adminUser = getUserById(group.admins[0]);

  return (
    <div className="relative">
      {/* Cover Image */}
      <div className="h-40 md:h-60 relative overflow-hidden">
        <img
          src={group.coverImage}
          alt={`${group.name} cover`}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Group Info */}
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end gap-4 -mt-6 mb-6">
          <div className="flex-1">
            <h1 className="text-2xl font-bold">{group.name}</h1>

            <div className="flex flex-wrap items-center text-sm text-muted-foreground gap-x-4 gap-y-2 mt-1">
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span>{group.members.length} members</span>
              </div>

              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>
                  Created {new Date(group.createdAt).toLocaleDateString()}
                </span>
              </div>

              <div className="flex items-center gap-1">
                <Info className="h-4 w-4" />
                <span>{group.category}</span>
              </div>
            </div>
          </div>

          {isAdmin ? (
            <Button variant="outline">Manage Group</Button>
          ) : isMember ? (
            <Button variant="outline">Joined</Button>
          ) : (
            <Button className="bg-anime-primary hover:bg-anime-primary/90">
              Join Group
            </Button>
          )}
        </div>

        {/* Group Description */}
        <div className="mb-6">
          <p className="text-sm">{group.description}</p>
        </div>

        {/* Admin Info */}
        {adminUser && (
          <div className="mb-6 flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src={adminUser.avatar} alt={adminUser.displayName} />
              <AvatarFallback>{adminUser.displayName.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-xs text-muted-foreground">Admin:</p>
              <p className="text-sm font-medium">
                {adminUser.displayName}{" "}
                <span className="text-muted-foreground font-normal">
                  @{adminUser.username}
                </span>
              </p>
            </div>
          </div>
        )}

        {/* Group Tabs */}
        <Tabs
          value={activeTab}
          onValueChange={onTabChange}
          className="w-full border-b border-border"
        >
          <TabsList className="w-full justify-start h-auto bg-transparent p-0">
            <TabsTrigger
              value="posts"
              className="data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:shadow-none rounded-none border-b-2 border-transparent data-[state=active]:border-anime-primary pt-2 pb-3 px-4"
            >
              Posts
            </TabsTrigger>
            <TabsTrigger
              value="media"
              className="data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:shadow-none rounded-none border-b-2 border-transparent data-[state=active]:border-anime-primary pt-2 pb-3 px-4"
            >
              Media
            </TabsTrigger>
            <TabsTrigger
              value="members"
              className="data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:shadow-none rounded-none border-b-2 border-transparent data-[state=active]:border-anime-primary pt-2 pb-3 px-4"
            >
              Members
            </TabsTrigger>
            <TabsTrigger
              value="about"
              className="data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:shadow-none rounded-none border-b-2 border-transparent data-[state=active]:border-anime-primary pt-2 pb-3 px-4"
            >
              About
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
}
