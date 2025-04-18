import { AuthForms } from "../../components/auth/AuthForms";
import { ThemeToggle } from "../../components/ui/theme-toggle";
import { Link } from "react-router-dom";

export default function Register() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background/80 to-background relative p-4">
      {/* Background overlay/effect */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-10 z-0"></div>
      
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      
      <div className="text-center mb-8 animate-fade-in relative z-10">
        <Link to="/landing">
          <h1 className="text-4xl font-bold anime-gradient-text">OtakuVerse</h1>
        </Link>
        <p className="text-muted-foreground mt-2">Join the anime community</p>
      </div>
      
      <div className="w-full max-w-md animate-fade-in relative z-10">
        <AuthForms />
      </div>
      
      <div className="mt-6 text-center text-sm text-muted-foreground relative z-10">
        <p>By creating an account, you agree to our <Link to="/terms" className="underline hover:text-foreground">Terms of Service</Link> and <Link to="/privacy" className="underline hover:text-foreground">Privacy Policy</Link>.</p>
      </div>
    </div>
  );
}