import React, { useState } from 'react';
import { 
  ThumbsUp, 
  MessageSquare, 
  Repeat2, 
  Send, 
  MoreHorizontal, 
  ShieldCheck, 
  Sparkles,
  Heart,
  PartyPopper
} from 'lucide-react';
import { FeedPost as FeedPostType, UserProfile } from '../types';

interface FeedPostProps {
  post: FeedPostType;
  userProfile: UserProfile;
  onLikeToggle: (postId: string) => void;
  onAddComment: (postId: string, commentText: string) => void;
  onOpenMessageWith: (recruiterName: string) => void;
}

export const FeedPost: React.FC<FeedPostProps> = ({
  post,
  userProfile,
  onLikeToggle,
  onAddComment,
  onOpenMessageWith
}) => {
  const [showComments, setShowComments] = useState(true);
  const [newCommentText, setNewCommentText] = useState('');
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);
  const [reposted, setReposted] = useState(false);
  const [showSentToast, setShowSentToast] = useState(false);

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;

    setIsSubmittingComment(true);
    onAddComment(post.id, newCommentText.trim());
    setNewCommentText('');
    setTimeout(() => {
      setIsSubmittingComment(false);
    }, 600);
  };

  const handleRepost = () => {
    setReposted(!reposted);
  };

  const handleSend = () => {
    setShowSentToast(true);
    setTimeout(() => setShowSentToast(false), 2500);
  };

  return (
    <article className="bg-white rounded-lg border border-[#e0dfdc] shadow-xs overflow-hidden mb-3">
      {/* Post Author Header */}
      <div className="p-4 pb-2 flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <img
            src={post.author.avatar}
            alt={post.author.name}
            referrerPolicy="no-referrer"
            className="w-12 h-12 rounded-full object-cover shrink-0 ring-1 ring-slate-200"
          />
          <div className="overflow-hidden">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="font-bold text-sm text-slate-900 hover:text-[#0a66c2] cursor-pointer">
                {post.author.name}
              </span>
              {post.author.verified && (
                <ShieldCheck className="w-4 h-4 text-[#0a66c2] shrink-0" />
              )}
              <span className="text-xs text-slate-400 font-medium">· 1st</span>
            </div>
            <p className="text-xs text-slate-500 leading-tight truncate">
              {post.author.headline}
            </p>
            <div className="flex items-center gap-1 text-[11px] text-slate-400 mt-0.5">
              <span>{post.timestamp}</span>
              <span>·</span>
              <span>🌐</span>
            </div>
          </div>
        </div>

        <button className="text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100 transition-colors">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>

      {/* Post Content */}
      <div className="px-4 py-2">
        <div className="text-sm text-slate-800 whitespace-pre-line leading-relaxed font-normal">
          {post.content}
        </div>
        {post.tag && (
          <div className="mt-2 text-xs font-semibold text-[#0a66c2] hover:underline cursor-pointer">
            {post.tag}
          </div>
        )}
      </div>

      {/* Post Image if any */}
      {post.image && (
        <div className="mt-2 border-t border-b border-slate-100">
          <img
            src={post.image}
            alt="Post media"
            referrerPolicy="no-referrer"
            className="w-full max-h-[420px] object-cover"
          />
        </div>
      )}

      {/* Post Metrics Bar */}
      <div className="px-4 py-2 flex items-center justify-between text-xs text-slate-500 border-b border-slate-100">
        <div className="flex items-center gap-1.5">
          <div className="flex -space-x-1">
            <span className="w-4.5 h-4.5 rounded-full bg-[#0a66c2] text-white flex items-center justify-center text-[9px] shadow-xs">
              👍
            </span>
            <span className="w-4.5 h-4.5 rounded-full bg-red-500 text-white flex items-center justify-center text-[9px] shadow-xs">
              ❤️
            </span>
            <span className="w-4.5 h-4.5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[9px] shadow-xs">
              👏
            </span>
          </div>
          <span className="font-medium tabular-nums ml-1">
            {(post.metrics.likes + (post.userLiked ? 1 : 0)).toLocaleString()}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={() => setShowComments(!showComments)}
            className="hover:underline hover:text-[#0a66c2] cursor-pointer"
          >
            {post.commentsList.length} comments
          </button>
          <span>·</span>
          <span>{(post.metrics.reposts + (reposted ? 1 : 0)).toLocaleString()} reposts</span>
        </div>
      </div>

      {/* Action Buttons Row */}
      <div className="px-2 py-1 flex items-center justify-around border-b border-slate-100 text-xs font-semibold text-slate-600">
        {/* Like */}
        <button
          onClick={() => onLikeToggle(post.id)}
          className={`flex items-center justify-center gap-1.5 flex-1 py-2 rounded-md hover:bg-slate-100 transition-colors cursor-pointer ${
            post.userLiked ? 'text-[#0a66c2]' : 'text-slate-600'
          }`}
        >
          <ThumbsUp className={`w-4 h-4 ${post.userLiked ? 'fill-[#0a66c2]' : ''}`} />
          <span>Like</span>
        </button>

        {/* Comment */}
        <button
          onClick={() => setShowComments(!showComments)}
          className="flex items-center justify-center gap-1.5 flex-1 py-2 rounded-md hover:bg-slate-100 transition-colors cursor-pointer text-slate-600"
        >
          <MessageSquare className="w-4 h-4" />
          <span>Comment</span>
        </button>

        {/* Repost */}
        <button
          onClick={handleRepost}
          className={`flex items-center justify-center gap-1.5 flex-1 py-2 rounded-md hover:bg-slate-100 transition-colors cursor-pointer ${
            reposted ? 'text-emerald-600 font-bold' : 'text-slate-600'
          }`}
        >
          <Repeat2 className="w-4 h-4" />
          <span>{reposted ? 'Reposted' : 'Repost'}</span>
        </button>

        {/* Send */}
        <button
          onClick={handleSend}
          className="flex items-center justify-center gap-1.5 flex-1 py-2 rounded-md hover:bg-slate-100 transition-colors cursor-pointer text-slate-600 relative"
        >
          <Send className="w-4 h-4" />
          <span>Send</span>
          {showSentToast && (
            <span className="absolute -top-7 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] px-2 py-0.5 rounded shadow-md whitespace-nowrap z-20">
              Sent to 12 recruiters!
            </span>
          )}
        </button>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="p-4 bg-slate-50/60 flex flex-col gap-3">
          {/* Add a comment input */}
          <form onSubmit={handleCommentSubmit} className="flex gap-2.5 items-start">
            <img
              src={userProfile.avatar}
              alt={userProfile.name}
              referrerPolicy="no-referrer"
              className="w-8 h-8 rounded-full object-cover shrink-0 ring-1 ring-emerald-500"
            />
            <div className="flex-1">
              <div className="flex items-center rounded-full border border-slate-300 bg-white focus-within:border-[#0a66c2] focus-within:ring-1 focus-within:ring-[#0a66c2] px-3.5 py-1.5">
                <input
                  type="text"
                  value={newCommentText}
                  onChange={(e) => setNewCommentText(e.target.value)}
                  placeholder="Add a comment... (Recruiters will respond instantly!)"
                  className="w-full text-xs text-slate-800 placeholder-slate-400 bg-transparent focus:outline-hidden"
                />
                {newCommentText.trim() && (
                  <button
                    type="submit"
                    disabled={isSubmittingComment}
                    className="ml-2 bg-[#0a66c2] hover:bg-[#004182] text-white text-[11px] font-bold px-3 py-1 rounded-full cursor-pointer transition-colors shrink-0"
                  >
                    {isSubmittingComment ? 'Posting...' : 'Post'}
                  </button>
                )}
              </div>
            </div>
          </form>

          {/* Comment list */}
          <div className="flex flex-col gap-2.5 pt-1">
            {post.commentsList.map((comment) => (
              <div key={comment.id} className="flex gap-2.5 items-start">
                <img
                  src={comment.avatar}
                  alt={comment.author}
                  referrerPolicy="no-referrer"
                  className="w-8 h-8 rounded-full object-cover shrink-0"
                />
                <div className="flex-1 bg-white p-3 rounded-lg border border-slate-200 shadow-2xs">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 
                        onClick={() => onOpenMessageWith(comment.author)}
                        className="text-xs font-bold text-slate-900 hover:text-[#0a66c2] cursor-pointer"
                      >
                        {comment.author}
                      </h4>
                      <p className="text-[11px] text-slate-500 leading-tight">{comment.headline}</p>
                    </div>
                    <span className="text-[10px] text-slate-400 shrink-0">{comment.timestamp}</span>
                  </div>
                  <p className="text-xs text-slate-800 mt-2 leading-relaxed">
                    {comment.text}
                  </p>
                  <div className="flex items-center gap-3 mt-2 text-[11px] text-slate-500">
                    <button className="hover:text-[#0a66c2] font-semibold flex items-center gap-1 cursor-pointer">
                      <span>Like</span>
                      <span className="tabular-nums">({comment.likes})</span>
                    </button>
                    <span>·</span>
                    <button 
                      onClick={() => onOpenMessageWith(comment.author)}
                      className="hover:text-[#0a66c2] font-semibold cursor-pointer text-[#0a66c2]"
                    >
                      Reply in DMs 💬
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </article>
  );
};
