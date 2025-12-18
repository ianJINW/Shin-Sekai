import { BookmarkCheckIcon, GroupIcon, HomeIcon, SettingsIcon, Tv2Icon } from "lucide-react";

const navLinks = [
  { to: "/", label: "Home", Icon: HomeIcon },
  { to: "/anime", label: "Animes", Icon: Tv2Icon },
  { to: "/groups", label: "Groups", Icon: GroupIcon },
  { to: "/settings", label: "Settings", Icon: SettingsIcon },
  { to: "/saved", label: "Saved", Icon: BookmarkCheckIcon },
];

export const animePhrases = {

  // ---- Time‑Based Greetings ----
  greetings: [
    { key: "morningFormal", phrase: "Ohayou gozaimasu", meaning: "Good morning (formal)" },
    { key: "morningCasual", phrase: "Ohayou", meaning: "Good morning (casual)" },
    { key: "afternoon", phrase: "Konnichiwa", meaning: "Hello / Good afternoon" },
    { key: "evening", phrase: "Konbanwa", meaning: "Good evening" },
    { key: "goodnightFormal", phrase: "Oyasumi nasai", meaning: "Good night (formal)" },
    { key: "goodnightCasual", phrase: "Oyasumi", meaning: "Good night (casual)" },
    { key: "goodbyeFormal", phrase: "Sayounara", meaning: "Goodbye (formal)" },
    { key: "seeYouLater", phrase: "Mata ne", meaning: "See you later (casual)" },
  ],

  // ---- Everyday Anime Expressions ----
  expressions: [
    { phrase: "Nani?!", meaning: "What?!" },      // surprised reaction :contentReference[oaicite:1]{index=1}
    { phrase: "Baka!", meaning: "Idiot!" },       // playful insult :contentReference[oaicite:2]{index=2}
    { phrase: "Sugoi!", meaning: "Amazing!" },    // excitement :contentReference[oaicite:3]{index=3}
    { phrase: "Kawaii!", meaning: "Cute!" },      // cute reaction :contentReference[oaicite:4]{index=4}
    { phrase: "Ganbatte!", meaning: "Do your best!" }, // encouragement :contentReference[oaicite:5]{index=5}
    { phrase: "Moshi moshi", meaning: "Hello (on phone)" }, // phone greeting :contentReference[oaicite:6]{index=6}
    { phrase: "Onegaishimasu", meaning: "Please" }, // polite request :contentReference[oaicite:7]{index=7}
    { phrase: "Arigatou", meaning: "Thank you" },   // gratitude :contentReference[oaicite:8]{index=8}
    { phrase: "Gomen nasai", meaning: "I’m sorry" }, // apology :contentReference[oaicite:9]{index=9}
    { phrase: "Sumimasen", meaning: "Excuse me" },   // get attention :contentReference[oaicite:10]{index=10}
  ],

  // ---- Iconic Anime Catchphrases ----
  iconic: [
    // One Piece
    { phrase: "Ore wa kaizoku ou ni naru!", meaning: "I’m gonna be the Pirate King!" },

    // Demon Slayer
    { phrase: "Kokoro o moyase!", meaning: "Set your heart ablaze!" },
    { phrase: "Daijoubu?", meaning: "Are you okay?" },

    // Black Clover
    { phrase: "Akiramenai no ga ore no mahou da!", meaning: "Never giving up is my magic!" },

    // Jujutsu Kaisen
    { phrase: "Tenchi zenbu ni ore hitori eiyuu nari.", meaning: "Throughout heaven and earth, I alone am honored!" },

    // Bleach
    { phrase: "Bankai!", meaning: "Unleash your Bankai!" },

    // General Anime Culture
    { phrase: "Plus Ultra!", meaning: "Go beyond ultra!" },     // widely recognized catchphrase
    { phrase: "Yare yare daze...", meaning: "Good grief..." }, // chill/exasperation
    { phrase: "Tuturu~!", meaning: "Tuturu~!" },               // anime meme greeting (Steins;Gate style)
    { phrase: "Waku waku!", meaning: "So exciting!" },         // hype/joy reaction
  ],

  // ---- Friendly & Fandom‑ish Tags ----
  tags: [
    "Otaku Elite",          // fandom identity :contentReference[oaicite:11]{index=11}
    "Sugoi Supporter",
    "Plus Ultra Pioneer",
    "Kawaii Collector",
    "Senpai Recognized",
    "Nakama Friend",
    "Gomu Gomu Spirit",     // nod to One Piece
    "Hashira Heart",        // nod to Demon Slayer hierarchy
    "Spellbreaker",         // shonen trope
  ],

};

export default navLinks

export const getTimedGreetings = () => {
  const hour = new Date().getHours()

  if (hour < 12) return animePhrases.greetings.find(g => g.key === 'morningCasual')

  if (hour < 182) return animePhrases.greetings.find(g => g.key === 'afternoon')

  return animePhrases.greetings.find(g => g.key === 'evening')
}