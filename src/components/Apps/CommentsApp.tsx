import React, { useState, useEffect } from 'react';
import { Send, User, MessageCircle, Clock } from 'lucide-react';

interface Comment {
  id: string;
  name: string;
  text: string;
  time: string;
}

export const CommentsApp = () => {
  const [comments, setComments] = useState<Comment[]>([
    { id: '1', name: 'John Doe', text: 'This portfolio is amazing! Love the Windows 11 vibe.', time: new Date().toLocaleDateString() },
    { id: '2', name: 'Sarah Tech', text: 'Great projects. Keep up the good work Saurabh!', time: new Date().toLocaleDateString() }
  ]);
  const [newName, setNewName] = useState('');
  const [newText, setNewText] = useState('');

  // Load from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem('portfolio_comments');
    if (saved) {
      setComments(JSON.parse(saved));
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newText.trim()) return;

    const newComment = {
      id: Date.now().toString(),
      name: newName.trim(),
      text: newText.trim(),
      time: new Date().toLocaleDateString()
    };
    
    const updated = [newComment, ...comments];
    setComments(updated);
    localStorage.setItem('portfolio_comments', JSON.stringify(updated));
    setNewName('');
    setNewText('');
  };

  return (
    <div className="flex flex-col h-full bg-[#f3f3f3] dark:bg-[#202020] text-black dark:text-white font-sans">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 bg-white/50 dark:bg-black/20 border-b border-black/10 dark:border-white/10 backdrop-blur-md">
        <MessageCircle className="text-blue-500" size={24} />
        <h1 className="text-xl font-semibold">Guestbook Comments</h1>
      </div>

      <div className="flex-1 overflow-y-auto p-6 max-w-4xl w-full mx-auto custom-scrollbar">
        {/* Comment Form */}
        <div className="bg-white dark:bg-[#2a2a2a] rounded-xl shadow-sm border border-black/5 dark:border-white/5 p-5 mb-8">
          <h2 className="text-lg font-medium mb-4 flex items-center gap-2">
            Leave a message <span className="text-sm font-normal text-gray-500">(saved locally)</span>
          </h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input 
              type="text" 
              placeholder="Your Name (e.g., Recruiter, Friend)" 
              className="px-4 py-2 rounded-lg bg-gray-50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-white/10 outline-none focus:border-blue-500 transition-colors"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              maxLength={30}
              required
            />
            <textarea 
              placeholder="Write your comment here..." 
              className="px-4 py-3 rounded-lg bg-gray-50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-white/10 outline-none focus:border-blue-500 transition-colors resize-none h-24"
              value={newText}
              onChange={(e) => setNewText(e.target.value)}
              maxLength={300}
              required
            />
            <button 
              type="submit" 
              className="self-end flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition shadow-md"
            >
              <Send size={16} /> Post Comment
            </button>
          </form>
        </div>

        {/* Comment List */}
        <div className="space-y-4">
          <h3 className="font-semibold text-gray-700 dark:text-gray-300 border-b border-black/10 dark:border-white/10 pb-2 mb-4">
            Recent Comments ({comments.length})
          </h3>
          
          {comments.map((comment) => (
            <div key={comment.id} className="bg-white dark:bg-[#2a2a2a] rounded-lg p-4 border border-black/5 dark:border-white/5 shadow-sm animate-in slide-in-from-bottom-2 fade-in duration-300">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800 flex items-center justify-center text-blue-700 dark:text-blue-300 font-bold text-sm">
                    {comment.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="font-semibold text-sm">{comment.name}</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                  <Clock size={12} /> {comment.time}
                </div>
              </div>
              <p className="text-sm text-gray-800 dark:text-gray-200 pl-10 leading-relaxed">
                {comment.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
