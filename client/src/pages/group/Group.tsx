import { useState } from "react";
import { useParams } from "react-router-dom";
import { Header } from "../../components/layout/Header";
import { Sidebar } from "../../components/layout/Sidebar";
import { Footer } from "../../components/layout/Footer";
import { GroupHeader } from "../../components/groups/GroupHeader";
import { PostCard } from "../../components/posts/PostCard";
import { CreatePost } from "../../components/posts/CreatePost";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import { Button } from "../../components/ui/button";
import { getGroupById, getPostsByGroupId, getUserById } from "../../lib/data";

const Group = () => {
  const { groupId } = useParams<{ groupId: string }>();
  const [activeTab, setActiveTab] = useState("posts");

  // Get group or show not found
  const group = groupId ? getGroupById(groupId) : undefined;

  if (!group) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-muted/30">
        <h1 className="text-2xl font-bold mb-2">Group Not Found</h1>
        <p className="text-muted-foreground mb-4">
          The group you're looking for doesn't exist or has been removed.
        </p>
        <Button asChild>
          <a href="/">Return Home</a>
        </Button>
      </div>
    );
  }

  const groupPosts = getPostsByGroupId(groupId);
  const groupMembers = group.members
    .map((memberId) => getUserById(memberId))
    .filter(Boolean);
  const groupAdmins = group.admins
    .map((adminId) => getUserById(adminId))
    .filter(Boolean);

  return (
    <div className="min-h-screen flex flex-col bg-muted/30">
      <Header />

      <div className="flex-1 flex">
        <Sidebar />

        <main className="flex-1">
          <GroupHeader
            group={group}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />

          <div className="max-w-4xl mx-auto px-4 py-6">
            {activeTab === "posts" && (
              <div className="space-y-4">
                <CreatePost />

                {groupPosts.length > 0 ? (
                  groupPosts.map((post) => (
                    <PostCard key={post.id} post={post} />
                  ))
                ) : (
                  <div className="text-center py-8 anime-card">
                    <p className="text-muted-foreground mb-4">
                      No posts in this group yet. Be the first to post!
                    </p>
                  </div>
                )}
              </div>
            )}

            {activeTab === "media" && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {groupPosts
                  .filter((post) => post.images.length > 0)
                  .flatMap((post) =>
                    post.images.map((image, imageIndex) => ({
                      id: `${post.id}-${imageIndex}`,
                      src: image,
                      postId: post.id,
                    }))
                  )
                  .map((image) => (
                    <div
                      key={image.id}
                      className="aspect-square rounded-lg overflow-hidden"
                    >
                      <img
                        src={image.src}
                        alt={`Group post`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}

                {groupPosts.filter((post) => post.images.length > 0).length ===
                  0 && (
                  <div className="col-span-full text-center py-8">
                    <p className="text-muted-foreground">
                      No media posts in this group yet
                    </p>
                  </div>
                )}
              </div>
            )}

            {activeTab === "members" && (
              <div className="space-y-6">
                {/* Admins Section */}
                <div>
                  <h3 className="text-lg font-medium mb-3">
                    Admins ({groupAdmins.length})
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {groupAdmins.map((admin) => (
                      <div
                        key={admin.id}
                        className="flex items-center gap-3 p-3 border border-border rounded-lg"
                      >
                        <Avatar className="h-10 w-10">
                          <AvatarImage
                            src={admin.avatar}
                            alt={admin.displayName}
                          />
                          <AvatarFallback>
                            {admin.displayName.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate">
                            {admin.displayName}
                          </p>
                          <p className="text-xs text-muted-foreground truncate">
                            @{admin.username}
                          </p>
                        </div>
                        <div className="bg-muted text-xs px-2 py-1 rounded-full">
                          Admin
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Members Section */}
                <div>
                  <h3 className="text-lg font-medium mb-3">
                    Members ({groupMembers.length})
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {groupMembers
                      .filter((member) => !group.admins.includes(member.id))
                      .map((member) => (
                        <div
                          key={member.id}
                          className="flex items-center gap-3 p-3 border border-border rounded-lg"
                        >
                          <Avatar className="h-10 w-10">
                            <AvatarImage
                              src={member.avatar}
                              alt={member.displayName}
                            />
                            <AvatarFallback>
                              {member.displayName.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm truncate">
                              {member.displayName}
                            </p>
                            <p className="text-xs text-muted-foreground truncate">
                              @{member.username}
                            </p>
                          </div>
                          <Button variant="ghost" size="sm">
                            Follow
                          </Button>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "about" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-3">
                    About {group.name}
                  </h3>
                  <p className="text-muted-foreground">{group.description}</p>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3">Group Info</h3>
                  <div className="space-y-2">
                    <p className="text-sm">
                      <span className="font-medium">Category:</span>{" "}
                      {group.category}
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">Created:</span>{" "}
                      {new Date(group.createdAt).toLocaleDateString()}
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">Total Members:</span>{" "}
                      {group.members.length}
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3">Group Rules</h3>
                  <ol className="list-decimal pl-5 space-y-2">
                    <li className="text-sm">Be respectful to all members</li>
                    <li className="text-sm">
                      Post content relevant to the group topic
                    </li>
                    <li className="text-sm">
                      No spam or self-promotion without approval
                    </li>
                    <li className="text-sm">
                      Use appropriate language and content
                    </li>
                    <li className="text-sm">
                      Report any inappropriate behavior to admins
                    </li>
                  </ol>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default Group;
