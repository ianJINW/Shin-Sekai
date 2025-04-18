import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-muted/30 px-4">
      <div className="text-center mb-8">
        <h1 className="text-6xl font-bold mb-4 anime-gradient-text">404</h1>
        <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
        <p className="text-muted-foreground max-w-md mx-auto mb-6">
          Oh no! It seems the page you're looking for has disappeared into
          another anime dimension.
        </p>
        <Button asChild className="bg-anime-primary hover:bg-anime-primary/90">
          <Link to="/">Return to Home</Link>
        </Button>
      </div>

      <div className="w-full max-w-lg">
        <img
          src="https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=640"
          alt="Anime Character Looking Confused"
          className="w-full h-auto rounded-lg shadow-lg animate-float"
        />
      </div>
    </div>
  );
};

export default NotFound;
