import React from 'react';
import {
  MessageSquare,
  FileText,
  GraduationCap,
  Settings,
  BarChart3,
  Bug,
  Music,
  Headphones
} from 'lucide-react';

const QuickLinks = () => {
  // Quick links data with icons and URLs, in the requested order
  const quickLinks = [
    // Top row
    {
      id: 1,
      name: 'Notion',
      url: 'https://www.notion.so/Daily-Dashboard-1dbfa68cea7a81e6b571fcddb872cf22',
      icon: FileText,
      color: 'accent'
    },
    {
      id: 2,
      name: 'Simmer',
      url: 'https://www.teamsimmer.com/dashboard/',
      icon: GraduationCap,
      color: 'accent'
    },
    {
      id: 3,
      name: 'Brain.fm',
      url: 'https://my.brain.fm/',
      icon: Music,
      color: 'accent'
    },
    {
      id: 4,
      name: 'Endel',
      url: 'https://app.endel.io/',
      icon: Headphones,
      color: 'accent'
    },
    // Bottom row
    {
      id: 5,
      name: 'ChatGPT',
      url: 'https://chat.openai.com',
      icon: MessageSquare,
      color: 'accent'
    },
    {
      id: 6,
      name: 'GTM',
      url: 'https://tagmanager.google.com',
      icon: Settings,
      color: 'accent'
    },
    {
      id: 7,
      name: 'GA4',
      url: 'https://analytics.google.com',
      icon: BarChart3,
      color: 'accent'
    },
    {
      id: 8,
      name: 'Jira',
      url: 'https://vorwerk.atlassian.net/jira/software/c/projects/TWR/issues/?filter=allissues&jql=project%20%3D%20%22TWR%22%0Aand%20status%20in%20%28%22In%20Progress%22%2C%20QA%2C%20%22Sprint%20Backlog%22%2C%20%22To%20Do%22%29%0Aand%20type%20in%20%28%22Access%20Request%22%2C%20Bug%2C%20%22Other%20request%22%2C%20%22Report%20Request%22%2C%20%22Tracking%20Request%22%29%0AORDER%20BY%20created%20DESC',
      icon: Bug,
      color: 'accent'
    }
  ];

  const handleLinkClick = (url) => {
    window.open(url, '_blank');
  };

  return (
    <div className="card h-full flex flex-col">
      {/* Section header */}
      <h2 className="heading-section">
        Quick Access
      </h2>

      {/* Responsive grid layout: 4 columns for 2 rows */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 flex-1">
        {quickLinks.map((link) => {
          const IconComponent = link.icon;
          return (
            <button
              key={link.id}
              onClick={() => handleLinkClick(link.url)}
              className="quick-link-tile"
              style={{ minHeight: '120px' }}
            >
              {/* Icon with flat background and accent color */}
              <div className="w-14 h-14 rounded-xl bg-[#23263a] flex items-center justify-center mb-4">
                <IconComponent size={28} className="accent" />
              </div>
              {/* Link name with normal font */}
              <span className="text-base font-medium text-gray-100">
                {link.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuickLinks; 