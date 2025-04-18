import { useState } from "react";
import { Header } from "../../components/layout/Header";
import { Sidebar } from "../../components/layout/Sidebar";
import { Footer } from "../../components/layout/Footer";
import { GroupCard } from "../../components/groups/GroupCard";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { groups, currentUser } from "../../lib/data";

const Groups = () => {
  const [activeTab, setActiveTab] = useState("my-groups");
  const [searchQuery, setSearchQuery] = useState("");

  const myGroups = groups.filter((group) =>
    group.members.includes(currentUser.id)
  );
  const otherGroups = groups.filter(
    (group) => !group.members.includes(currentUser.id)
  );

  // Filter groups based on search query
  const filteredMyGroups = myGroups.filter(
    (group) =>
      group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      group.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredOtherGroups = otherGroups.filter(
    (group) =>
      group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      group.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col bg-muted/30">
      <Header />

      <div className="flex-1 flex">
        <Sidebar />

        <main className="flex-1 max-w-screen-xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <h1 className="text-3xl font-bold">Groups</h1>
            <div className="flex flex-col sm:flex-row gap-3">
              <Input
                placeholder="Search groups..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="min-w-[200px]"
              />
              <Button className="bg-anime-primary hover:bg-anime-primary/90">
                Create New Group
              </Button>
            </div>
          </div>

          <Tabs defaultValue="my-groups" onValueChange={setActiveTab}>
            <TabsList className="w-full max-w-md grid grid-cols-2 mb-6">
              <TabsTrigger value="my-groups">My Groups</TabsTrigger>
              <TabsTrigger value="discover">Discover</TabsTrigger>
            </TabsList>

            {/* My Groups Tab */}
            {activeTab === "my-groups" && (
              <div className="animate-fade-in">
                {filteredMyGroups.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredMyGroups.map((group) => (
                      <GroupCard key={group.id} group={group} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-10 anime-card">
                    {searchQuery ? (
                      <>
                        <h3 className="text-lg font-medium mb-2">
                          No matching groups found
                        </h3>
                        <p className="text-muted-foreground mb-4">
                          Try a different search term or check the discover tab
                        </p>
                      </>
                    ) : (
                      <>
                        <h3 className="text-lg font-medium mb-2">
                          You haven't joined any groups yet
                        </h3>
                        <p className="text-muted-foreground mb-4">
                          Join groups to connect with others who share your
                          interests
                        </p>
                        <Button
                          onClick={() => setActiveTab("discover")}
                          className="bg-anime-primary hover:bg-anime-primary/90"
                        >
                          Discover Groups
                        </Button>
                      </>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Discover Tab */}
            {activeTab === "discover" && (
              <div className="animate-fade-in">
                <h2 className="text-xl font-semibold mb-4">
                  Popular Categories
                </h2>
                <div className="flex flex-wrap gap-2 mb-6">
                  {[
                    "Anime Series",
                    "Manga",
                    "Genre",
                    "Creative",
                    "Discussions",
                    "News",
                  ].map((category) => (
                    <Button
                      key={category}
                      variant="outline"
                      className="rounded-full"
                    >
                      {category}
                    </Button>
                  ))}
                </div>

                {filteredOtherGroups.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredOtherGroups.map((group) => (
                      <GroupCard key={group.id} group={group} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-10 anime-card">
                    <h3 className="text-lg font-medium mb-2">
                      No matching groups found
                    </h3>
                    <p className="text-muted-foreground">
                      Try a different search term or create your own group
                    </p>
                  </div>
                )}
              </div>
            )}
          </Tabs>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default Groups;
