import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Compass,
  Users,
  Bookmark,
  Film,
  Award,
  User,
  Settings,
  LogOut,
} from "lucide-react";
import { cn } from "../../lib/utils";
import { currentUser, Group, groups } from "../../lib/data";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";

export function Sidebar() {
  const location = useLocation();
  const joinedGroups = groups
    .filter((group) => group.members.includes(currentUser.id))
    .slice(0, 5);

  const mainNavItems = [
    { icon: Home, label: "Home", path: "/" },
    { icon: Compass, label: "Explore", path: "/explore" },
    { icon: Users, label: "Groups", path: "/groups" },
    { icon: Film, label: "Anime", path: "/anime" },
    { icon: Bookmark, label: "Saved", path: "/saved" },
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 border-r border-border h-[calc(100vh-4rem)] sticky top-16 bg-background">
      <div className="flex-1 overflow-auto py-6 px-3">
        <nav className="space-y-6">
          <div className="space-y-1">
            {mainNavItems.map((item) => (
              <NavItem
                key={item.path}
                icon={item.icon}
                label={item.label}
                path={item.path}
                isActive={location.pathname === item.path}
              />
            ))}
          </div>

          {/* Your Groups Section */}
          <div>
            <h3 className="px-4 text-sm font-medium text-muted-foreground mb-2">
              YOUR GROUPS
            </h3>
            <div className="space-y-1">
              {joinedGroups.map((group) => (
                <GroupNavItem
                  key={group.id}
                  group={group}
                  isActive={location.pathname === `/groups/${group.id}`}
                />
              ))}
              <Link
                to="/groups"
                className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-muted transition-colors"
              >
                <div className="flex items-center justify-center w-6 h-6">
                  <span className="text-xs">+</span>
                </div>
                <span>View All Groups</span>
              </Link>
            </div>
          </div>
        </nav>
      </div>

      {/* User Section */}
      <div className="border-t border-border p-4">
        <Link
          to="/profile"
          className="flex items-center gap-3 rounded-md p-2 hover:bg-muted transition-colors"
        >
          <Avatar className="h-8 w-8">
            <AvatarImage
              src={currentUser.avatar}
              alt={currentUser.displayName}
            />
            <AvatarFallback>{currentUser.displayName.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1 overflow-hidden">
            <p className="text-sm font-medium leading-none truncate">
              {currentUser.displayName}
            </p>
            <p className="text-xs text-muted-foreground truncate">
              @{currentUser.username}
            </p>
          </div>
        </Link>
      </div>
    </aside>
  );
}

interface NavItemProps {
  icon: React.ElementType;
  label: string;
  path: string;
  isActive: boolean;
}

function NavItem({ icon: Icon, label, path, isActive }: NavItemProps) {
  return (
    <Link
      to={path}
      className={cn(
        "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
        isActive
          ? "bg-primary/10 text-anime-primary font-medium"
          : "text-foreground hover:bg-muted"
      )}
    >
      <Icon
        className={cn(
          "h-5 w-5",
          isActive ? "text-anime-primary" : "text-muted-foreground"
        )}
      />
      <span>{label}</span>
    </Link>
  );
}

interface GroupNavItemProps {
  group: Group;
  isActive: boolean;
}

function GroupNavItem({ group, isActive }: GroupNavItemProps) {
  return (
    <Link
      to={`/groups/${group.id}`}
      className={cn(
        "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
        isActive
          ? "bg-primary/10 text-anime-primary font-medium"
          : "text-foreground hover:bg-muted"
      )}
    >
      <div className="relative w-6 h-6 rounded-full overflow-hidden">
        <img
          src={group.coverImage}
          alt={group.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
      <span className="truncate">{group.name}</span>
    </Link>
  );
}
