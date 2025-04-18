import { Camera, MapPin, Calendar } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import { User, currentUser } from "../../lib/data";

interface ProfileHeaderProps {
  user: User;
}

export function ProfileHeader({ user }: ProfileHeaderProps) {
  const isCurrentUser = user.id === currentUser.id;
  const joinDate = new Date(user.joinedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
  });

  return (
    <div className="relative">
      {/* Cover Image */}
      <div className="h-40 md:h-60 relative overflow-hidden">
        <img
          src={user.coverImage}
          alt={`${user.displayName}'s cover`}
          className="w-full h-full object-cover"
        />

        {isCurrentUser && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-3 bottom-3 bg-background/80 hover:bg-background/90 rounded-full"
          >
            <Camera className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Profile Info */}
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end gap-4 -mt-12 md:-mt-16 mb-6">
          {/* Avatar */}
          <div className="relative">
            <Avatar className="h-24 w-24 md:h-32 md:w-32 border-4 border-background">
              <AvatarImage src={user.avatar} alt={user.displayName} />
              <AvatarFallback className="text-2xl">
                {user.displayName.charAt(0)}
              </AvatarFallback>
            </Avatar>

            {isCurrentUser && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-0 bottom-0 bg-background/80 hover:bg-background/90 rounded-full h-8 w-8"
              >
                <Camera className="h-4 w-4" />
              </Button>
            )}
          </div>

          <div className="flex-1">
            <h1 className="text-2xl font-bold">{user.displayName}</h1>
            <p className="text-muted-foreground">@{user.username}</p>
          </div>

          {isCurrentUser ? (
            <Button variant="outline">Edit Profile</Button>
          ) : (
            <Button className="bg-anime-primary hover:bg-anime-primary/90">
              Follow
            </Button>
          )}
        </div>

        {/* Bio & Stats */}
        <div className="mb-6">
          <p className="text-sm mb-4">{user.bio}</p>

          <div className="flex flex-wrap items-center text-sm text-muted-foreground gap-x-4 gap-y-2">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>Joined {joinDate}</span>
            </div>

            <div className="flex gap-4">
              <span>
                <span className="font-medium text-foreground">
                  {user.following.length}
                </span>{" "}
                Following
              </span>
              <span>
                <span className="font-medium text-foreground">
                  {user.followers.length}
                </span>{" "}
                Followers
              </span>
            </div>
          </div>
        </div>

        {/* Anime & Manga Favorites */}
        {(user.favoriteAnime.length > 0 || user.favoriteManga.length > 0) && (
          <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            {user.favoriteAnime.length > 0 && (
              <div className="border border-border rounded-lg p-4">
                <h3 className="text-sm font-medium mb-3">Favorite Anime</h3>
                <div className="flex flex-wrap gap-2">
                  {user.favoriteAnime.map((anime) => (
                    <div
                      key={anime}
                      className="bg-muted px-3 py-1 rounded-full text-xs"
                    >
                      {anime}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {user.favoriteManga.length > 0 && (
              <div className="border border-border rounded-lg p-4">
                <h3 className="text-sm font-medium mb-3">Favorite Manga</h3>
                <div className="flex flex-wrap gap-2">
                  {user.favoriteManga.map((manga) => (
                    <div
                      key={manga}
                      className="bg-muted px-3 py-1 rounded-full text-xs"
                    >
                      {manga}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
