import { BookmarkCheckIcon, GroupIcon, HomeIcon, SettingsIcon, Tv2Icon } from "lucide-react";

const navLinks = [
  { to: "/", label: "Home", Icon: HomeIcon },
  { to: "/anime", label: "Animes", Icon: Tv2Icon },
  { to: "/groups", label: "Groups", Icon: GroupIcon },
  { to: "/settings", label: "Settings", Icon: SettingsIcon },
  { to: "/saved", label: "Saved", Icon: BookmarkCheckIcon },
];

export default navLinks