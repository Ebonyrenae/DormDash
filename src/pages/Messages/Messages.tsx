import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/layout/Sidebar';
import MenuButton from '../../components/ui/MenuButton';
import './messages.css';

interface Conversation {
  id: number;
  name: string;
  initials: string;
  role: 'Helper' | 'Rider';
  subject: string;
  lastMessage: string;
  timeAgo: string;
  unreadCount?: number;
}

const Messages = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const conversations: Conversation[] = [
    {
      id: 1,
      name: 'Mike Johnson',
      initials: 'MJ',
      role: 'Helper',
      subject: 'Re: Ride to Airport',
      lastMessage: 'I can pick you up at 2pm!',
      timeAgo: '2m ago',
      unreadCount: 2,
    },
    {
      id: 2,
      name: 'Sarah Williams',
      initials: 'SW',
      role: 'Rider',
      subject: 'Re: Grocery Shopping Help',
      lastMessage: 'Thank you so much! See you then',
      timeAgo: '1h ago',
    },
    {
      id: 3,
      name: 'Alex Chen',
      initials: 'AC',
      role: 'Helper',
      subject: 'Re: Lunch Pickup',
      lastMessage: "I'll be there in 10 minutes",
      timeAgo: '3d ago',
    },
    {
      id: 4,
      name: 'Emily Davis',
      initials: 'ED',
      role: 'Rider',
      subject: 'Re: walmart pickup',
      lastMessage: 'hey are you here yet?',
      timeAgo: '1w ago',
      unreadCount: 1,
    },
  ];

  const handleConversationClick = (conversationId: number) => {
    navigate(`/messages/${conversationId}`);
  };

  return (
    <div className="messages-page">
      <MenuButton onClick={() => setIsSidebarOpen(true)} />
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="messages-header">
        <h1>Messages</h1>
      </div>

      <div className="messages-container">
        {/* Conversations List */}
        <div className="conversations-panel">
          <div className="search-container">
            <svg className="search-icon" viewBox="0 0 20 20" fill="none">
              <path
                d="M9.16667 15.8333C12.8486 15.8333 15.8333 12.8486 15.8333 9.16667C15.8333 5.48477 12.8486 2.5 9.16667 2.5C5.48477 2.5 2.5 5.48477 2.5 9.16667C2.5 12.8486 5.48477 15.8333 9.16667 15.8333Z"
                stroke="#6A7282"
                strokeWidth="1.66667"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M17.5 17.5L13.9167 13.9167"
                stroke="#6A7282"
                strokeWidth="1.66667"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="conversations-list">
            {conversations.map((conversation) => (
              <div
                key={conversation.id}
                className="conversation-item"
                onClick={() => handleConversationClick(conversation.id)}
              >
                <div className="avatar">{conversation.initials}</div>
                <div className="conversation-content">
                  <div className="conversation-header">
                    <div className="name-badge">
                      <span className="name">{conversation.name}</span>
                      <span className={`badge badge-${conversation.role.toLowerCase()}`}>
                        {conversation.role}
                      </span>
                    </div>
                    <span className="time">{conversation.timeAgo}</span>
                  </div>
                  <div className="subject">{conversation.subject}</div>
                  <div className="last-message">
                    <span className="message-text">{conversation.lastMessage}</span>
                    {conversation.unreadCount && (
                      <span className="unread-badge">{conversation.unreadCount}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Empty State */}
        <div className="chat-area">
          <div className="empty-state">
            <div className="empty-icon">
              <svg viewBox="0 0 40 40" fill="none">
                <path
                  d="M31.6667 35V31.6667C31.6667 29.8986 30.9643 28.2029 29.714 26.9526C28.4638 25.7024 26.7681 25 25 25H15C13.2319 25 11.5362 25.7024 10.286 26.9526C9.03571 28.2029 8.33333 29.8986 8.33333 31.6667V35"
                  stroke="#29AC3D"
                  strokeWidth="3.33333"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M20 18.3333C23.6819 18.3333 26.6667 15.3486 26.6667 11.6667C26.6667 7.98477 23.6819 5 20 5C16.3181 5 13.3333 7.98477 13.3333 11.6667C13.3333 15.3486 16.3181 18.3333 20 18.3333Z"
                  stroke="#29AC3D"
                  strokeWidth="3.33333"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <p className="empty-text">Select a conversation to start messaging</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
