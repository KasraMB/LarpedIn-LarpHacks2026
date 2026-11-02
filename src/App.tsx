import React, { useState, useEffect, useRef } from 'react';
import { 
  initialUserProfile, 
  recruitersList, 
  initialPosts, 
  initialChatThreads, 
  initialConnectionRequests, 
  initialJobListings, 
  initialOfferPackages, 
  initialNotifications,
  sampleAttentionEvents
} from './data/mockData';
import { 
  UserProfile, 
  FeedPost as FeedPostType, 
  ChatThread, 
  ChatMessage,
  ConnectionRequest, 
  JobListing, 
  OfferPackage, 
  NotificationItem, 
  FeatherlessConfig,
  Recruiter
} from './types';
import { playNotificationChime } from './utils/audio';

import { Header } from './components/Header';
import { LeftSidebar } from './components/LeftSidebar';
import { FeedPost } from './components/FeedPost';
import { RightSidebar } from './components/RightSidebar';
import { CreatePostModal } from './components/CreatePostModal';
import { DockedChat } from './components/DockedChat';
import { MessagingTab } from './components/MessagingTab';
import { NetworkTab } from './components/NetworkTab';
import { JobsTab } from './components/JobsTab';
import { OffersVaultTab } from './components/OffersVaultTab';
import { NotificationsTab } from './components/NotificationsTab';
import { SettingsModal } from './components/SettingsModal';
import { ProfileEditModal } from './components/ProfileEditModal';
import { AttentionToasts, AttentionToastItem } from './components/AttentionToasts';
import { Image, Video, Calendar, FileText, Sparkles, Flame, CheckCircle2 } from 'lucide-react';

export default function App() {
  // --- Persistent State ---
  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('larpedin_user_profile') || localStorage.getItem('linkedout_user_profile');
    return saved
      ? { ...JSON.parse(saved), avatar: initialUserProfile.avatar }
      : initialUserProfile;
  });

  const [featherlessConfig, setFeatherlessConfig] = useState<FeatherlessConfig>(() => {
    const saved = localStorage.getItem('larpedin_config') || localStorage.getItem('linkedout_config');
    const parsed = saved ? JSON.parse(saved) : null;
    return {
      apiKey: parsed?.apiKey || '',
      model: parsed?.model === 'meta-llama/Meta-Llama-3.1-8B-Instruct' || !parsed?.model ? 'Qwen/Qwen2.5-7B-Instruct' : parsed.model,
      useFeatherless: Boolean(parsed?.apiKey),
      hypeIntensity: parsed?.hypeIntensity || 'frenzy',
      soundEnabled: parsed?.soundEnabled ?? true
    };
  });

  const [activeTab, setActiveTab] = useState<'feed' | 'network' | 'jobs' | 'messaging' | 'notifications' | 'offers'>('feed');
  const [feedPosts, setFeedPosts] = useState<FeedPostType[]>(() => {
    const saved = localStorage.getItem('larpedin_posts') || localStorage.getItem('linkedout_posts');
    const posts: FeedPostType[] = saved ? JSON.parse(saved) : initialPosts;
    return posts.map((post) => ({
      ...post,
      author: post.author.isUser
        ? { ...post.author, avatar: initialUserProfile.avatar }
        : post.author,
      commentsList: post.commentsList.map((comment) =>
        comment.avatar.includes('avatar_user_')
          ? { ...comment, avatar: initialUserProfile.avatar }
          : comment
      ),
    }));
  });

  const [chatThreads, setChatThreads] = useState<ChatThread[]>(() => {
    const saved = localStorage.getItem('larpedin_threads') || localStorage.getItem('linkedout_threads');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.length >= 8) return parsed;
      } catch {}
    }
    return initialChatThreads;
  });

  const [connectionRequests, setConnectionRequests] = useState<ConnectionRequest[]>(() => {
    const saved = localStorage.getItem('larpedin_connections') || localStorage.getItem('linkedout_connections');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.length >= 6) return parsed;
      } catch {}
    }
    return initialConnectionRequests;
  });

  const [jobListings, setJobListings] = useState<JobListing[]>(initialJobListings);
  const [appliedJobIds, setAppliedJobIds] = useState<string[]>([]);
  const [offerPackages, setOfferPackages] = useState<OfferPackage[]>(() => {
    const saved = localStorage.getItem('larpedin_offers') || localStorage.getItem('linkedout_offers');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.length >= 8) return parsed;
      } catch {}
    }
    return initialOfferPackages;
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications);
  const [toasts, setToasts] = useState<AttentionToastItem[]>([]);
  const [activeChatThreadId, setActiveChatThreadId] = useState<string | null>('thread_citadel');
  const [isRecruiterTyping, setIsRecruiterTyping] = useState(false);
  const [isGeneratingInMails, setIsGeneratingInMails] = useState(false);

  // Modals
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isProfileEditOpen, setIsProfileEditOpen] = useState(false);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('larpedin_user_profile', JSON.stringify(userProfile));
  }, [userProfile]);

  useEffect(() => {
    localStorage.setItem('larpedin_config', JSON.stringify(featherlessConfig));
    if (featherlessConfig.apiKey) {
      fetch('/api/save-config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          apiKey: featherlessConfig.apiKey,
          model: featherlessConfig.model
        })
      }).catch(() => {});
    }
  }, [featherlessConfig]);

  const handleSaveQuickApiKey = (key: string) => {
    const updated = {
      ...featherlessConfig,
      apiKey: key.trim(),
      useFeatherless: Boolean(key.trim())
    };
    setFeatherlessConfig(updated);
    fetch('/api/save-config', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        apiKey: key.trim(),
        model: updated.model
      })
    }).catch(() => {});
  };

  useEffect(() => {
    localStorage.setItem('larpedin_posts', JSON.stringify(feedPosts));
  }, [feedPosts]);

  useEffect(() => {
    localStorage.setItem('larpedin_threads', JSON.stringify(chatThreads));
  }, [chatThreads]);

  useEffect(() => {
    localStorage.setItem('larpedin_connections', JSON.stringify(connectionRequests));
  }, [connectionRequests]);

  useEffect(() => {
    localStorage.setItem('larpedin_offers', JSON.stringify(offerPackages));
  }, [offerPackages]);

  // --- Real-time Attention Bomb Generator ---
  useEffect(() => {
    let intervalMs = 15000;
    if (featherlessConfig.hypeIntensity === 'meltdown') intervalMs = 7000;
    if (featherlessConfig.hypeIntensity === 'mild') intervalMs = 40000;

    let counter = 0;
    const interval = setInterval(() => {
      counter++;
      // Every 2nd cycle, trigger a real AI incoming InMail from a recruiter!
      if (counter % 2 === 0 && chatThreads.length > 0) {
        const randomThread = chatThreads[Math.floor(Math.random() * chatThreads.length)];
        triggerLiveIncomingInMail(randomThread.id);
      } else {
        triggerAttentionEvent();
      }
    }, intervalMs);

    return () => clearInterval(interval);
  }, [featherlessConfig.hypeIntensity, featherlessConfig.soundEnabled, chatThreads.length, featherlessConfig.apiKey, featherlessConfig.model]);

  // Dynamically trigger an AI generated InMail into an existing thread
  const triggerLiveIncomingInMail = async (threadId: string) => {
    const thread = chatThreads.find((t) => t.id === threadId);
    if (!thread) return;

    try {
      const res = await fetch('/api/generate-inmail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          recruiter: thread.recruiter,
          userProfile,
          apiKey: featherlessConfig.apiKey,
          model: featherlessConfig.model,
          urgentContext: 'Urgent follow-up: CEO authorized an accelerated equity schedule.'
        })
      });

      const data = await res.json();
      if (data.text) {
        const newMsg: ChatMessage = {
          id: `msg_ai_live_${Date.now()}`,
          threadId,
          sender: 'recruiter',
          text: data.text,
          timestamp: 'Just now',
          provider: data.provider
        };

        setChatThreads((prev) =>
          prev.map((t) =>
            t.id === threadId
              ? {
                  ...t,
                  messages: [...t.messages, newMsg],
                  unreadCount: t.unreadCount + 1,
                  lastMessageTimestamp: 'Just now'
                }
              : t
          )
        );

        if (featherlessConfig.soundEnabled) playNotificationChime();

        const toastId = `toast_inmail_${Date.now()}`;
        setToasts((prev) => [
          {
            id: toastId,
            title: `📩 InMail from ${thread.recruiter.name} (${thread.recruiter.company})`,
            subtitle: data.text.length > 95 ? data.text.slice(0, 95) + '...' : data.text,
            type: 'inmail',
            actionText: 'Reply in DMs',
            onClick: () => {
              setActiveChatThreadId(threadId);
              setActiveTab('messaging');
            }
          },
          ...prev.slice(0, 2)
        ]);

        // Auto-dismiss toast
        setTimeout(() => {
          setToasts((prev) => prev.filter((t) => t.id !== toastId));
        }, 6000);
      }
    } catch {
      triggerAttentionEvent();
    }
  };

  const triggerAttentionEvent = () => {
    const randomEvent = sampleAttentionEvents[Math.floor(Math.random() * sampleAttentionEvents.length)];
    const eventId = `toast_${Date.now()}_${Math.random()}`;

    if (featherlessConfig.soundEnabled) {
      playNotificationChime();
    }

    setToasts((prev) => [
      {
        id: eventId,
        title: randomEvent.title,
        subtitle: randomEvent.subtitle,
        type: randomEvent.type,
        actionText: randomEvent.type === 'offer' ? 'View Comp' : 'Open InMail',
        onClick: () => {
          if (randomEvent.type === 'offer') {
            setActiveTab('offers');
          } else {
            setActiveTab('messaging');
          }
        }
      },
      ...prev.slice(0, 2)
    ]);

    setNotifications((prev) => [
      {
        id: `notif_${Date.now()}`,
        type: randomEvent.type as any,
        title: randomEvent.title,
        subtitle: randomEvent.subtitle,
        timestamp: 'Just now',
        read: false,
        actionLabel: randomEvent.type === 'offer' ? 'Review Offer' : 'Reply'
      },
      ...prev
    ]);

    setUserProfile((prev) => ({
      ...prev,
      profileViews: prev.profileViews + Math.floor(Math.random() * 8) + 3,
      postImpressions: prev.postImpressions + Math.floor(Math.random() * 45) + 12
    }));

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== eventId));
    }, 6000);
  };

  const handleDismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // --- Regenerate All InMails via Featherless AI ---
  const handleRegenerateAllInMails = async (customKey?: string, customModel?: string) => {
    setIsGeneratingInMails(true);
    const keyToUse = customKey !== undefined ? customKey : featherlessConfig.apiKey;
    const modelToUse = customModel !== undefined ? customModel : featherlessConfig.model;

    try {
      const res = await fetch('/api/regenerate-all-inmails', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          recruiters: recruitersList,
          userProfile,
          apiKey: keyToUse,
          model: modelToUse
        })
      });

      const data = await res.json();
      if (data.results && data.results.length > 0) {
        setChatThreads((prev) =>
          prev.map((thread) => {
            const match = data.results.find((r: any) => r.recruiterId === thread.recruiter.id);
            if (match) {
              return {
                ...thread,
                unreadCount: 1,
                lastMessageTimestamp: 'Just now',
                messages: [
                  {
                    id: `msg_ai_fresh_${Date.now()}_${thread.id}`,
                    threadId: thread.id,
                    sender: 'recruiter',
                    text: match.text,
                    timestamp: 'Just now',
                    provider: match.provider
                  }
                ]
              };
            }
            return thread;
          })
        );

        const toastId = `toast_gen_${Date.now()}`;
        setToasts((prev) => [
          {
            id: toastId,
            title: '✨ Fresh AI InMails Generated!',
            subtitle: `All recruiters just wrote brand new InMails using ${modelToUse.split('/')[1] || modelToUse}.`,
            type: 'inmail',
            actionText: 'View Messages',
            onClick: () => setActiveTab('messaging')
          },
          ...prev
        ]);

        if (featherlessConfig.soundEnabled) playNotificationChime();
        setTimeout(() => {
          setToasts((prev) => prev.filter((t) => t.id !== toastId));
        }, 7000);
      }
    } catch (err) {
      console.error('Failed to regenerate inmails:', err);
    } finally {
      setIsGeneratingInMails(false);
    }
  };

  // --- Feed Handlers ---
  const handleLikeToggle = (postId: string) => {
    setFeedPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          return {
            ...p,
            userLiked: !p.userLiked
          };
        }
        return p;
      })
    );
  };

  const handleAddComment = async (postId: string, commentText: string) => {
    const userComment = {
      id: `comm_${Date.now()}`,
      author: userProfile.name,
      headline: userProfile.headline,
      avatar: userProfile.avatar,
      text: commentText,
      timestamp: 'Just now',
      likes: 1
    };

    setFeedPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          return {
            ...p,
            commentsList: [...p.commentsList, userComment],
            metrics: {
              ...p.metrics,
              comments: p.metrics.comments + 1
            }
          };
        }
        return p;
      })
    );

    setTimeout(() => {
      const recruiters = ['Sarah Chen (OpenAI)', 'Marcus Vance (Anthropic)', 'Dr. Elena Rostova (DeepMind)'];
      const chosenRecruiter = recruiters[Math.floor(Math.random() * recruiters.length)];
      const replies = [
        `100% agreed, ${userProfile.name.split(' ')[0]}! Check your LinkedIn DMs, we just sent over our updated term sheet.`,
        `Brilliant perspective as always! This is why our executive committee is so eager to speak with you.`,
        `Couldn't agree more. If you ever want to build this with full architectural autonomy, my team is ready to make an immediate offer.`
      ];

      const aiReplyComment = {
        id: `comm_ai_${Date.now()}`,
        author: chosenRecruiter,
        headline: 'Executive Talent Lead',
        avatar: chosenRecruiter.includes('Sarah')
          ? '/src/assets/images/avatar_recruiter_openai_1793573727585.jpg'
          : '/src/assets/images/avatar_recruiter_anthropic_1793573728191.jpg',
        text: replies[Math.floor(Math.random() * replies.length)],
        timestamp: 'Just now',
        likes: Math.floor(Math.random() * 40) + 15
      };

      setFeedPosts((prev) =>
        prev.map((p) => {
          if (p.id === postId) {
            return {
              ...p,
              commentsList: [...p.commentsList, aiReplyComment],
              metrics: {
                ...p.metrics,
                likes: p.metrics.likes + 25
              }
            };
          }
          return p;
        })
      );

      if (featherlessConfig.soundEnabled) playNotificationChime();
    }, 2200);
  };

  const handleCreatePost = async (content: string) => {
    const newPostId = `post_${Date.now()}`;
    const newPost: FeedPostType = {
      id: newPostId,
      author: {
        name: userProfile.name,
        headline: userProfile.headline,
        avatar: userProfile.avatar,
        isUser: true,
        verified: true
      },
      timestamp: 'Just now',
      content,
      metrics: {
        likes: 1,
        comments: 0,
        reposts: 0
      },
      userLiked: true,
      commentsList: []
    };

    setFeedPosts((prev) => [newPost, ...prev]);

    try {
      const res = await fetch('/api/generate-post-comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postContent: content, userProfile })
      });
      const data = await res.json();
      const generatedComments = data.comments || [];

      generatedComments.forEach((comm: any, idx: number) => {
        setTimeout(() => {
          setFeedPosts((prev) =>
            prev.map((p) => {
              if (p.id === newPostId) {
                return {
                  ...p,
                  metrics: {
                    ...p.metrics,
                    likes: p.metrics.likes + Math.floor(Math.random() * 320) + 150,
                    reposts: p.metrics.reposts + Math.floor(Math.random() * 40) + 12
                  },
                  commentsList: [
                    ...p.commentsList,
                    {
                      id: `c_auto_${idx}_${Date.now()}`,
                      author: comm.author,
                      headline: comm.role,
                      avatar: comm.author.includes('Sarah')
                        ? '/src/assets/images/avatar_recruiter_openai_1793573727585.jpg'
                        : '/src/assets/images/avatar_recruiter_anthropic_1793573728191.jpg',
                      text: comm.text,
                      timestamp: 'Just now',
                      likes: comm.likes
                    }
                  ]
                };
              }
              return p;
            })
          );
          if (featherlessConfig.soundEnabled) playNotificationChime();
        }, (idx + 1) * 2000);
      });
    } catch {
      // Ignore
    }
  };

  // --- Messaging Handlers ---
  const handleSendMessage = async (threadId: string, text: string) => {
    const userMsg: ChatMessage = {
      id: `m_user_${Date.now()}`,
      threadId,
      sender: 'user',
      text,
      timestamp: 'Just now'
    };

    setChatThreads((prev) =>
      prev.map((t) => {
        if (t.id === threadId) {
          return {
            ...t,
            messages: [...t.messages, userMsg],
            unreadCount: 0,
            lastMessageTimestamp: 'Just now'
          };
        }
        return t;
      })
    );

    const targetThread = chatThreads.find((t) => t.id === threadId);
    if (!targetThread) return;

    setIsRecruiterTyping(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...targetThread.messages, userMsg],
          recruiter: targetThread.recruiter,
          userProfile,
          apiKey: featherlessConfig.apiKey,
          model: featherlessConfig.model
        })
      });

      const data = await res.json();
      const replyText = data.text || "Thank you for getting back to me! Our leadership is reviewing your terms right now.";

      setTimeout(() => {
        setIsRecruiterTyping(false);
        const aiMsg: ChatMessage = {
          id: `m_ai_${Date.now()}`,
          threadId,
          sender: 'recruiter',
          text: replyText,
          timestamp: 'Just now',
          provider: data.provider
        };

        setChatThreads((prev) =>
          prev.map((t) => {
            if (t.id === threadId) {
              return {
                ...t,
                messages: [...t.messages, aiMsg],
                lastMessageTimestamp: 'Just now'
              };
            }
            return t;
          })
        );

        if (featherlessConfig.soundEnabled) playNotificationChime();
      }, 1200);
    } catch (err) {
      setIsRecruiterTyping(false);
    }
  };

  // --- Network Connection Handlers ---
  const handleAcceptConnection = (requestId: string) => {
    const req = connectionRequests.find((r) => r.id === requestId);
    if (!req) return;

    setConnectionRequests((prev) =>
      prev.map((r) => (r.id === requestId ? { ...r, status: 'accepted' } : r))
    );

    setUserProfile((prev) => ({
      ...prev,
      connectionsCount: prev.connectionsCount + 1
    }));

    if (featherlessConfig.soundEnabled) playNotificationChime();

    const existingThread = chatThreads.find((t) => t.recruiter.id === req.recruiter.id);
    if (existingThread) {
      setActiveChatThreadId(existingThread.id);
    }
    setActiveTab('messaging');
  };

  const handleIgnoreConnection = (requestId: string) => {
    setConnectionRequests((prev) =>
      prev.map((r) => (r.id === requestId ? { ...r, status: 'ignored' } : r))
    );

    setTimeout(() => {
      setToasts((prev) => [
        {
          id: `toast_counter_${Date.now()}`,
          title: '🚨 Recruiter panicked by your ignore!',
          subtitle: 'Marcus Vance: "Did we insult you? We are adding $150,000 cash to the offer immediately."',
          type: 'offer',
          actionText: 'View New Offer',
          onClick: () => setActiveTab('offers')
        },
        ...prev
      ]);
      if (featherlessConfig.soundEnabled) playNotificationChime();
    }, 1800);
  };

  const handleConnectVIP = (name: string, company: string) => {
    setUserProfile((prev) => ({
      ...prev,
      connectionsCount: prev.connectionsCount + 1
    }));
    setToasts((prev) => [
      {
        id: `vip_${Date.now()}`,
        title: `Connected with ${name}!`,
        subtitle: `${name} accepted in 1 second: "Thrilled to connect with you, ${userProfile.name.split(' ')[0]}!"`,
        type: 'inmail',
        actionText: 'Message',
        onClick: () => setActiveTab('messaging')
      },
      ...prev
    ]);
    if (featherlessConfig.soundEnabled) playNotificationChime();
  };

  // --- Job Application Handlers ---
  const handleApplyJob = (job: JobListing) => {
    setAppliedJobIds((prev) => [...prev, job.id]);

    setToasts((prev) => [
      {
        id: `apply_${Date.now()}`,
        title: `🎉 ${job.company} Fast-Track Approved!`,
        subtitle: `All 5 interview rounds waived! Recruiter is preparing your ${job.salaryRange} term sheet.`,
        type: 'offer',
        actionText: 'View Offers Vault',
        onClick: () => setActiveTab('offers')
      },
      ...prev
    ]);

    if (featherlessConfig.soundEnabled) playNotificationChime();
  };

  // --- Offer Vault Handlers ---
  const handleAcceptOffer = (offerId: string) => {
    const offer = offerPackages.find((o) => o.id === offerId);
    if (!offer) return;

    if (featherlessConfig.soundEnabled) playNotificationChime();

    setToasts((prev) => [
      {
        id: `accept_${Date.now()}`,
        title: `🏆 OFFER OFFICIALLY ACCEPTED!`,
        subtitle: `You signed with ${offer.company} for $${(offer.baseSalary + offer.equityAnnual + offer.signOnBonus).toLocaleString()}! The tech world is celebrating.`,
        type: 'offer'
      },
      ...prev
    ]);
  };

  const handleCounterOffer = (offerId: string, counterAmount: number, customPerk: string) => {
    setOfferPackages((prev) =>
      prev.map((o) => {
        if (o.id === offerId) {
          return {
            ...o,
            baseSalary: o.baseSalary + counterAmount,
            perks: customPerk ? [...o.perks, customPerk] : o.perks,
            recruiterNotes: `Approved by executive board without discussion: +$${counterAmount.toLocaleString()} added. ${customPerk ? `Granted: "${customPerk}".` : ''}`
          };
        }
        return o;
      })
    );

    if (featherlessConfig.soundEnabled) playNotificationChime();
  };

  // --- Shortcut helpers ---
  const handleOpenMessageWithRecruiter = (recruiter: Recruiter | string) => {
    const recruiterName = typeof recruiter === 'string' ? recruiter : recruiter.name;
    const thread = chatThreads.find((t) => t.recruiter.name.toLowerCase().includes(recruiterName.toLowerCase()));
    if (thread) {
      setActiveChatThreadId(thread.id);
    }
    setActiveTab('messaging');
  };

  const handleConnectWithRecruiter = (recruiter: Recruiter) => {
    setUserProfile((prev) => ({
      ...prev,
      connectionsCount: prev.connectionsCount + 1
    }));
    handleOpenMessageWithRecruiter(recruiter);
  };

  const handleToggleOpenToWork = () => {
    const newStatus = !userProfile.openToWork;
    setUserProfile((prev) => ({ ...prev, openToWork: newStatus }));

    if (newStatus) {
      setToasts((prev) => [
        {
          id: `otw_${Date.now()}`,
          title: '🔥 #OpenToWork Broadcast Active!',
          subtitle: '50 Big Tech recruiters simultaneously received urgent Slack alerts about your availability.',
          type: 'offer'
        },
        ...prev
      ]);
      if (featherlessConfig.soundEnabled) playNotificationChime();
    }
  };

  const handleMarkAllNotifsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const handleNotificationAction = (item: NotificationItem) => {
    if (item.type === 'offer') {
      setActiveTab('offers');
    } else if (item.type === 'inmail') {
      setActiveTab('messaging');
    } else {
      setActiveTab('feed');
    }
  };

  // Calculate unread counters
  const unreadMessagesCount = chatThreads.reduce((sum, t) => sum + t.unreadCount, 0);
  const unreadNotifsCount = notifications.filter((n) => !n.read).length;
  const pendingInvitesCount = connectionRequests.filter((r) => r.status === 'pending').length;
  const pendingOffersCount = offerPackages.length;
  const highestOffer = offerPackages.reduce((max, cur) => {
    const curTotal = cur.baseSalary + cur.equityAnnual + cur.signOnBonus;
    const maxTotal = max.baseSalary + max.equityAnnual + max.signOnBonus;
    return curTotal > maxTotal ? cur : max;
  }, offerPackages[0]);
  const highestOfferSummary = highestOffer
    ? `Highest: $${((highestOffer.baseSalary + highestOffer.equityAnnual + highestOffer.signOnBonus) / 1000000).toFixed(2)}M TC (${highestOffer.company}) · Negotiate ➔`
    : 'Highest: $1.95M TC (Citadel) · Negotiate ➔';

  return (
    <div className="min-h-screen bg-[#f4f2ee] text-[#191919] flex flex-col font-sans selection:bg-[#0a66c2]/20 selection:text-[#0a66c2]">
      {/* Top Navigation Bar */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        userProfile={userProfile}
        unreadMessagesCount={unreadMessagesCount}
        unreadNotifsCount={unreadNotifsCount}
        pendingInvitesCount={pendingInvitesCount}
        pendingOffersCount={pendingOffersCount}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenProfileEdit={() => setIsProfileEditOpen(true)}
        featherlessConfig={featherlessConfig}
      />

      {/* Main Content Viewport */}
      <main className="flex-1 max-w-[1200px] w-full mx-auto px-2 sm:px-4 py-4">
        {/* VIEW 1: HOME FEED */}
        {activeTab === 'feed' && (
          <div className="flex flex-col lg:flex-row gap-5 items-start">
            {/* Left Column: User Profile Card */}
            <LeftSidebar
              userProfile={userProfile}
              onEditProfile={() => setIsProfileEditOpen(true)}
              onToggleOpenToWork={handleToggleOpenToWork}
              onViewOffers={() => setActiveTab('offers')}
              offersCount={offerPackages.length}
              topOfferSummary={highestOfferSummary}
            />

            {/* Center Column: Post Creator & Viral Feed */}
            <div className="flex-1 max-w-[620px] w-full flex flex-col">
              {/* Start a Post Card */}
              <div className="bg-white rounded-lg border border-[#e0dfdc] p-4 shadow-xs mb-3">
                <div className="flex items-center gap-3">
                  <img
                    src={userProfile.avatar}
                    alt={userProfile.name}
                    referrerPolicy="no-referrer"
                    className="w-11 h-11 rounded-full object-cover ring-2 ring-emerald-500 cursor-pointer"
                    onClick={() => setIsProfileEditOpen(true)}
                  />
                  <button
                    onClick={() => setIsCreatePostOpen(true)}
                    className="flex-1 text-left px-4 py-3 rounded-full border border-slate-300 hover:bg-slate-100 text-xs sm:text-sm font-semibold text-slate-500 transition-colors cursor-pointer"
                  >
                    Start a post... (Recruiters will swarm your comments!)
                  </button>
                </div>

                <div className="flex items-center justify-between pt-3 mt-3 border-t border-slate-100 text-xs font-semibold text-slate-500">
                  <button
                    onClick={() => setIsCreatePostOpen(true)}
                    className="flex items-center gap-2 p-2 hover:bg-slate-100 rounded-md transition-colors cursor-pointer text-blue-600"
                  >
                    <Image className="w-4 h-4" />
                    <span>Media</span>
                  </button>
                  <button
                    onClick={() => setIsCreatePostOpen(true)}
                    className="flex items-center gap-2 p-2 hover:bg-slate-100 rounded-md transition-colors cursor-pointer text-emerald-600"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Event</span>
                  </button>
                  <button
                    onClick={() => setIsCreatePostOpen(true)}
                    className="flex items-center gap-2 p-2 hover:bg-slate-100 rounded-md transition-colors cursor-pointer text-amber-600"
                  >
                    <FileText className="w-4 h-4" />
                    <span>Write article</span>
                  </button>
                </div>
              </div>

              {/* Feed Divider / Sort */}
              <div className="flex items-center gap-2 my-1 px-1">
                <div className="flex-1 h-px bg-slate-300" />
                <span className="text-[11px] text-slate-500 font-medium">
                  Sort by: <strong className="text-slate-800">Top Recruiters</strong> ▾
                </span>
              </div>

              {/* Feed Posts */}
              {feedPosts.map((post) => (
                <FeedPost
                  key={post.id}
                  post={post}
                  userProfile={userProfile}
                  onLikeToggle={handleLikeToggle}
                  onAddComment={handleAddComment}
                  onOpenMessageWith={handleOpenMessageWithRecruiter}
                />
              ))}
            </div>

            {/* Right Column: LarpedIn News & Recruiter Spotlight */}
            <RightSidebar
              recruiters={recruitersList}
              onOpenMessageWithRecruiter={handleOpenMessageWithRecruiter}
              onConnectWithRecruiter={handleConnectWithRecruiter}
              userName={userProfile.name}
            />
          </div>
        )}

        {/* VIEW 2: MY NETWORK */}
        {activeTab === 'network' && (
          <NetworkTab
            connectionRequests={connectionRequests}
            onAcceptConnection={handleAcceptConnection}
            onIgnoreConnection={handleIgnoreConnection}
            onConnectVIP={handleConnectVIP}
            connectionsCount={userProfile.connectionsCount}
          />
        )}

        {/* VIEW 3: JOBS */}
        {activeTab === 'jobs' && (
          <JobsTab
            jobListings={jobListings}
            onApplyJob={handleApplyJob}
            appliedJobIds={appliedJobIds}
          />
        )}

        {/* VIEW 4: FULL MESSAGING TAB */}
        {activeTab === 'messaging' && (
          <MessagingTab
            threads={chatThreads}
            activeThreadId={activeChatThreadId}
            onSelectThread={(id) => setActiveChatThreadId(id)}
            onSendMessage={handleSendMessage}
            onRegenerateAllInMails={handleRegenerateAllInMails}
            onTriggerRecruiterInMail={triggerLiveIncomingInMail}
            onSaveQuickApiKey={handleSaveQuickApiKey}
            userProfile={userProfile}
            featherlessConfig={featherlessConfig}
            isRecruiterTyping={isRecruiterTyping}
            isGeneratingInMails={isGeneratingInMails}
            onOpenSettings={() => setIsSettingsOpen(true)}
            onViewOffers={() => setActiveTab('offers')}
          />
        )}

        {/* VIEW 5: NOTIFICATIONS */}
        {activeTab === 'notifications' && (
          <NotificationsTab
            notifications={notifications}
            onMarkAllAsRead={handleMarkAllNotifsRead}
            onNotificationAction={handleNotificationAction}
          />
        )}

        {/* VIEW 6: OFFERS & BIDDING WAR VAULT */}
        {activeTab === 'offers' && (
          <OffersVaultTab
            offers={offerPackages}
            onAcceptOffer={handleAcceptOffer}
            onCounterOffer={handleCounterOffer}
            onOpenMessageWithRecruiter={handleOpenMessageWithRecruiter}
          />
        )}
      </main>

      {/* Classic LinkedIn Docked Floating Chat */}
      {activeTab !== 'messaging' && (
        <DockedChat
          threads={chatThreads}
          activeThreadId={activeChatThreadId}
          onSelectThread={(id) => setActiveChatThreadId(id)}
          onCloseDock={() => {}}
          onSendMessage={handleSendMessage}
          userProfile={userProfile}
          featherlessConfig={featherlessConfig}
          onOpenFullMessaging={() => setActiveTab('messaging')}
          isRecruiterTyping={isRecruiterTyping}
        />
      )}

      {/* Floating Attention Toasts */}
      <AttentionToasts toasts={toasts} onDismiss={handleDismissToast} />

      {/* Create Post Modal */}
      <CreatePostModal
        isOpen={isCreatePostOpen}
        onClose={() => setIsCreatePostOpen(false)}
        onSubmitPost={handleCreatePost}
        userProfile={userProfile}
      />

      {/* Featherless AI / Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        config={featherlessConfig}
        onSaveConfig={(newConfig) => setFeatherlessConfig(newConfig)}
        onTriggerManualBomb={triggerAttentionEvent}
        onRegenerateInMails={handleRegenerateAllInMails}
        isGeneratingInMails={isGeneratingInMails}
      />

      {/* Profile Edit Modal */}
      <ProfileEditModal
        isOpen={isProfileEditOpen}
        onClose={() => setIsProfileEditOpen(false)}
        userProfile={userProfile}
        onSaveProfile={(updated) => setUserProfile(updated)}
      />
    </div>
  );
}
