export interface UserProfile {
  id: string;
  name: string;
  headline: string;
  currentCompany: string;
  location: string;
  avatar: string;
  coverImage: string;
  connectionsCount: number;
  profileViews: number;
  postImpressions: number;
  searchAppearances: number;
  openToWork: boolean;
  skills: string[];
  bio: string;
}

export interface Recruiter {
  id: string;
  name: string;
  title: string;
  company: 'OpenAI' | 'Anthropic' | 'Google DeepMind' | 'Meta' | 'Nvidia' | 'Apple' | 'Stripe' | 'Sequoia';
  companyLogo: string;
  avatar: string;
  online: boolean;
  mutualConnections: number;
  initialOffer: string;
  personality: string;
}

export interface PostComment {
  id: string;
  author: string;
  headline: string;
  avatar: string;
  text: string;
  timestamp: string;
  likes: number;
  userLiked?: boolean;
}

export interface FeedPost {
  id: string;
  author: {
    name: string;
    headline: string;
    company?: string;
    avatar: string;
    isUser?: boolean;
    verified?: boolean;
  };
  timestamp: string;
  content: string;
  image?: string;
  metrics: {
    likes: number;
    comments: number;
    reposts: number;
  };
  userLiked: boolean;
  commentsList: PostComment[];
  tag?: string;
}

export interface ChatMessage {
  id: string;
  threadId: string;
  sender: 'user' | 'recruiter';
  text: string;
  timestamp: string;
  provider?: string;
  isOfferLetter?: boolean;
}

export interface ChatThread {
  id: string;
  recruiter: Recruiter;
  messages: ChatMessage[];
  unreadCount: number;
  lastMessageTimestamp: string;
}

export interface ConnectionRequest {
  id: string;
  recruiter: Recruiter;
  note: string;
  timestamp: string;
  status: 'pending' | 'accepted' | 'ignored';
}

export interface JobListing {
  id: string;
  title: string;
  company: string;
  companyLogo: string;
  location: string;
  salaryRange: string;
  workType: 'Remote' | 'Hybrid' | 'On-site';
  postedAgo: string;
  applicantsCount: number;
  description: string;
  perks: string[];
  fastTrackAvailable: boolean;
}

export interface OfferPackage {
  id: string;
  company: string;
  companyLogo: string;
  recruiterName: string;
  roleTitle: string;
  baseSalary: number;
  equityAnnual: number;
  signOnBonus: number;
  perks: string[];
  status: 'pending' | 'negotiating' | 'accepted' | 'declined';
  lastUpdated: string;
  recruiterNotes: string;
}

export interface NotificationItem {
  id: string;
  type: 'view' | 'endorse' | 'inmail' | 'offer' | 'trending' | 'like';
  title: string;
  subtitle: string;
  timestamp: string;
  avatar?: string;
  read: boolean;
  actionLabel?: string;
}

export interface FeatherlessConfig {
  apiKey: string;
  model: string;
  useFeatherless: boolean;
  hypeIntensity: 'mild' | 'frenzy' | 'meltdown';
  soundEnabled: boolean;
}
