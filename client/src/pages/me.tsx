import { type FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/auth.store";
import { toast } from "sonner";
import Button from "../components/ui/button";

const Me: FC = () => {
  const navigate = useNavigate();
  const { user, isAuth, logout } = useAuthStore();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
      toast.error("You must be logged in to view your profile");
    }
  }, [isAuth, navigate]);

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/login");
  };

  if (!user) {
    return null; // or a Loading UI
  }

  return (
    <main className="max-w-lg mx-auto my-8 p-6 bg-bg-primary text-text border rounded shadow">
      <h1 className="text-2xl font-semibold text-primary mb-4">My Profile</h1>

      <div className="flex flex-col gap-4">
        {user.image && (
          <img
            src={user.image}
            alt={`${user.username}'s profile`}
            className="w-32 h-32 rounded-full object-cover mx-auto"
          />
        )}

        <div>
          <p className="font-medium text-lg">Username:</p>
          <p className="text-text-secondary">{user.username}</p>
        </div>

        <div>
          <p className="font-medium text-lg">Email:</p>
          <p className="text-text-secondary">{user.email}</p>
        </div>

        <Button
          variant="ghost"
          onClick={handleLogout}
          className="mt-4"
        >
          Logout
        </Button>
      </div>
    </main>
  );
};

export default Me;
