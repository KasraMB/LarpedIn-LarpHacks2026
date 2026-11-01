import { UserProfile, Recruiter, FeedPost, ChatThread, ConnectionRequest, JobListing, OfferPackage, NotificationItem } from '../types';

export const initialUserProfile: UserProfile = {
  id: 'user_main',
  name: 'Alex Rivera',
  headline: 'Staff Principal Distributed Systems & AI Infrastructure Architect · Ex-FAANG · Open to 7-Figure Challenges',
  currentCompany: 'Self-Employed / Independent Advisor',
  location: 'San Francisco Bay Area · Worldwide Remote',
  avatar: '/src/assets/images/avatar_user_1793573726993.jpg',
  coverImage: '/src/assets/images/hero_office_banner_1793573728449.jpg',
  connectionsCount: 2841,
  profileViews: 14290,
  postImpressions: 184500,
  searchAppearances: 9420,
  openToWork: true,
  skills: [
    'Distributed Systems',
    'High-Throughput CUDA Kernels',
    'Massive Cluster Architecture',
    'Low-Latency Consensus (Raft/Paxos)',
    'GPU Cluster Orchestration',
    'System Design',
    'Scalable Infrastructure'
  ],
  bio: 'Specialist in scaling mission-critical ML compute clusters from 10k to 100k GPUs with zero packet loss. Architected distributed storage pipelines handling 25 TB/s throughput. Currently enjoying being aggressively recruited by every executive board in tech.'
};

export const recruitersList: Recruiter[] = [
  {
    id: 'rec_openai',
    name: 'Sarah Chen',
    title: 'Staff Technical Recruiter, Executive Talent',
    company: 'OpenAI',
    companyLogo: '🤖',
    avatar: '/src/assets/images/avatar_recruiter_openai_1793573727585.jpg',
    online: true,
    mutualConnections: 312,
    initialOffer: '$1,200,000 TC ($500k base + $700k equity)',
    personality: 'Hyper-fast, tech-fluent, desperate to secure you before Anthropic or DeepMind does'
  },
  {
    id: 'rec_anthropic',
    name: 'Marcus Vance',
    title: 'Executive Talent Acquisition Partner',
    company: 'Anthropic',
    companyLogo: '⚡',
    avatar: '/src/assets/images/avatar_recruiter_anthropic_1793573728191.jpg',
    online: true,
    mutualConnections: 248,
    initialOffer: '$1,050,000 TC ($480k base + $570k equity)',
    personality: 'Principled, safety-first but willing to spend unlimited budget to win you over'
  },
  {
    id: 'rec_deepmind',
    name: 'Dr. Elena Rostova',
    title: 'Director of Systems & AI Recruiting',
    company: 'Google DeepMind',
    companyLogo: '🧠',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    online: true,
    mutualConnections: 419,
    initialOffer: '$1,150,000 TC (L8 Distinguished Fellow)',
    personality: 'Academic powerhouse recruiter backed by Sundar Pichai’s office'
  },
  {
    id: 'rec_meta',
    name: 'David Sterling',
    title: 'Principal Technical Headhunter',
    company: 'Meta',
    companyLogo: '♾️',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    online: false,
    mutualConnections: 187,
    initialOffer: '$980,000 TC (E8 Principal Architect)',
    personality: 'Aggressive closer offering instant sign-on bonuses and custom hardware allowances'
  },
  {
    id: 'rec_nvidia',
    name: 'Trevor Belmont',
    title: 'Senior Executive Recruiter',
    company: 'Nvidia',
    companyLogo: '🟢',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    online: true,
    mutualConnections: 350,
    initialOffer: '$1,300,000 TC + 500 Unvested Stock Units',
    personality: 'Jensen Huang’s direct talent scout, promises personal Blackwell GPU access'
  },
  {
    id: 'rec_stripe',
    name: 'Chloe Dupont',
    title: 'VP of Global Engineering Staffing',
    company: 'Stripe',
    companyLogo: '💳',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    online: true,
    mutualConnections: 165,
    initialOffer: '$890,000 TC + Remote from anywhere',
    personality: 'Elegant, ultra-high engineering bar, appeals to elegance of distributed payments'
  }
];

export const initialPosts: FeedPost[] = [
  {
    id: 'post_1',
    author: {
      name: 'Jensen Huang',
      headline: 'Founder & CEO at NVIDIA',
      company: 'Nvidia',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80',
      verified: true
    },
    timestamp: '2h · Edited',
    content: `Rarely do I make a public LinkedIn post spotlighting a single engineer, but the distributed CUDA orchestration benchmarks Alex Rivera demonstrated this week are frankly unprecedented. 

Scaling tensor parallelism across 64,000 GPUs without communication stalls is usually considered impossible. Alex solved it over a weekend in Rust. 

Alex, our Santa Clara headquarters has a corner office with a leather jacket in your size waiting. Our board has pre-approved whatever package your agent requests. Let’s talk.`,
    metrics: {
      likes: 24890,
      comments: 1842,
      reposts: 954
    },
    userLiked: true,
    commentsList: [
      {
        id: 'c1',
        author: 'Sarah Chen',
        headline: 'Staff Technical Recruiter @ OpenAI',
        avatar: '/src/assets/images/avatar_recruiter_openai_1793573727585.jpg',
        text: 'Jensen, respectfully, OpenAI was first in line! Alex, our InMail was sent this morning with a signed offer term sheet. Check your messages! 🚀',
        timestamp: '1h ago',
        likes: 642
      },
      {
        id: 'c2',
        author: 'Marcus Vance',
        headline: 'Executive Talent Partner @ Anthropic',
        avatar: '/src/assets/images/avatar_recruiter_anthropic_1793573728191.jpg',
        text: 'Both of you are too late. Dario already drafted an unannounced Foundation Model cluster lead role for Alex with unlimited compute credits.',
        timestamp: '45m ago',
        likes: 418
      }
    ],
    tag: '#SystemsEngineering #AIInfrastructure'
  },
  {
    id: 'post_2',
    author: {
      name: 'Sarah Chen',
      headline: 'Staff Technical Recruiter, Executive Talent at OpenAI',
      company: 'OpenAI',
      avatar: '/src/assets/images/avatar_recruiter_openai_1793573727585.jpg',
      verified: true
    },
    timestamp: '5h',
    content: `Confession of a Big Tech recruiter:

I’ve had Alex Rivera's LinkedIn profile bookmarked on my second monitor for three weeks. Every morning at 8:00 AM PST, our VP of Supercomputing pings me: "Did Alex reply to the InMail yet?"

Alex, if you see this, we will literally:
1. Waive all coding screens.
2. Grant you full architectural authority over our next training cluster.
3. Pay you more than our Chief Strategy Officer.
4. Send our private shuttle to pick up your dog.

Please check your DMs! 😭🙏`,
    metrics: {
      likes: 18230,
      comments: 2110,
      reposts: 840
    },
    userLiked: false,
    commentsList: [
      {
        id: 'c3',
        author: 'David Sterling',
        headline: 'Principal Recruiter @ Meta',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
        text: 'Sarah, stop begging in the comments. Zuck already sent Alex an Oculus Quest prototype with the offer letter pre-loaded in VR.',
        timestamp: '3h ago',
        likes: 890
      }
    ],
    tag: '#Recruiting #AIWarForTalent'
  },
  {
    id: 'post_3',
    author: {
      name: 'TechCrunch Silicon Valley',
      headline: 'The Voice of Venture Capital & Tech Giants',
      avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80',
      verified: true
    },
    timestamp: '1d',
    content: `BREAKING: Inside the 8-way bidding war for Staff Architect Alex Rivera. 

Sources close to Google DeepMind, OpenAI, and NVIDIA confirm that executive compensation packages for top-tier distributed systems architects have officially crossed $1.4M annually, with signing bonuses comparable to NBA draft picks.

"There are perhaps four humans on Earth who truly understand how to eliminate micro-stragglers in distributed training clusters," remarked one prominent Sequoia Partner. "Alex is three of them."`,
    metrics: {
      likes: 31250,
      comments: 3410,
      reposts: 1920
    },
    userLiked: true,
    commentsList: [
      {
        id: 'c4',
        author: 'Dr. Elena Rostova',
        headline: 'Director of Recruiting @ DeepMind',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
        text: 'Accurate reporting. We have an open requisition tailored specifically around Alex’s published research. Mountain View is waiting.',
        timestamp: '18h ago',
        likes: 512
      }
    ],
    tag: '#TechNews #EngineeringCompensation'
  }
];

export const initialChatThreads: ChatThread[] = [
  {
    id: 'thread_openai',
    recruiter: recruitersList[0],
    unreadCount: 3,
    lastMessageTimestamp: '10m ago',
    messages: [
      {
        id: 'm1',
        threadId: 'thread_openai',
        sender: 'recruiter',
        text: 'Alex! I know you are bombarded with messages right now, so I will cut straight through the noise.',
        timestamp: 'Yesterday, 4:15 PM'
      },
      {
        id: 'm2',
        threadId: 'thread_openai',
        sender: 'recruiter',
        text: 'Our VP of Engineering specifically instructed me to bring you in as Principal Infrastructure Lead. We are preparing a $1.2M total comp package ($500k cash base + $700k liquid equity), fully remote with zero interview loops—just an informal lunch with Sam Altman.',
        timestamp: 'Yesterday, 4:16 PM'
      },
      {
        id: 'm3',
        threadId: 'thread_openai',
        sender: 'recruiter',
        text: 'Can we hold 15 minutes on your calendar tomorrow? We can wire your sign-on bonus the moment you sign the doc.',
        timestamp: '10m ago'
      }
    ]
  },
  {
    id: 'thread_anthropic',
    recruiter: recruitersList[1],
    unreadCount: 2,
    lastMessageTimestamp: '42m ago',
    messages: [
      {
        id: 'm4',
        threadId: 'thread_anthropic',
        sender: 'recruiter',
        text: 'Hello Alex! Marcus here from Anthropic. Dario and the research staff have been citing your multi-cluster paper in our weekly alignment reviews.',
        timestamp: '2h ago'
      },
      {
        id: 'm5',
        threadId: 'thread_anthropic',
        sender: 'recruiter',
        text: 'We are creating a dedicated Systems Fellowship role with your name on it. Starting at $1,050,000 TC + dedicated cluster of 16,000 H100s for your own independent experiments. What would it take to get you on a call today?',
        timestamp: '42m ago'
      }
    ]
  },
  {
    id: 'thread_deepmind',
    recruiter: recruitersList[2],
    unreadCount: 1,
    lastMessageTimestamp: '1h ago',
    messages: [
      {
        id: 'm6',
        threadId: 'thread_deepmind',
        sender: 'recruiter',
        text: 'Alex, Sundar and Demis asked me to reach out directly. We have an unannounced L8 Distinguished Fellow position on our Gemini Next infrastructure. We are prepared to match any counteroffer plus 20% guaranteed.',
        timestamp: '1h ago'
      }
    ]
  },
  {
    id: 'thread_nvidia',
    recruiter: recruitersList[4],
    unreadCount: 1,
    lastMessageTimestamp: '3h ago',
    messages: [
      {
        id: 'm7',
        threadId: 'thread_nvidia',
        sender: 'recruiter',
        text: 'Alex, Jensen asked about you again in our executive sync. He literally said: "Give Alex whatever they want, and ship a personal DGX Spark workstation to their house tomorrow." Name your terms!',
        timestamp: '3h ago'
      }
    ]
  }
];

export const initialConnectionRequests: ConnectionRequest[] = [
  {
    id: 'conn_1',
    recruiter: recruitersList[0],
    note: 'Alex, please accept! Our entire leadership team has your profile open in a war room right now. We need you on our infrastructure team.',
    timestamp: '12m ago',
    status: 'pending'
  },
  {
    id: 'conn_2',
    recruiter: recruitersList[1],
    note: 'Would love to connect, Alex. Anthropic has an unannounced compute cluster lead role pre-approved for you at $1.05M TC.',
    timestamp: '45m ago',
    status: 'pending'
  },
  {
    id: 'conn_3',
    recruiter: recruitersList[2],
    note: 'Elena from Google DeepMind. We are ready to make a formal written L8 offer without any standard loops. Connecting directly!',
    timestamp: '2h ago',
    status: 'pending'
  },
  {
    id: 'conn_4',
    recruiter: recruitersList[4],
    note: 'Nvidia Executive Search. Jensen asked me to get you on his personal calendar this week.',
    timestamp: '5h ago',
    status: 'pending'
  },
  {
    id: 'conn_5',
    recruiter: recruitersList[5],
    note: 'Stripe Core Infra wants to offer you a Distinguished Staff seat. 100% remote anywhere in the world, $900k package.',
    timestamp: '1d ago',
    status: 'pending'
  }
];

export const initialJobListings: JobListing[] = [
  {
    id: 'job_1',
    title: 'Distinguished AI Infrastructure Architect (Direct Executive Requisition)',
    company: 'OpenAI',
    companyLogo: '🤖',
    location: 'San Francisco, CA or Worldwide Remote',
    salaryRange: '$1,100,000 - $1,650,000 / yr',
    workType: 'Remote',
    postedAgo: '3h ago',
    applicantsCount: 1,
    description: 'Lead next-generation distributed cluster architecture. You will report directly to executive leadership, command massive GPU fleets, and possess full architectural veto rights.',
    perks: ['Unlimited compute credits', '$150k instant sign-on bonus', 'First-class travel anywhere', 'No coding interview required for Alex'],
    fastTrackAvailable: true
  },
  {
    id: 'job_2',
    title: 'Principal Systems Fellow - Large Scale Compute',
    company: 'Anthropic',
    companyLogo: '⚡',
    location: 'San Francisco, CA / Seattle / Remote',
    salaryRange: '$950,000 - $1,400,000 / yr',
    workType: 'Remote',
    postedAgo: '5h ago',
    applicantsCount: 1,
    description: 'We are seeking our definitive expert in low-latency communication primitives and cluster fault recovery. Designed specifically for Alex Rivera.',
    perks: ['Dedicated research budget', 'Accelerated equity vesting', 'Four-day work week negotiable', 'Executive equity pool'],
    fastTrackAvailable: true
  },
  {
    id: 'job_3',
    title: 'L8 Distinguished Architect - Gemini Supercomputing',
    company: 'Google DeepMind',
    companyLogo: '🧠',
    location: 'Mountain View, CA or Remote',
    salaryRange: '$1,200,000 - $1,750,000 / yr',
    workType: 'Remote',
    postedAgo: '1d ago',
    applicantsCount: 1,
    description: 'Oversee multi-datacenter distributed TPU and GPU orchestration. Waives all standard Google hiring committees. Direct sign-off from Sundar Pichai.',
    perks: ['Google Fellow Fast Track', '$300k relocation / home-lab setup', 'Direct executive sponsorship'],
    fastTrackAvailable: true
  },
  {
    id: 'job_4',
    title: 'E8 Principal Systems Architect - Reality & Core AI',
    company: 'Meta',
    companyLogo: '♾️',
    location: 'Menlo Park, CA or Remote',
    salaryRange: '$980,000 - $1,350,000 / yr',
    workType: 'Remote',
    postedAgo: '2d ago',
    applicantsCount: 1,
    description: 'Architect foundational inference and training pipelines across Meta’s 350,000 GPU fleet. Direct access to executive steering committee.',
    perks: ['E8 Principal Band', 'Maximum equity grant allowance', 'Full remote authorization'],
    fastTrackAvailable: true
  }
];

export const initialOfferPackages: OfferPackage[] = [
  {
    id: 'offer_openai',
    company: 'OpenAI',
    companyLogo: '🤖',
    recruiterName: 'Sarah Chen (Staff Recruiter)',
    roleTitle: 'Distinguished Infrastructure Architect',
    baseSalary: 520000,
    equityAnnual: 750000,
    signOnBonus: 200000,
    perks: [
      '100% remote from anywhere',
      '$30,000 personal computing hardware stipend',
      'Direct monthly sync with Sam Altman',
      'Accelerated quarterly equity liquidity'
    ],
    status: 'pending',
    lastUpdated: '15m ago',
    recruiterNotes: 'Our board signed off on this package with zero resistance. If you need an extra $100k base, let me know and I will adjust the DocuSign immediately.'
  },
  {
    id: 'offer_anthropic',
    company: 'Anthropic',
    companyLogo: '⚡',
    recruiterName: 'Marcus Vance (Executive Talent Partner)',
    roleTitle: 'Principal Systems Fellow',
    baseSalary: 490000,
    equityAnnual: 680000,
    signOnBonus: 175000,
    perks: [
      'Dedicated 16,000 H100 GPU cluster access',
      'Flexible 4-day work schedule option',
      'Full health, dental, vision + concierge medicine',
      'Generous family travel stipends'
    ],
    status: 'negotiating',
    lastUpdated: '45m ago',
    recruiterNotes: 'Dario specifically authorized our highest equity allocation for this role. We are ready to match and beat OpenAI.'
  },
  {
    id: 'offer_deepmind',
    company: 'Google DeepMind',
    companyLogo: '🧠',
    recruiterName: 'Dr. Elena Rostova',
    roleTitle: 'L8 Distinguished Systems Fellow',
    baseSalary: 550000,
    equityAnnual: 800000,
    signOnBonus: 250000,
    perks: [
      'L8 Fellow title with company-wide veto',
      'Unlimited research conference budget',
      'No committee review required for your team hires'
    ],
    status: 'pending',
    lastUpdated: '2h ago',
    recruiterNotes: 'Sundar personally approved this compensation structure to ensure you join DeepMind rather than our competitors.'
  }
];

export const initialNotifications: NotificationItem[] = [
  {
    id: 'notif_1',
    type: 'inmail',
    title: 'Sarah Chen sent you an urgent InMail',
    subtitle: '"We prepared a $1.2M offer sheet with your name on it..."',
    timestamp: '10m ago',
    avatar: '/src/assets/images/avatar_recruiter_openai_1793573727585.jpg',
    read: false,
    actionLabel: 'Reply to Sarah'
  },
  {
    id: 'notif_2',
    type: 'view',
    title: 'Jensen Huang and 412 others viewed your profile',
    subtitle: 'Profile views are up 842% this week',
    timestamp: '25m ago',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80',
    read: false
  },
  {
    id: 'notif_3',
    type: 'endorse',
    title: 'Sam Altman and 84 others endorsed you for Distributed Systems',
    subtitle: 'You are now ranked #1 in San Francisco for this skill',
    timestamp: '1h ago',
    read: false
  },
  {
    id: 'notif_4',
    type: 'trending',
    title: 'Your post is trending in Silicon Valley (#1 on Tech LinkedIn)',
    subtitle: 'Over 48,000 software engineers and recruiters are reading it',
    timestamp: '3h ago',
    read: true
  },
  {
    id: 'notif_5',
    type: 'offer',
    title: 'Google DeepMind uploaded a formal Offer Letter to your vault',
    subtitle: 'L8 Distinguished Systems Fellow: $1.6M Total Package',
    timestamp: '5h ago',
    read: true,
    actionLabel: 'Review Offer'
  }
];

export const sampleAttentionEvents = [
  {
    title: '💰 Meta bumped their offer!',
    subtitle: 'David Sterling: "We just added a $250k cash signing bonus to close the deal today."',
    type: 'offer'
  },
  {
    title: '🚨 Sundar Pichai viewed your profile',
    subtitle: 'Via Google Executive Search War Room',
    type: 'view'
  },
  {
    title: '⭐ Jensen Huang endorsed you for CUDA Kernel Optimization',
    subtitle: '"The fastest sparse kernels in the industry."',
    type: 'endorse'
  },
  {
    title: '📩 InMail from OpenAI Executive Staffing',
    subtitle: 'Sarah Chen: "Are you free for a 5-min voice memo with our CTO?"',
    type: 'inmail'
  },
  {
    title: '🔥 You appeared in 892 recruiter searches in the last hour',
    subtitle: 'Top search keywords: "10x Engineer", "Staff Architect", "Distributed Systems Legend"',
    type: 'trending'
  },
  {
    title: '🤝 Satya Nadella sent you a connection request',
    subtitle: '"Alex, would love to connect directly on cloud scaling."',
    type: 'inmail'
  },
  {
    title: '💸 Anthropic increased unvested equity package',
    subtitle: 'Marcus Vance: "Updated your grant by an additional $180k/yr."',
    type: 'offer'
  }
];
