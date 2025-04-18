import { Button } from "../components/ui/button";
import { ThemeToggle } from "../components/ui/theme-toggle";
import { Star, Users, Film, MessageSquare } from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background/80 to-background relative overflow-hidden">
      {/* Background overlay/effect */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-10 z-0"></div>

      {/* Header */}
      <header className="container mx-auto px-4 py-6 flex justify-between items-center relative z-10 text-center">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold anime-gradient-text">
            Shin-Sekai
          </span>
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-anime-primary hover:bg-anime-primary/90 transition-all duration-300 shadow-lg shadow-anime-primary/20" onClick={() =>{
                window.location.href = "/register";
              }}
            >
              Sign Up
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-anime-primary/50 hover:bg-anime-primary/10 transition-all duration-300" onClick={() =>{
                window.location.href = "/login";}
              }
            >
              Sign In
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="container mx-auto px-4 pt-8 pb-24 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 mt-12">
          {/* Left Side - Content */}
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="anime-gradient-text">Shin-Sekai</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-4">
              Connect. Watch. Share. All things anime.
            </p>
            <p className="text-lg mb-8">
              Your ultimate destination for anime discussions, reviews, and
              connecting with fellow fans.
            </p>
          </div>

          {/* Right Side - Auth Forms */}
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16 relative z-10">
        <h2 className="text-3xl font-bold text-center mb-12">
          Why Join OtakuVerse?
        </h2>
        <div className="grid md:grid-cols-4 gap-8">
          <div className="anime-card p-6 flex flex-col items-center text-center">
            <div className="bg-anime-primary/10 p-3 rounded-full mb-4">
              <Film className="h-6 w-6 text-anime-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Discover Anime</h3>
            <p className="text-muted-foreground">
              Explore a vast collection of anime series and movies, with
              detailed information and reviews.
            </p>
          </div>
          <div className="anime-card p-6 flex flex-col items-center text-center">
            <div className="bg-anime-primary/10 p-3 rounded-full mb-4">
              <Users className="h-6 w-6 text-anime-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Join Communities</h3>
            <p className="text-muted-foreground">
              Connect with other fans, join discussion groups, and share your
              thoughts.
            </p>
          </div>
          <div className="anime-card p-6 flex flex-col items-center text-center">
            <div className="bg-anime-primary/10 p-3 rounded-full mb-4">
              <Star className="h-6 w-6 text-anime-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Track Favorites</h3>
            <p className="text-muted-foreground">
              Keep track of your favorite series, create watchlists, and get
              personalized recommendations.
            </p>
          </div>
          <div className="anime-card p-6 flex flex-col items-center text-center">
            <div className="bg-anime-primary/10 p-3 rounded-full mb-4">
              <MessageSquare className="h-6 w-6 text-anime-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Discuss Episodes</h3>
            <p className="text-muted-foreground">
              Share your reactions and theories with a community that loves
              anime as much as you do.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-16 text-center relative z-10 mb-12">
        <div className="anime-card p-12 max-w-3xl mx-auto bg-gradient-to-r from-anime-primary/20 to-anime-accent/20 border-anime-primary/30">
          <h2 className="text-3xl font-bold mb-4">Ready to dive in?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of anime fans today and become part of our growing
            community.
          </p>
          <Button
            size="lg"
            className="bg-anime-primary hover:bg-anime-primary/90"
          >
            Get Started Now
          </Button>
        </div>
      </div>
    </div>
  );
}
