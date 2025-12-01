import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="bg-background border-t border-border py-6">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-sm font-medium mb-3">About</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/about"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/guidelines"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Community Guidelines
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-3">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/help"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  to="/safety"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Safety Center
                </Link>
              </li>
              <li>
                <Link
                  to="/developers"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Developers
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-3">Categories</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/category/anime"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Anime
                </Link>
              </li>
              <li>
                <Link
                  to="/category/manga"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Manga
                </Link>
              </li>
              <li>
                <Link
                  to="/category/cosplay"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Cosplay
                </Link>
              </li>
              <li>
                <Link
                  to="/category/fanart"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Fan Art
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-3">Connect</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Twitter
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Discord
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-anime-primary to-anime-accent flex items-center justify-center">
              <span className="text-white font-bold text-xs">A</span>
            </div>
            <span className="text-sm font-medium">AniVerse</span>
          </div>

          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} AniVerse Connect. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
