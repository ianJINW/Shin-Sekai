import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../../components/ui/tabs";
import { PostCard } from "../../components/posts/PostCard";
import { Post, User, getPostsByUserId } from "../../lib/data";

interface ProfileTabsProps {
  user: User;
}

export function ProfileTabs({ user }: ProfileTabsProps) {
  const [activeTab, setActiveTab] = useState("posts");
  const userPosts = getPostsByUserId(user.id);

  return (
    <div className="max-w-4xl mx-auto px-4 pb-10">
      <Tabs defaultValue="posts" onValueChange={setActiveTab}>
        <TabsList className="w-full grid grid-cols-3 mb-6">
          <TabsTrigger value="posts">Posts</TabsTrigger>
          <TabsTrigger value="media">Media</TabsTrigger>
          <TabsTrigger value="about">About</TabsTrigger>
        </TabsList>

        <TabsContent value="posts" className="space-y-4">
          {userPosts.length > 0 ? (
            userPosts.map((post) => <PostCard key={post.id} post={post} />)
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No posts yet</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="media">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {userPosts
              .filter((post) => post.images.length > 0)
              .flatMap((post) =>
                post.images.map((image, imageIndex) => ({
                  id: `${post.id}-${imageIndex}`,
                  src: image,
                  alt: `Posted by ${user.displayName}`,
                }))
              )
              .map((image) => (
                <div
                  key={image.id}
                  className="aspect-square rounded-lg overflow-hidden"
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}

            {userPosts.filter((post) => post.images.length > 0).length ===
              0 && (
              <div className="col-span-full text-center py-8">
                <p className="text-muted-foreground">No media posts yet</p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="about">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-3">
                About {user.displayName}
              </h3>
              <p className="text-muted-foreground">{user.bio}</p>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">Favorite Anime</h3>
              {user.favoriteAnime.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {user.favoriteAnime.map((anime) => (
                    <div
                      key={anime}
                      className="bg-muted px-3 py-1 rounded-full text-sm"
                    >
                      {anime}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">
                  No favorite anime added yet
                </p>
              )}
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">Favorite Manga</h3>
              {user.favoriteManga.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {user.favoriteManga.map((manga) => (
                    <div
                      key={manga}
                      className="bg-muted px-3 py-1 rounded-full text-sm"
                    >
                      {manga}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">
                  No favorite manga added yet
                </p>
              )}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
