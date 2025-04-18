import { useState } from "react";
import { Header } from "../components/layout/Header";
import { Sidebar } from "../components/layout/Sidebar";
import { Footer } from "../components/layout/Footer";
import { GroupCard } from "../components/groups/GroupCard";
import { PostCard } from "../components/posts/PostCard";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "../components/ui/tabs";
import { groups, posts, users, getUserById, currentUser } from "../lib/data";

const Explore = () => {
  const [activeTab, setActiveTab] = useState("trending");
  const popularGroups = [...groups].sort(() => Math.random() - 0.5).slice(0, 6);
  const trendingPosts = [...posts].sort(() => Math.random() - 0.5).slice(0, 3);
  const suggestedUsers = users
    .filter((user) => user.id !== currentUser.id)
    .filter((user) => !currentUser.following.includes(user.id))
    .slice(0, 6);

  return (
    <div className="min-h-screen flex flex-col bg-muted/30">
      <Header />

      <div className="flex-1 flex">
        <Sidebar />

        <main className="flex-1 max-w-screen-xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold mb-6">Explore</h1>

          <Tabs defaultValue="trending" onValueChange={setActiveTab}>
            <TabsList className="w-full max-w-md grid grid-cols-3 mb-6">
              <TabsTrigger value="trending">Trending</TabsTrigger>
              <TabsTrigger value="groups">Groups</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
            </TabsList>

            {/* Trending Tab Content */}
            {activeTab === "trending" && (
              <div className="space-y-8 animate-fade-in">
                {/* Featured Content */}
                <div>
                  <h2 className="text-xl font-semibold mb-4">
                    Featured Content
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {trendingPosts.map((post) => (
                      <PostCard key={post.id} post={post} />
                    ))}
                  </div>
                </div>

                {/* Trending Tags */}
                <div>
                  <h2 className="text-xl font-semibold mb-4">Trending Tags</h2>
                  <div className="flex flex-wrap gap-3">
                    {[
                      "DemonSlayer",
                      "OnePiece",
                      "JujutsuKaisen",
                      "AttackOnTitan",
                      "SpyXFamily",
                      "Cosplay",
                      "FanArt",
                      "MangaSpoilers",
                      "NewAnime",
                      "WinterAnime2024",
                      "AnimeFigures",
                      "AnimeNews",
                    ].map((tag) => (
                      <div
                        key={tag}
                        className="bg-card px-4 py-2 rounded-lg text-sm hover:bg-muted cursor-pointer transition-colors"
                      >
                        #{tag}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Popular Groups */}
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Popular Groups</h2>
                    <Button variant="link" className="text-anime-primary">
                      See All
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {popularGroups.slice(0, 3).map((group) => (
                      <GroupCard key={group.id} group={group} />
                    ))}
                  </div>
                </div>

                {/* Suggested Users */}
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Suggested Users</h2>
                    <Button variant="link" className="text-anime-primary">
                      See All
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {suggestedUsers.slice(0, 3).map((user) => (
                      <div key={user.id} className="anime-card p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage
                              src={user.avatar}
                              alt={user.displayName}
                            />
                            <AvatarFallback>
                              {user.displayName.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{user.displayName}</p>
                            <p className="text-xs text-muted-foreground">
                              @{user.username}
                            </p>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                          {user.bio}
                        </p>
                        <Button className="w-full bg-anime-primary hover:bg-anime-primary/90">
                          Follow
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Groups Tab Content */}
            {activeTab === "groups" && (
              <div className="animate-fade-in">
                <div className="flex items-center gap-4 mb-6">
                  <Input
                    placeholder="Search for groups..."
                    className="max-w-md"
                  />
                  <Button className="bg-anime-primary hover:bg-anime-primary/90">
                    Create Group
                  </Button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {popularGroups.map((group) => (
                    <GroupCard key={group.id} group={group} />
                  ))}
                </div>
              </div>
            )}

            {/* Users Tab Content */}
            {activeTab === "users" && (
              <div className="animate-fade-in">
                <Input
                  placeholder="Search for users..."
                  className="max-w-md mb-6"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {suggestedUsers.map((user) => (
                    <div key={user.id} className="anime-card p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage
                            src={user.avatar}
                            alt={user.displayName}
                          />
                          <AvatarFallback>
                            {user.displayName.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{user.displayName}</p>
                          <p className="text-xs text-muted-foreground">
                            @{user.username}
                          </p>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                        {user.bio}
                      </p>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {user.favoriteAnime.slice(0, 2).map((anime) => (
                          <span
                            key={anime}
                            className="text-xs bg-muted px-2 py-1 rounded-full"
                          >
                            {anime}
                          </span>
                        ))}
                      </div>
                      <Button className="w-full bg-anime-primary hover:bg-anime-primary/90">
                        Follow
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Tabs>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default Explore;
