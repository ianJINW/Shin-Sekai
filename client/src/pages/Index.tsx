import { useState } from "react";
import { Header } from "../components/layout/Header";
import { Sidebar } from "../components/layout/Sidebar";
import { Footer } from "../components/layout/Footer";
import { CreatePost } from "../components/posts/CreatePost";
import { PostCard } from "../components/posts/PostCard";
import { GroupCard } from "../components/groups/GroupCard";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Button } from "../components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "../components/ui/tabs";
import { getFeedPosts, currentUser, posts, users, groups } from "../lib/data";

const Index = () => {
  const [activeTab, setActiveTab] = useState<string>("for-you");
  const feedPosts = getFeedPosts();
  const recommendedGroups = groups.slice(0, 3);
  const popularUsers = users
    .filter((user) => user.id !== currentUser.id)
    .slice(0, 5);

  return (
    <div className="min-h-screen flex flex-col bg-muted/30">
      <Header />

      <div className="flex-1 flex">
        <Sidebar />

        <main className="flex-1 max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6 px-4 py-6">
          {/* Main Feed */}
          <div className="lg:col-span-3 space-y-4">
            <Tabs
              defaultValue="for-you"
              onValueChange={setActiveTab}
              className="w-full mb-2"
            >
              <TabsList className="w-full grid grid-cols-2">
                <TabsTrigger value="for-you">For You</TabsTrigger>
                <TabsTrigger value="following">Following</TabsTrigger>
              </TabsList>
            </Tabs>

            <CreatePost />

            {activeTab === "for-you" ? (
              feedPosts.map((post) => <PostCard key={post.id} post={post} />)
            ) : (
              <div className="animate-fade-in">
                {feedPosts
                  .filter((post) => currentUser.following.includes(post.userId))
                  .map((post) => (
                    <PostCard key={post.id} post={post} />
                  ))}

                {feedPosts.filter((post) =>
                  currentUser.following.includes(post.userId)
                ).length === 0 && (
                  <div className="text-center py-12 anime-card">
                    <h3 className="text-lg font-medium mb-2">
                      No posts from followed users
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Follow more users to see their posts here
                    </p>
                    <Button className="bg-anime-primary hover:bg-anime-primary/90">
                      Find Users to Follow
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="hidden lg:block space-y-6">
            {/* Recommended Groups */}
            <div className="anime-card p-4">
              <h3 className="font-medium mb-4">Recommended Groups</h3>
              <div className="space-y-3">
                {recommendedGroups.map((group) => (
                  <GroupCard key={group.id} group={group} />
                ))}
                <Button variant="outline" className="w-full">
                  View All Groups
                </Button>
              </div>
            </div>

            {/* Popular Users */}
            <div className="anime-card p-4">
              <h3 className="font-medium mb-4">Popular Users</h3>
              <div className="space-y-4">
                {popularUsers.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.avatar} alt={user.displayName} />
                        <AvatarFallback>
                          {user.displayName.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium leading-none">
                          {user.displayName}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          @{user.username}
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Follow
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {/* Trending Tags */}
            <div className="anime-card p-4">
              <h3 className="font-medium mb-4">Trending Tags</h3>
              <div className="flex flex-wrap gap-2">
                {[
                  "DemonSlayer",
                  "OnePiece",
                  "JujutsuKaisen",
                  "AttackOnTitan",
                  "SpyXFamily",
                  "Cosplay",
                  "FanArt",
                ].map((tag) => (
                  <div
                    key={tag}
                    className="bg-muted px-3 py-1 rounded-full text-xs hover:bg-muted/80 cursor-pointer"
                  >
                    #{tag}
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default Index;
