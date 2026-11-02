import { UserProfile, Recruiter, FeedPost, ChatThread, ConnectionRequest, JobListing, OfferPackage, NotificationItem } from '../types';
import userAvatar from '../assets/images/avatar_user.png';

export const initialUserProfile: UserProfile = {
  id: 'user_main',
  name: 'Alex Rivera',
  headline: 'Quantitative Developer at Jane Street · Low-Latency Trading Systems & OCaml · Open to 7-Figure Challenges',
  currentCompany: 'Jane Street',
  location: 'New York City Metropolitan Area',
  avatar: userAvatar,
  coverImage: '/src/assets/images/hero_office_banner_1793573728449.jpg',
  connectionsCount: 3412,
  profileViews: 18490,
  postImpressions: 248500,
  searchAppearances: 12420,
  openToWork: true,
  skills: [
    'OCaml & Functional Programming',
    'Quantitative Trading Systems',
    'Market Making & Execution Algorithms',
    'Low-Latency C++ & FPGA Acceleration',
    'Stochastic Calculus & Probability',
    'Statistical Modeling & Time Series',
    'High-Frequency Algorithmic Engines'
  ],
  bio: 'Quant developer at Jane Street building the low-latency pricing and execution systems behind our market-making desks. Write OCaml all day, model order-flow by night, and shave microseconds off the critical path. Currently enjoying being aggressively recruited by every executive board across Big Tech and Quantitative Finance.'
};

export const recruitersList: Recruiter[] = [
  {
    id: 'rec_citadel',
    name: 'Pierce Harrington',
    title: 'Managing Director, Core Quantitative Infrastructure Talent',
    company: 'Citadel',
    companyLogo: '🏰',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
    online: true,
    mutualConnections: 388,
    initialOffer: '$1,950,000 TC ($850k base + $600k bonus + $500k sign-on)',
    personality: 'Wall Street alpha recruiter offering cold hard cash and private jet travel stipends'
  },
  {
    id: 'rec_janestreet',
    name: 'Julian Vance',
    title: 'Global Head of Quantitative Systems Staffing',
    company: 'Jane Street',
    companyLogo: '📈',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
    online: true,
    mutualConnections: 342,
    initialOffer: '$1,800,000 TC ($800k base + $700k bonus + $300k sign-on)',
    personality: 'Ultra-prestigious, mathematical purist, ready to fund whatever OCaml or systems infrastructure you demand'
  },
  {
    id: 'rec_nvidia',
    name: 'Trevor Belmont',
    title: 'Senior Executive Recruiter to the CEO',
    company: 'NVIDIA',
    companyLogo: '🟢',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    online: true,
    mutualConnections: 450,
    initialOffer: '$1,500,000 TC ($500k base + $750k equity + personal DGX Spark)',
    personality: 'Jensen Huang’s direct talent scout, promises personal Blackwell GPU cluster access'
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
    initialOffer: '$1,600,000 TC (L8 Distinguished Fellow)',
    personality: 'Academic powerhouse recruiter backed by Sundar Pichai’s office'
  },
  {
    id: 'rec_openai',
    name: 'Sarah Chen',
    title: 'Staff Technical Recruiter, Executive Talent',
    company: 'OpenAI',
    companyLogo: '🤖',
    avatar: '/src/assets/images/avatar_recruiter_openai_1793573727585.jpg',
    online: true,
    mutualConnections: 312,
    initialOffer: '$1,400,000 TC ($520k base + $700k equity + $180k sign-on)',
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
    initialOffer: '$1,350,000 TC ($490k base + $680k equity + $180k sign-on)',
    personality: 'Safety-first but armed with unlimited compute budget to win you over'
  },
  {
    id: 'rec_microsoft',
    name: 'Rebecca Ross',
    title: 'VP of Executive Talent, Microsoft AI',
    company: 'Microsoft',
    companyLogo: '🪟',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    online: true,
    mutualConnections: 375,
    initialOffer: '$1,300,000 TC (Technical Fellow, Azure Compute)',
    personality: 'Satya Nadella’s envoy offering planetary-scale clusters and massive executive stock grants'
  },
  {
    id: 'rec_meta',
    name: 'David Sterling',
    title: 'Principal Technical Headhunter, Reality & Core AI',
    company: 'Meta',
    companyLogo: '♾️',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    online: false,
    mutualConnections: 295,
    initialOffer: '$1,280,000 TC (E8 Principal Architect)',
    personality: 'Aggressive closer offering instant sign-on bonuses and custom hardware allowances'
  },
  {
    id: 'rec_amd',
    name: 'Victor Sterling',
    title: 'Senior Director of Silicon & ROCm Architecture Staffing',
    company: 'AMD',
    companyLogo: '🔴',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    online: true,
    mutualConnections: 210,
    initialOffer: '$1,250,000 TC (Corporate Fellow, Instinct Accelerators)',
    personality: 'Dr. Lisa Su’s direct representative, offering unreleased silicon samples'
  }
];

export const initialPosts: FeedPost[] = [
  {
    id: 'post_1',
    author: {
      name: 'Jensen Huang',
      headline: 'Founder & CEO at NVIDIA',
      company: 'NVIDIA',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80',
      verified: true
    },
    timestamp: '2h · Edited',
    content: `Rarely do I make a public LinkedIn post spotlighting a single engineer, but the distributed CUDA orchestration benchmarks Alex Rivera demonstrated this week are frankly unprecedented. 

Scaling tensor parallelism across 64,000 GPUs without communication stalls is usually considered mathematically impossible. Alex solved it over a weekend in bare-metal Rust.

Alex, our Santa Clara headquarters has a corner office with a leather jacket in your size waiting. Our board has pre-approved whatever package your agent requests. Let’s talk.`,
    metrics: {
      likes: 38890,
      comments: 2842,
      reposts: 1954
    },
    userLiked: true,
    commentsList: [
      {
        id: 'c1',
        author: 'Pierce Harrington (Citadel)',
        headline: 'Managing Director @ Citadel Securities',
        avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
        text: 'Jensen, with all respect, Citadel already sent Alex a $1.95M cash-heavy term sheet. We can wire their signing bonus before your leather jacket arrives. 💼',
        timestamp: '1h ago',
        likes: 1242
      },
      {
        id: 'c2',
        author: 'Sarah Chen',
        headline: 'Staff Technical Recruiter @ OpenAI',
        avatar: '/src/assets/images/avatar_recruiter_openai_1793573727585.jpg',
        text: 'OpenAI was first in line! Alex, our InMail was sent this morning with a signed offer term sheet. Check your messages! 🚀',
        timestamp: '45m ago',
        likes: 818
      }
    ],
    tag: '#SystemsEngineering #AIInfrastructure #BiddingWar'
  },
  {
    id: 'post_2',
    author: {
      name: 'Bloomberg Tech & Quant Wire',
      headline: 'The Authoritative Voice of Global Technology & Financial Markets',
      avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80',
      verified: true
    },
    timestamp: '5h',
    content: `BREAKING: Silicon Valley and Wall Street enter unprecedented 9-way bidding war for Staff Architect Alex Rivera.

Reports confirm that Citadel, Jane Street, Google DeepMind, OpenAI, Microsoft, Meta, AMD, and NVIDIA have all escalated executive compensation offers above $1.5M, with Citadel pushing toward $2.0M annually.

"There are perhaps four humans on Earth who truly understand how to eliminate micro-stragglers in distributed training clusters and high-frequency order books," noted one Sequoia Capital Partner. "Alex is three of them."`,
    metrics: {
      likes: 42230,
      comments: 3810,
      reposts: 2440
    },
    userLiked: true,
    commentsList: [
      {
        id: 'c3',
        author: 'Julian Vance (Jane Street)',
        headline: 'Head of Quant Systems Staffing @ Jane Street',
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
        text: 'Accurate reporting. Jane Street has prepared a bespoke research fellowship for Alex with zero bureaucracy and an uncapped bonus structure.',
        timestamp: '3h ago',
        likes: 990
      }
    ],
    tag: '#FinanceTech #HighFrequency #BigTechTalent'
  }
];

export const initialChatThreads: ChatThread[] = [
  {
    id: 'thread_citadel',
    recruiter: recruitersList[0],
    unreadCount: 2,
    lastMessageTimestamp: '5m ago',
    messages: [
      {
        id: 'm_cit_1',
        threadId: 'thread_citadel',
        sender: 'recruiter',
        text: 'Alex, Ken Griffin specifically requested that I get in touch with you. While Big Tech offers paper stock that vests over four years, Citadel pays liquid cash bonuses that dwarf the industry.',
        timestamp: 'Yesterday, 2:30 PM'
      },
      {
        id: 'm_cit_2',
        threadId: 'thread_citadel',
        sender: 'recruiter',
        text: 'We have drafted a $1,950,000 first-year package ($850k base + $600k performance bonus + $500k cash sign-on). Can we schedule a brief confidential conversation today?',
        timestamp: '5m ago'
      }
    ]
  },
  {
    id: 'thread_janestreet',
    recruiter: recruitersList[1],
    unreadCount: 1,
    lastMessageTimestamp: '15m ago',
    messages: [
      {
        id: 'm_js_1',
        threadId: 'thread_janestreet',
        sender: 'recruiter',
        text: 'Hello Alex! Jane Street has been studying your published consensus benchmarks. We are offering an unrestricted Systems Fellowship at $1.8M total comp, completely remote, with full access to our global FPGA infrastructure.',
        timestamp: '15m ago'
      }
    ]
  },
  {
    id: 'thread_nvidia',
    recruiter: recruitersList[2],
    unreadCount: 1,
    lastMessageTimestamp: '30m ago',
    messages: [
      {
        id: 'm_nv_1',
        threadId: 'thread_nvidia',
        sender: 'recruiter',
        text: 'Alex, Jensen asked about you in our executive sync. He literally said: "Give Alex whatever they want, and ship a personal DGX Spark workstation to their home tomorrow." We have pre-approved $1.5M TC!',
        timestamp: '30m ago'
      }
    ]
  },
  {
    id: 'thread_deepmind',
    recruiter: recruitersList[3],
    unreadCount: 1,
    lastMessageTimestamp: '1h ago',
    messages: [
      {
        id: 'm_dm_1',
        threadId: 'thread_deepmind',
        sender: 'recruiter',
        text: 'Alex, Sundar and Demis asked me to reach out directly. We have an unannounced L8 Distinguished Fellow position on our Gemini Next infrastructure at $1.6M TC. We will beat any competing term sheet.',
        timestamp: '1h ago'
      }
    ]
  },
  {
    id: 'thread_openai',
    recruiter: recruitersList[4],
    unreadCount: 2,
    lastMessageTimestamp: '2h ago',
    messages: [
      {
        id: 'm_oa_1',
        threadId: 'thread_openai',
        sender: 'recruiter',
        text: 'Alex! I know you are bombarded with messages right now, so I will cut straight through the noise. Our VP of Engineering specifically instructed me to bring you in as Principal Infrastructure Lead.',
        timestamp: 'Yesterday, 4:15 PM'
      },
      {
        id: 'm_oa_2',
        threadId: 'thread_openai',
        sender: 'recruiter',
        text: 'We are preparing a $1.4M total comp package ($520k cash base + $700k liquid equity + $180k sign-on bonus). Zero interview loops—just lunch with Sam Altman.',
        timestamp: '2h ago'
      }
    ]
  },
  {
    id: 'thread_anthropic',
    recruiter: recruitersList[5],
    unreadCount: 1,
    lastMessageTimestamp: '3h ago',
    messages: [
      {
        id: 'm_ant_1',
        threadId: 'thread_anthropic',
        sender: 'recruiter',
        text: 'Hello Alex! Marcus here from Anthropic. Dario has pre-approved a dedicated Systems Fellowship role at $1,350,000 TC + dedicated 16,000 GPU cluster access for your independent research.',
        timestamp: '3h ago'
      }
    ]
  },
  {
    id: 'thread_microsoft',
    recruiter: recruitersList[6],
    unreadCount: 1,
    lastMessageTimestamp: '4h ago',
    messages: [
      {
        id: 'm_ms_1',
        threadId: 'thread_microsoft',
        sender: 'recruiter',
        text: 'Alex, Satya Nadella’s office flagged your distributed compute work. We have an open Technical Fellow requisition on Azure Supercomputing with an initial $1.3M package and massive stock grant.',
        timestamp: '4h ago'
      }
    ]
  },
  {
    id: 'thread_meta',
    recruiter: recruitersList[7],
    unreadCount: 1,
    lastMessageTimestamp: '5h ago',
    messages: [
      {
        id: 'm_meta_1',
        threadId: 'thread_meta',
        sender: 'recruiter',
        text: 'Alex, Zuck already signed off on an E8 Principal Systems Architect band ($1.28M TC) with an immediate cash bonus. All interview loops are officially waived for you.',
        timestamp: '5h ago'
      }
    ]
  },
  {
    id: 'thread_amd',
    recruiter: recruitersList[8],
    unreadCount: 1,
    lastMessageTimestamp: '6h ago',
    messages: [
      {
        id: 'm_amd_1',
        threadId: 'thread_amd',
        sender: 'recruiter',
        text: 'Alex, Dr. Lisa Su personally asked me to reach out. We are building our next-generation ROCm compute fabric and want you as Corporate Fellow at $1.25M TC with unreleased silicon access.',
        timestamp: '6h ago'
      }
    ]
  }
];

export const initialConnectionRequests: ConnectionRequest[] = [
  {
    id: 'conn_cit',
    recruiter: recruitersList[0],
    note: 'Alex, Citadel Securities is prepared to offer you an immediate $1.95M package. Connecting to bypass standard recruiters!',
    timestamp: '5m ago',
    status: 'pending'
  },
  {
    id: 'conn_js',
    recruiter: recruitersList[1],
    note: 'Julian from Jane Street. Our executive partners want to discuss leading our core algorithmic infrastructure.',
    timestamp: '25m ago',
    status: 'pending'
  },
  {
    id: 'conn_nv',
    recruiter: recruitersList[2],
    note: 'NVIDIA Executive Talent. Jensen Huang asked me to get you on his personal calendar this week.',
    timestamp: '45m ago',
    status: 'pending'
  },
  {
    id: 'conn_dm',
    recruiter: recruitersList[3],
    note: 'Elena from Google DeepMind. We are ready to make a formal written L8 offer without any standard loops.',
    timestamp: '1h ago',
    status: 'pending'
  },
  {
    id: 'conn_oa',
    recruiter: recruitersList[4],
    note: 'Sarah from OpenAI. We prepared a $1.4M offer sheet with your name on it!',
    timestamp: '2h ago',
    status: 'pending'
  },
  {
    id: 'conn_ms',
    recruiter: recruitersList[6],
    note: 'Microsoft AI Executive Staffing. Satya asked for an intro call regarding Azure Planetary Compute.',
    timestamp: '3h ago',
    status: 'pending'
  }
];

export const initialJobListings: JobListing[] = [
  {
    id: 'job_citadel',
    title: 'Ultra-Low Latency Kernel Architect (Global Fast Track)',
    company: 'Citadel',
    companyLogo: '🏰',
    location: 'New York, Chicago, or Worldwide Remote',
    salaryRange: '$1,800,000 - $2,400,000 / yr',
    workType: 'Remote',
    postedAgo: '1h ago',
    applicantsCount: 1,
    description: 'Design the core multi-gigabit algorithmic execution pipelines powering global financial markets. Tailored specifically for Alex Rivera with zero coding loops.',
    perks: ['100% cash-heavy compensation', '$500k instant sign-on bonus', 'Private aviation stipend', 'Dedicated hardware lab'],
    fastTrackAvailable: true
  },
  {
    id: 'job_janestreet',
    title: 'Distinguished Systems & Algorithmic Fellow',
    company: 'Jane Street',
    companyLogo: '📈',
    location: 'New York, London, or Worldwide Remote',
    salaryRange: '$1,600,000 - $2,200,000 / yr',
    workType: 'Remote',
    postedAgo: '2h ago',
    applicantsCount: 1,
    description: 'Architect foundational low-latency distributed networks and hardware-accelerated consensus layers. Uncapped annual performance bonus pool.',
    perks: ['Zero bureaucracy', 'Uncapped annual cash bonus', 'Flexible remote schedule', 'Complete architectural veto'],
    fastTrackAvailable: true
  },
  {
    id: 'job_nvidia',
    title: 'Chief Blackwell Architecture Fellow',
    company: 'NVIDIA',
    companyLogo: '🟢',
    location: 'Santa Clara, CA or Remote',
    salaryRange: '$1,400,000 - $1,900,000 / yr',
    workType: 'Remote',
    postedAgo: '3h ago',
    applicantsCount: 1,
    description: 'Lead next-generation GPU clustering and NVLink scale-up fabrics. Reports directly to executive leadership.',
    perks: ['Personal DGX Spark cluster', 'Direct access to Jensen Huang', 'Accelerated stock grant'],
    fastTrackAvailable: true
  },
  {
    id: 'job_google',
    title: 'L8 Distinguished Systems Fellow - Gemini Supercomputing',
    company: 'Google DeepMind',
    companyLogo: '🧠',
    location: 'Mountain View, CA or Remote',
    salaryRange: '$1,300,000 - $1,800,000 / yr',
    workType: 'Remote',
    postedAgo: '4h ago',
    applicantsCount: 1,
    description: 'Oversee multi-datacenter distributed TPU and GPU orchestration. Waives all standard Google hiring committees.',
    perks: ['Google Fellow Fast Track', '$300k home-lab setup', 'Direct executive sponsorship'],
    fastTrackAvailable: true
  },
  {
    id: 'job_openai',
    title: 'Distinguished AI Infrastructure Architect',
    company: 'OpenAI',
    companyLogo: '🤖',
    location: 'San Francisco, CA or Remote',
    salaryRange: '$1,200,000 - $1,750,000 / yr',
    workType: 'Remote',
    postedAgo: '5h ago',
    applicantsCount: 1,
    description: 'Command massive GPU fleets and shape core training architecture for frontier foundation models.',
    perks: ['Unlimited compute credits', '$180k instant sign-on bonus', 'First-class travel anywhere'],
    fastTrackAvailable: true
  },
  {
    id: 'job_microsoft',
    title: 'Technical Fellow - Azure Planetary Scale Compute',
    company: 'Microsoft',
    companyLogo: '🪟',
    location: 'Redmond, WA or Remote',
    salaryRange: '$1,150,000 - $1,650,000 / yr',
    workType: 'Remote',
    postedAgo: '6h ago',
    applicantsCount: 1,
    description: 'Lead cloud supercomputing architecture across 60+ global Azure regions. Direct partnership with Microsoft leadership.',
    perks: ['Technical Fellow band', 'Executive equity pool', 'Full remote authorization'],
    fastTrackAvailable: true
  },
  {
    id: 'job_meta',
    title: 'E8 Principal Systems Architect - Core AI',
    company: 'Meta',
    companyLogo: '♾️',
    location: 'Menlo Park, CA or Remote',
    salaryRange: '$1,100,000 - $1,550,000 / yr',
    workType: 'Remote',
    postedAgo: '1d ago',
    applicantsCount: 1,
    description: 'Lead architecture for Meta’s 350,000 GPU fleet with direct access to the executive steering committee.',
    perks: ['E8 Principal Band', 'Maximum equity grant allowance', 'Full remote authorization'],
    fastTrackAvailable: true
  },
  {
    id: 'job_amd',
    title: 'Corporate Fellow - Instinct GPU & ROCm Ecosystem',
    company: 'AMD',
    companyLogo: '🔴',
    location: 'Austin, TX or Remote',
    salaryRange: '$1,050,000 - $1,500,000 / yr',
    workType: 'Remote',
    postedAgo: '1d ago',
    applicantsCount: 1,
    description: 'Define the architectural future of open AI hardware and ROCm software stacks. Direct sponsorship from Dr. Lisa Su.',
    perks: ['Corporate Fellow title', 'Unreleased silicon early access', 'Executive bonus pool'],
    fastTrackAvailable: true
  },
  {
    id: 'job_anthropic',
    title: 'Distinguished Systems Fellow - Frontier Cluster Architecture',
    company: 'Anthropic',
    companyLogo: '⚡',
    location: 'San Francisco, CA or Remote',
    salaryRange: '$1,200,000 - $1,700,000 / yr',
    workType: 'Remote',
    postedAgo: '3h ago',
    applicantsCount: 1,
    description: 'Lead next-generation distributed cluster orchestration for Claude frontier models with direct sponsorship from Dario Amodei.',
    perks: ['16,000 GPU dedicated research partition', 'Direct weekly sync with Dario Amodei', 'Accelerated equity grant'],
    fastTrackAvailable: true
  }
];

export const initialOfferPackages: OfferPackage[] = [
  {
    id: 'offer_citadel',
    company: 'Citadel',
    companyLogo: '🏰',
    recruiterName: 'Pierce Harrington (Managing Director)',
    roleTitle: 'Managing Director, Core Quantitative Systems',
    baseSalary: 850000,
    equityAnnual: 600000,
    signOnBonus: 500000,
    perks: [
      '100% cash-based compensation (no unvested paper)',
      'Immediate $500,000 cash sign-on wired on Day 1',
      'Unrestricted private travel allowance',
      'Complete architectural autonomy over FPGA & C++ trading stack'
    ],
    status: 'pending',
    lastUpdated: '5m ago',
    recruiterNotes: 'Ken Griffin personally pre-approved this cash offer. If you need an additional $200k base, tell me and the term sheet is updated immediately.'
  },
  {
    id: 'offer_janestreet',
    company: 'Jane Street',
    companyLogo: '📈',
    recruiterName: 'Julian Vance (Head of Systems Staffing)',
    roleTitle: 'Distinguished Systems Fellow',
    baseSalary: 800000,
    equityAnnual: 700000,
    signOnBonus: 300000,
    perks: [
      'Uncapped annual cash bonus based on firm performance',
      '100% remote flexibility from anywhere on Earth',
      'Custom hardware design budget with zero approval gates',
      'Full family healthcare and concierge wellness'
    ],
    status: 'negotiating',
    lastUpdated: '20m ago',
    recruiterNotes: 'Our partnership reviewed your benchmarks and unanimously agreed to meet whatever Citadel offers.'
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
    lastUpdated: '1h ago',
    recruiterNotes: 'Sundar personally approved this compensation structure to ensure you join DeepMind.'
  },
  {
    id: 'offer_nvidia',
    company: 'NVIDIA',
    companyLogo: '🟢',
    recruiterName: 'Trevor Belmont (Executive Recruiter)',
    roleTitle: 'Chief Blackwell Architecture Fellow',
    baseSalary: 500000,
    equityAnnual: 750000,
    signOnBonus: 250000,
    perks: [
      'Dedicated personal Blackwell GPU cluster',
      'Direct monthly strategy dinner with Jensen Huang',
      'Custom leather jacket with embedded hardware crest'
    ],
    status: 'pending',
    lastUpdated: '1h ago',
    recruiterNotes: 'Jensen said whatever other companies put on paper, NVIDIA will match with GPU allocations no one else can buy.'
  },
  {
    id: 'offer_openai',
    company: 'OpenAI',
    companyLogo: '🤖',
    recruiterName: 'Sarah Chen (Staff Recruiter)',
    roleTitle: 'Distinguished Infrastructure Architect',
    baseSalary: 520000,
    equityAnnual: 700000,
    signOnBonus: 180000,
    perks: [
      '100% remote from anywhere',
      '$30,000 personal computing hardware stipend',
      'Direct monthly sync with Sam Altman',
      'Accelerated quarterly equity liquidity'
    ],
    status: 'pending',
    lastUpdated: '2h ago',
    recruiterNotes: 'Our board signed off on this package with zero resistance. Can lock this in with Sam today.'
  },
  {
    id: 'offer_microsoft',
    company: 'Microsoft',
    companyLogo: '🪟',
    recruiterName: 'Rebecca Ross (VP of Talent)',
    roleTitle: 'Technical Fellow, Azure Compute',
    baseSalary: 480000,
    equityAnnual: 620000,
    signOnBonus: 200000,
    perks: [
      'Technical Fellow executive grade',
      'Complete autonomy over Azure cluster topology',
      'Executive stock grant accelerator'
    ],
    status: 'pending',
    lastUpdated: '4h ago',
    recruiterNotes: 'Satya Nadella is ready to counter any offer from Google or Citadel.'
  },
  {
    id: 'offer_meta',
    company: 'Meta',
    companyLogo: '♾️',
    recruiterName: 'David Sterling (Reality Labs & AI Staffing)',
    roleTitle: 'E8 Principal Systems Architect',
    baseSalary: 490000,
    equityAnnual: 650000,
    signOnBonus: 200000,
    perks: [
      'E8 Principal level with direct executive veto',
      'All technical interview rounds officially waived by Mark Zuckerberg',
      'Dedicated $150k custom home lab hardware budget'
    ],
    status: 'pending',
    lastUpdated: '5h ago',
    recruiterNotes: 'Mark personally approved waiving the entire 6-round technical loop. Immediate signature bonus wired.'
  },
  {
    id: 'offer_anthropic',
    company: 'Anthropic',
    companyLogo: '⚡',
    recruiterName: 'Marcus Vance (Executive Talent Acquisition)',
    roleTitle: 'Distinguished Systems Fellow',
    baseSalary: 510000,
    equityAnnual: 680000,
    signOnBonus: 160000,
    perks: [
      '16,000 GPU cluster dedicated partition for your architectural research',
      'Direct reporting line to Dario Amodei',
      'Full liquidity matching Big Tech public equity'
    ],
    status: 'pending',
    lastUpdated: '3h ago',
    recruiterNotes: 'Dario signed off on your compute reservation: 16k cluster ready the day you accept.'
  },
  {
    id: 'offer_amd',
    company: 'AMD',
    companyLogo: '🔴',
    recruiterName: 'Victor Sterling (Director of Silicon Talent)',
    roleTitle: 'Corporate Fellow, Instinct Accelerators & ROCm',
    baseSalary: 460000,
    equityAnnual: 600000,
    signOnBonus: 190000,
    perks: [
      'Corporate Fellow title (highest technical rank at AMD)',
      'Unreleased silicon sample pipeline straight to your desk',
      'Direct advisory access to Dr. Lisa Su'
    ],
    status: 'pending',
    lastUpdated: '6h ago',
    recruiterNotes: 'Dr. Lisa Su wants you leading our next-gen ROCm and Ultra Ethernet fabric systems.'
  }
];

export const initialNotifications: NotificationItem[] = [
  {
    id: 'notif_1',
    type: 'offer',
    title: 'Citadel uploaded a $1.95M cash-heavy term sheet to your vault',
    subtitle: 'Pierce Harrington: "$500k signing bonus wired upon signature."',
    timestamp: '5m ago',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
    read: false,
    actionLabel: 'Review $1.95M Offer'
  },
  {
    id: 'notif_2',
    type: 'inmail',
    title: 'Julian Vance (Jane Street) sent you an urgent InMail',
    subtitle: '"We can beat any Big Tech package with pure cash bonuses..."',
    timestamp: '15m ago',
    read: false,
    actionLabel: 'Reply to Jane Street'
  },
  {
    id: 'notif_3',
    type: 'view',
    title: 'Jensen Huang and 612 others viewed your profile',
    subtitle: 'Profile views are up 942% this week across NVIDIA, Citadel, and OpenAI',
    timestamp: '25m ago',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80',
    read: false
  },
  {
    id: 'notif_4',
    type: 'endorse',
    title: 'Sam Altman, Lisa Su, and 94 others endorsed you for Distributed Systems',
    subtitle: 'Ranked #1 globally for high-throughput cluster architectures',
    timestamp: '1h ago',
    read: false
  },
  {
    id: 'notif_5',
    type: 'trending',
    title: 'LarpedIn News: Silicon Valley & Wall St in 9-way bidding war over you',
    subtitle: 'Over 84,000 software engineers and recruiters are reading about your compensation',
    timestamp: '2h ago',
    read: true
  }
];

export const sampleAttentionEvents = [
  {
    title: '💰 Citadel bumped their cash offer to $2.05M!',
    subtitle: 'Pierce Harrington: "We just increased the signing bonus to close you this week."',
    type: 'offer'
  },
  {
    title: '📈 Jane Street submitted a counter-term sheet',
    subtitle: 'Julian Vance: "Unrestricted research fellowship + $800k base salary guaranteed."',
    type: 'offer'
  },
  {
    title: '🚨 Satya Nadella viewed your profile',
    subtitle: 'Via Microsoft Executive Steering Committee War Room',
    type: 'view'
  },
  {
    title: '⭐ Jensen Huang endorsed you for CUDA & Hardware Architecture',
    subtitle: '"The premier distributed kernel architect in the industry."',
    type: 'endorse'
  },
  {
    title: '🔴 AMD Executive Talent sent you an InMail',
    subtitle: 'Dr. Lisa Su’s office: "We have unreleased Instinct silicon waiting for your review."',
    type: 'inmail'
  },
  {
    title: '📩 InMail from OpenAI Executive Staffing',
    subtitle: 'Sarah Chen: "Are you free for an informal dinner with Sam Altman?"',
    type: 'inmail'
  },
  {
    title: '⚡ Anthropic increased your equity grant allocation',
    subtitle: 'Marcus Vance: "Updated your grant by an additional $220k/yr."',
    type: 'offer'
  },
  {
    title: '🔥 You appeared in 1,420 recruiter searches in the last hour',
    subtitle: 'Top search keywords: "Staff Architect", "Distributed Systems Legend", "High-Frequency Compute"',
    type: 'trending'
  }
];
