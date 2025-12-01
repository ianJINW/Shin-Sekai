import { useState } from "react";
import { useParams } from "react-router-dom";
import { Header } from "../components/layout/Header";
import { Sidebar } from "../components/layout/Sidebar";
import { Footer } from "../components/layout/Footer";
import { ProfileHeader } from "../components/profile/ProfileHeader";
import { ProfileTabs } from "../components/profile/ProfileTabs";
import { getUserById, currentUser } from "../lib/data";

const Profile = () => {
  const { userId } = useParams<{ userId: string }>();
  // Use the user from URL params, or fall back to current user
  const profileUser = userId ? getUserById(userId) || currentUser : currentUser;

  return (
    <div className="min-h-screen flex flex-col bg-muted/30">
      <Header />

      <div className="flex-1 flex">
        <Sidebar />

        <main className="flex-1">
          <ProfileHeader user={profileUser} />
          <ProfileTabs user={profileUser} />
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default Profile;
