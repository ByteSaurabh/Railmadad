import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import ForumHeader from './components/ForumHeader';
import CategoryTabs from './components/CategoryTabs';
import DiscussionCard from './components/DiscussionCard';
import TrendingTopics from './components/TrendingTopics';
import CommunityStats from './components/CommunityStats';
import ExpertContributors from './components/ExpertContributors';
import RouteGroups from './components/RouteGroups';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';



const CommunityForumSupportNetwork = () => {
  const [activeCategory, setActiveCategory] = useState('trending');
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    category: 'all',
    route: 'all',
    sortBy: 'recent'
  });
  const [discussions, setDiscussions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock discussions data
  const mockDiscussions = [
    {
      id: 1,
      title: "AC not working in Rajdhani Express - Coach B2",
      content: `Traveling from Mumbai to Delhi today in Rajdhani Express (12952). The AC in coach B2 has been malfunctioning since Vadodara. Temperature is unbearable and passengers are suffering. Railway staff says they can't fix it mid-journey.\n\nHas anyone faced similar issues? What are our rights for compensation in such cases?`,
      author: {
        name: "Rajesh Kumar",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
        badge: "Frequent Traveler"
      },
      category: "facilities",
      categoryLabel: "Facilities",
      route: "Mumbai-Delhi",
      trainNumber: "12952",
      priority: "high",
      createdAt: new Date(Date.now() - 900000), // 15 minutes ago
      likes: 23,
      replies: 8,
      isLiked: false,
      isVerified: true,
      isResolved: false,
      images: [
        "https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?w=400&h=300",
        "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400&h=300"
      ]
    },
    {
      id: 2,
      title: "Mumbai Local Western Line - Massive delays today",
      content: `Severe delays on Western Line since morning. Trains running 20-30 minutes late from Andheri to Churchgate. Overcrowding is extreme and many passengers are missing office.\n\nAnyone knows what's causing these delays? Railway authorities haven't made any announcement.`,
      author: {
        name: "Priya Sharma",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
        badge: "Daily Commuter"
      },
      category: "delays",
      categoryLabel: "Delays",
      route: "Western Line",
      trainNumber: "Local",
      priority: "high",
      createdAt: new Date(Date.now() - 1800000), // 30 minutes ago
      likes: 45,
      replies: 15,
      isLiked: true,
      isVerified: true,
      isResolved: false
    },
    {
      id: 3,
      title: "New Vande Bharat Experience - Delhi to Varanasi",
      content: `Just completed my journey on the new Vande Bharat Express from Delhi to Varanasi. Overall experience was excellent! Clean coaches, comfortable seats, and punctual service.\n\nFood quality was good and staff was courteous. Highly recommend for this route. The 8-hour journey felt comfortable.`,
      author: {
        name: "Amit Patel",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
        badge: "Travel Enthusiast"
      },
      category: "general",
      categoryLabel: "General",
      route: "Delhi-Varanasi",
      trainNumber: "22436",
      priority: "low",
      createdAt: new Date(Date.now() - 3600000), // 1 hour ago
      likes: 67,
      replies: 12,
      isLiked: false,
      isVerified: true,
      isResolved: false,
      images: [
        "https://images.pexels.com/photos/1007025/pexels-photo-1007025.jpeg?w=400&h=300"
      ]
    },
    {
      id: 4,
      title: "Food poisoning from Pantry Car - Shatabdi Express",
      content: `Had breakfast from pantry car in Chennai-Bangalore Shatabdi yesterday. Multiple passengers including myself got food poisoning. Vomiting and stomach pain started 2 hours after eating.\n\nThis is a serious health hazard. How do we report this and get compensation? Railway food safety needs immediate attention.`,
      author: {
        name: "Sunita Reddy",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
        badge: "Safety Advocate"
      },
      category: "food",
      categoryLabel: "Food & Catering",
      route: "Chennai-Bangalore",
      trainNumber: "12008",
      priority: "high",
      createdAt: new Date(Date.now() - 7200000), // 2 hours ago
      likes: 89,
      replies: 23,
      isLiked: true,
      isVerified: true,
      isResolved: false
    },
    {
      id: 5,
      title: "IRCTC App booking issues - Payment deducted but no ticket",
      content: `Tried booking tickets through IRCTC app this morning. Payment was deducted from my account but no ticket was generated. Transaction shows successful in bank statement but failed in IRCTC.\n\nCustomer care is not responding. This has happened to me twice this month. Anyone facing similar issues?`,
      author: {
        name: "Vikram Singh",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
        badge: "Tech User"
      },
      category: "booking",
      categoryLabel: "Booking",
      route: "Online",
      trainNumber: "N/A",
      priority: "medium",
      createdAt: new Date(Date.now() - 10800000), // 3 hours ago
      likes: 34,
      replies: 18,
      isLiked: false,
      isVerified: false,
      isResolved: true
    },
    {
      id: 6,
      title: "Platform cleanliness at New Delhi Railway Station",
      content: `The cleanliness condition at Platform 16 of New Delhi Railway Station is terrible. Overflowing dustbins, dirty washrooms, and food waste everywhere.\n\nThis is the face of Indian Railways for tourists and travelers. We need to raise this issue with station authorities.`,
      author: {
        name: "Meera Joshi",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
        badge: "Clean India Supporter"
      },
      category: "facilities",
      categoryLabel: "Facilities",
      route: "New Delhi Station",
      trainNumber: "Station",
      priority: "medium",
      createdAt: new Date(Date.now() - 14400000), // 4 hours ago
      likes: 56,
      replies: 9,
      isLiked: false,
      isVerified: true,
      isResolved: false
    }
  ];

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setDiscussions(mockDiscussions);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    // In a real app, this would trigger an API call
    console.log('Searching for:', query);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    // In a real app, this would trigger an API call
    console.log('Filters changed:', newFilters);
  };

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    // In a real app, this would filter discussions
    console.log('Category changed:', category);
  };

  const filteredDiscussions = discussions?.filter(discussion => {
    if (searchQuery) {
      return discussion?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
             discussion?.content?.toLowerCase()?.includes(searchQuery?.toLowerCase());
    }
    return true;
  });

  return (
    <>
      <Helmet>
        <title>Community Forum & Support Network - RailMadad AI</title>
        <meta name="description" content="Connect with fellow railway passengers, share experiences, and get community support for your travel concerns through RailMadad AI's interactive forum platform." />
        <meta name="keywords" content="railway community, passenger forum, travel support, railway discussions, train experiences, community help" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        
        {/* Forum Header */}
        <ForumHeader 
          onSearch={handleSearch}
          onFilterChange={handleFilterChange}
          activeFilters={filters}
        />

        {/* Category Navigation */}
        <CategoryTabs 
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
        />

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Main Discussion Feed */}
            <div className="lg:col-span-8">
              <div className="space-y-6">
                {loading ? (
                  // Loading skeleton
                  (<div className="space-y-4">
                    {[1, 2, 3]?.map((i) => (
                      <div key={i} className="bg-white border border-border rounded-lg p-6 animate-pulse">
                        <div className="flex items-start space-x-3">
                          <div className="w-10 h-10 bg-muted rounded-full"></div>
                          <div className="flex-1 space-y-2">
                            <div className="h-4 bg-muted rounded w-3/4"></div>
                            <div className="h-3 bg-muted rounded w-1/2"></div>
                            <div className="space-y-1">
                              <div className="h-3 bg-muted rounded"></div>
                              <div className="h-3 bg-muted rounded w-5/6"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>)
                ) : (
                  <>
                    {filteredDiscussions?.length > 0 ? (
                      filteredDiscussions?.map((discussion) => (
                        <DiscussionCard 
                          key={discussion?.id} 
                          discussion={discussion} 
                        />
                      ))
                    ) : (
                      <div className="bg-white border border-border rounded-lg p-12 text-center">
                        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                          <Icon name="MessageSquare" size={32} className="text-muted-foreground" />
                        </div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">
                          No discussions found
                        </h3>
                        <p className="text-muted-foreground mb-4">
                          Try adjusting your search or filters to find relevant discussions.
                        </p>
                        <Button variant="default" iconName="Plus" iconPosition="left">
                          Start New Discussion
                        </Button>
                      </div>
                    )}
                  </>
                )}

                {/* Load More */}
                {!loading && filteredDiscussions?.length > 0 && (
                  <div className="text-center py-8">
                    <Button variant="outline" iconName="ChevronDown" iconPosition="right">
                      Load More Discussions
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4">
              <div className="space-y-6 sticky top-32">
                <CommunityStats />
                <TrendingTopics />
                <ExpertContributors />
                <RouteGroups />
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-card border-t border-border mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                © {new Date()?.getFullYear()} RailMadad AI Community Forum. 
                Building stronger railway experiences together.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default CommunityForumSupportNetwork;