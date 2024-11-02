import { FC, useState } from 'react';
import { Bell, Send } from 'lucide-react';

interface Message {
  id: number;
  sender: string;
  content: string;
  timestamp: string;
}

const Communications: FC = () => {
  const [activeTab, setActiveTab] = useState('messages');
  const [message, setMessage] = useState('');
  const [messages] = useState<Message[]>([
    {
      id: 1,
      sender: "Emma Thompson",
      content: "Thanks for the great service!",
      timestamp: "2h ago"
    },
    {
      id: 2,
      sender: "James Wilson",
      content: "Looking forward to my appointment tomorrow",
      timestamp: "3h ago"
    },
    {
      id: 3,
      sender: "Sofia Garcia",
      content: "Can I reschedule my appointment?",
      timestamp: "5h ago"
    }
  ]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      // Handle sending message
      setMessage('');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Communications</h1>
        <button className="flex items-center px-4 py-2 bg-glamour-gold text-white rounded-lg hover:bg-opacity-90 transition-colors">
          <Bell className="w-5 h-5 mr-2" />
          Send Notification
        </button>
      </div>

      <div className="flex space-x-4">
        {['messages', 'notifications', 'announcements'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg capitalize ${
              activeTab === tab
                ? 'bg-glamour-gold text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-lg shadow-md">
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold">Recent Messages</h2>
          </div>
          <div className="divide-y">
            {messages.map((msg) => (
              <div key={msg.id} className="p-4 hover:bg-gray-50 cursor-pointer">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">{msg.sender}</h3>
                  <span className="text-sm text-gray-500">{msg.timestamp}</span>
                </div>
                <p className="text-gray-600 text-sm">{msg.content}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold mb-4">New Message</h2>
            <form onSubmit={handleSendMessage} className="space-y-4">
              <input
                type="text"
                placeholder="Recipient"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-glamour-gold/50 focus:border-glamour-gold"
              />
              <textarea
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-glamour-gold/50 focus:border-glamour-gold resize-none"
              />
              <button 
                type="submit"
                className="w-full flex items-center justify-center px-4 py-2 bg-glamour-gold text-white rounded-lg hover:bg-opacity-90 transition-colors"
              >
                <Send className="w-5 h-5 mr-2" />
                Send Message
              </button>
            </form>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold mb-4">Message Templates</h2>
            <div className="space-y-2">
              {[
                'Appointment Confirmation',
                'Appointment Reminder',
                'Follow-up Message',
                'Special Offer'
              ].map((template) => (
                <button 
                  key={template}
                  className="w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg"
                >
                  {template}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Communications;