// Mock data for our anime social platform

// User types
export interface User {
  id: string;
  username: string;
  displayName: string;
  bio: string;
  avatar: string;
  coverImage: string;
  following: string[];
  followers: string[];
  joinedAt: string;
  favoriteAnime: string[];
  favoriteManga: string[];
}

// Post types
export interface Post {
  id: string;
  userId: string;
  content: string;
  images: string[];
  link?: string;
  hashtags: string[];
  createdAt: string;
  likes: number;
  comments: number;
  groupId?: string;
}

// Comment types
export interface Comment {
  id: string;
  postId: string;
  userId: string;
  content: string;
  createdAt: string;
  likes: number;
  replies?: Comment[];
}

// Group types
export interface Group {
  id: string;
  name: string;
  description: string;
  coverImage: string;
  members: string[];
  admins: string[];
  createdAt: string;
  category: string;
}

// Mock Users
export const users: User[] = [
  {
    id: "1",
    username: "sakura_bloom",
    displayName: "Sakura",
    bio: "Anime enthusiast and digital artist. I love creating fan art of my favorite series!",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256",
    coverImage:
      "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=1080",
    following: ["2", "3"],
    followers: ["2", "4", "5"],
    joinedAt: "2023-01-15",
    favoriteAnime: ["One Piece", "Demon Slayer", "Jujutsu Kaisen"],
    favoriteManga: ["Chainsaw Man", "Spy x Family"],
  },
  {
    id: "2",
    username: "ramen_sage",
    displayName: "Naruto Fan",
    bio: "Ramen lover and aspiring ninja. Believe it!",
    avatar:
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=256",
    coverImage:
      "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?q=80&w=1080",
    following: ["1", "3", "5"],
    followers: ["1", "3"],
    joinedAt: "2023-02-20",
    favoriteAnime: ["Naruto", "Boruto", "Attack on Titan"],
    favoriteManga: ["Naruto", "One Punch Man"],
  },
  {
    id: "3",
    username: "mecha_master",
    displayName: "Mecha Enthusiast",
    bio: "Obsessed with giant robots and sci-fi anime. Gundam is life!",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=256",
    coverImage:
      "https://images.unsplash.com/photo-1614729375293-d9a652add796?q=80&w=1080",
    following: ["1", "2", "4"],
    followers: ["1", "2", "5"],
    joinedAt: "2023-03-10",
    favoriteAnime: ["Gundam", "Evangelion", "Code Geass"],
    favoriteManga: ["Knights of Sidonia", "Blame!"],
  },
  {
    id: "4",
    username: "slice_of_life",
    displayName: "Peaceful Days",
    bio: "Finding beauty in everyday anime moments. Slice of life is my comfort genre.",
    avatar:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=256",
    coverImage:
      "https://images.unsplash.com/photo-1522441815192-d9f04eb0615c?q=80&w=1080",
    following: ["3", "5"],
    followers: ["3"],
    joinedAt: "2023-04-05",
    favoriteAnime: ["K-On!", "Laid-Back Camp", "Hyouka"],
    favoriteManga: ["Yotsuba&!", "Barakamon"],
  },
  {
    id: "5",
    username: "shonen_jump",
    displayName: "Shonen Fanatic",
    bio: "Power-ups, friendships, and epic battles! Classic shonen anime forever!",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=256",
    coverImage:
      "https://images.unsplash.com/photo-1560932684-5e552e2894e9?q=80&w=1080",
    following: ["1", "2", "4"],
    followers: ["2", "3", "4"],
    joinedAt: "2023-05-20",
    favoriteAnime: ["Dragon Ball", "Bleach", "Hunter x Hunter"],
    favoriteManga: ["My Hero Academia", "Black Clover"],
  },
];

// Mock Posts
export const posts: Post[] = [
  {
    id: "1",
    userId: "1",
    content:
      "Just finished the latest episode of Demon Slayer! The animation quality is absolutely incredible! #DemonSlayer #Animation",
    images: [
      "https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=640",
    ],
    hashtags: ["DemonSlayer", "Animation"],
    createdAt: "2024-04-16T10:30:00Z",
    likes: 154,
    comments: 32,
  },
  {
    id: "2",
    userId: "2",
    content:
      "Re-watching Naruto for the 5th time. The feels still hit just as hard! What's your favorite arc? #Naruto #Anime",
    images: [],
    hashtags: ["Naruto", "Anime"],
    createdAt: "2024-04-15T18:45:00Z",
    likes: 89,
    comments: 45,
    groupId: "1",
  },
  {
    id: "3",
    userId: "3",
    content:
      "Check out my Gundam model collection! Took me years to complete. Which one is your favorite? #Gundam #ModelKit",
    images: [
      "https://images.unsplash.com/photo-1601814933824-fd0b574dd592?q=80&w=640",
    ],
    hashtags: ["Gundam", "ModelKit"],
    createdAt: "2024-04-14T12:15:00Z",
    likes: 212,
    comments: 67,
  },
  {
    id: "4",
    userId: "4",
    content:
      "There's something so comforting about slice of life anime. Currently watching Laid-Back Camp and it's perfect for cozy evenings. #SliceOfLife #LaidBackCamp",
    images: [
      "https://images.unsplash.com/photo-1499346030926-9a72daac6c63?q=80&w=640",
    ],
    hashtags: ["SliceOfLife", "LaidBackCamp"],
    createdAt: "2024-04-13T20:30:00Z",
    likes: 76,
    comments: 23,
  },
  {
    id: "5",
    userId: "5",
    content:
      "Who else is hyped for the Dragon Ball Daima anime coming later this year? The character designs look amazing! #DragonBall #DragonBallDaima",
    images: [],
    link: "https://example.com/dragon-ball-daima-news",
    hashtags: ["DragonBall", "DragonBallDaima"],
    createdAt: "2024-04-12T15:20:00Z",
    likes: 187,
    comments: 54,
    groupId: "2",
  },
  {
    id: "6",
    userId: "1",
    content:
      "My latest fan art of Tanjiro from Demon Slayer! Let me know what you think! #FanArt #DemonSlayer #DigitalArt",
    images: [
      "https://images.unsplash.com/photo-1541532713592-79a0317b6b77?q=80&w=640",
    ],
    hashtags: ["FanArt", "DemonSlayer", "DigitalArt"],
    createdAt: "2024-04-11T09:10:00Z",
    likes: 231,
    comments: 89,
  },
  {
    id: "7",
    userId: "3",
    content:
      "Evangelion: both a masterpiece and completely confusing at the same time. Still trying to understand the ending after all these years! #Evangelion #AnimeClassics",
    images: [],
    hashtags: ["Evangelion", "AnimeClassics"],
    createdAt: "2024-04-10T14:25:00Z",
    likes: 134,
    comments: 76,
    groupId: "3",
  },
];

// Mock Comments
export const comments: Comment[] = [
  {
    id: "1",
    postId: "1",
    userId: "2",
    content:
      "The animation in Demon Slayer is on another level! Ufotable really outdid themselves.",
    createdAt: "2024-04-16T11:00:00Z",
    likes: 24,
  },
  {
    id: "2",
    postId: "1",
    userId: "3",
    content: "That fight scene was incredible! No spoilers, but wow!",
    createdAt: "2024-04-16T11:30:00Z",
    likes: 18,
  },
  {
    id: "3",
    postId: "2",
    userId: "1",
    content: "Pain arc will always be my favorite. So emotional!",
    createdAt: "2024-04-15T19:15:00Z",
    likes: 32,
  },
  {
    id: "4",
    postId: "3",
    userId: "5",
    content: "That red Gundam in the back looks amazing! Is that the Sazabi?",
    createdAt: "2024-04-14T13:00:00Z",
    likes: 9,
  },
  {
    id: "5",
    postId: "6",
    userId: "4",
    content:
      "Your art style is so beautiful! Love how you captured Tanjiro's determination.",
    createdAt: "2024-04-11T10:00:00Z",
    likes: 41,
  },
];

// Mock Groups
export const groups: Group[] = [
  {
    id: "1",
    name: "Naruto Universe",
    description: "Everything related to Naruto, Boruto, and the ninja world!",
    coverImage:
      "https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=1080",
    members: ["1", "2", "3", "5"],
    admins: ["2"],
    createdAt: "2023-02-25",
    category: "Anime Series",
  },
  {
    id: "2",
    name: "Dragon Ball Fans",
    description:
      "From the original Dragon Ball to Super and beyond! Discuss all things Dragon Ball here.",
    coverImage:
      "https://images.unsplash.com/photo-1541532713592-79a0317b6b77?q=80&w=1080",
    members: ["2", "3", "5"],
    admins: ["5"],
    createdAt: "2023-03-15",
    category: "Anime Series",
  },
  {
    id: "3",
    name: "Mecha & Sci-Fi Anime",
    description:
      "Giant robots, space adventures, and futuristic anime discussions!",
    coverImage:
      "https://images.unsplash.com/photo-1614729375293-d9a652add796?q=80&w=1080",
    members: ["1", "3", "4"],
    admins: ["3"],
    createdAt: "2023-04-10",
    category: "Genre",
  },
  {
    id: "4",
    name: "Anime Artists",
    description:
      "Share your anime & manga inspired artwork, get feedback, and find inspiration!",
    coverImage:
      "https://images.unsplash.com/photo-1621600411688-4be93c2c1208?q=80&w=1080",
    members: ["1", "4"],
    admins: ["1"],
    createdAt: "2023-05-05",
    category: "Creative",
  },
  {
    id: "5",
    name: "Seasonal Anime Watchers",
    description:
      "Discuss the latest seasonal anime! What are you watching this season?",
    coverImage:
      "https://images.unsplash.com/photo-1560932684-5e552e2894e9?q=80&w=1080",
    members: ["1", "2", "3", "4", "5"],
    admins: ["4"],
    createdAt: "2023-06-20",
    category: "Discussions",
  },
];

// Current user (for demo purposes)
export const currentUser: User = users[0];

// Helper function to get user by ID
export const getUserById = (id: string): User | undefined => {
  return users.find((user) => user.id === id);
};

// Helper function to get posts for feed
export const getFeedPosts = (): Post[] => {
  // In a real app, this would filter based on followed users and joined groups
  return [...posts].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
};

// Helper function to get posts by user ID
export const getPostsByUserId = (userId: string): Post[] => {
  return posts.filter((post) => post.userId === userId);
};

// Helper function to get posts by group ID
export const getPostsByGroupId = (groupId: string): Post[] => {
  return posts.filter((post) => post.groupId === groupId);
};

// Helper function to get comments by post ID
export const getCommentsByPostId = (postId: string): Comment[] => {
  return comments.filter((comment) => comment.postId === postId);
};

// Helper function to get group by ID
export const getGroupById = (id: string): Group | undefined => {
  return groups.find((group) => group.id === id);
};

// Helper function to format date
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return `${diffInSeconds}s ago`;
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes}m ago`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours}h ago`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) {
    return `${diffInDays}d ago`;
  }

  return date.toLocaleDateString();
};
