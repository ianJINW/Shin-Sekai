import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { Badge } from "../../components/ui/badge";
import { User, useUser } from "../../contexts/UserContext";
import { PostsList } from "../../components/posts/PostList";
import { AnimeList } from "../../components/anime/AnimeList";

interface UserProfileProps {
  profileUser?: User;
}

export function UserProfile({ profileUser }: UserProfileProps) {
  const { user: currentUser } = useUser();
  const user = profileUser || currentUser;

  if (!user) return <div>User not found</div>;

  const isOwnProfile = !profileUser || profileUser.id === currentUser?.id;

  return (
    <div className="container mx-auto py-6 px-4 md:px-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <Avatar className="h-24 w-24 md:h-32 md:w-32">
              <AvatarImage src={user.avatar} alt={user.displayName} />
              <AvatarFallback>{user.displayName?.charAt(0)}</AvatarFallback>
            </Avatar>

            <div className="flex-1 text-center md:text-left">
              <CardTitle className="text-2xl md:text-3xl">
                {user.displayName}
              </CardTitle>
              <CardDescription>@{user.username}</CardDescription>

              <div className="mt-4 flex flex-wrap gap-2 justify-center md:justify-start">
                {user.favoriteGenres?.map((genre) => (
                  <Badge
                    key={genre}
                    variant="outline"
                    className="bg-anime-primary/10 text-anime-primary"
                  >
                    {genre}
                  </Badge>
                ))}
              </div>

              <p className="mt-4 text-muted-foreground">{user.bio}</p>
            </div>

            <div className="flex flex-col gap-2">
              {!isOwnProfile && (
                <>
                  <Button
                    variant="default"
                    className="bg-anime-primary hover:bg-anime-primary/90"
                  >
                    Follow
                  </Button>
                  <Button variant="outline">Message</Button>
                </>
              )}
              {isOwnProfile && <Button variant="outline">Edit Profile</Button>}
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="flex justify-around text-center pt-4 border-t">
            <div>
              <p className="text-2xl font-bold">
                {user.following?.length || 0}
              </p>
              <p className="text-muted-foreground">Following</p>
            </div>
            <div>
              <p className="text-2xl font-bold">
                {user.followers?.length || 0}
              </p>
              <p className="text-muted-foreground">Followers</p>
            </div>
            <div>
              <p className="text-2xl font-bold">
                {user.favoriteAnime?.length || 0}
              </p>
              <p className="text-muted-foreground">Favorites</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="posts" className="mt-6">
        <TabsList className="w-full grid grid-cols-3">
          <TabsTrigger value="posts">Posts</TabsTrigger>
          <TabsTrigger value="anime">Favorite Anime</TabsTrigger>
          <TabsTrigger value="about">About</TabsTrigger>
        </TabsList>

        <TabsContent value="posts" className="mt-4">
          <PostsList userId={user.id} />
        </TabsContent>

        <TabsContent value="anime" className="mt-4">
          <AnimeList animeIds={user.favoriteAnime || []} />
        </TabsContent>

        <TabsContent value="about" className="mt-4">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold">Bio</h3>
                  <p className="text-muted-foreground">
                    {user.bio || "No bio provided."}
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold">Favorite Genres</h3>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {user.favoriteGenres?.map((genre) => (
                      <Badge key={genre} variant="outline">
                        {genre}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold">Top Anime</h3>
                  <ul className="list-disc list-inside text-muted-foreground">
                    {user.favoriteAnime?.map((anime) => (
                      <li key={anime}>{anime}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
