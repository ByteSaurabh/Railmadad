import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const ForumHeader = ({ onSearch, onFilterChange, activeFilters }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedRoute, setSelectedRoute] = useState('all');

  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    { value: 'delays', label: 'Delays & Cancellations' },
    { value: 'facilities', label: 'Station Facilities' },
    { value: 'cleanliness', label: 'Cleanliness Issues' },
    { value: 'food', label: 'Food & Catering' },
    { value: 'safety', label: 'Safety Concerns' },
    { value: 'booking', label: 'Booking & Reservations' },
    { value: 'general', label: 'General Discussion' }
  ];

  const routeOptions = [
    { value: 'all', label: 'All Routes' },
    { value: 'rajdhani', label: 'Rajdhani Express' },
    { value: 'shatabdi', label: 'Shatabdi Express' },
    { value: 'duronto', label: 'Duronto Express' },
    { value: 'garib-rath', label: 'Garib Rath' },
    { value: 'jan-shatabdi', label: 'Jan Shatabdi' },
    { value: 'superfast', label: 'Superfast Trains' },
    { value: 'express', label: 'Express Trains' },
    { value: 'passenger', label: 'Passenger Trains' }
  ];

  const handleSearch = (e) => {
    e?.preventDefault();
    onSearch(searchQuery);
  };

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
    onFilterChange({ ...activeFilters, category: value });
  };

  const handleRouteChange = (value) => {
    setSelectedRoute(value);
    onFilterChange({ ...activeFilters, route: value });
  };

  return (
    <div className="bg-white border-b border-border sticky top-16 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header Title */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Community Forum</h1>
            <p className="text-muted-foreground mt-1">
              Connect with fellow passengers and share your railway experiences
            </p>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="hidden sm:flex items-center space-x-2 px-3 py-1.5 bg-success/10 rounded-full">
              <div className="w-2 h-2 bg-success rounded-full sensor-active"></div>
              <span className="text-xs font-medium text-success">2,847 Active Users</span>
            </div>
            
            <Button variant="default" iconName="Plus" iconPosition="left">
              New Discussion
            </Button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Search Bar */}
          <div className="lg:col-span-6">
            <form onSubmit={handleSearch} className="relative">
              <Input
                type="search"
                placeholder="Search discussions, routes, or topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e?.target?.value)}
                className="pr-12"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Icon name="Search" size={18} />
              </button>
            </form>
          </div>

          {/* Category Filter */}
          <div className="lg:col-span-3">
            <Select
              placeholder="Filter by category"
              options={categoryOptions}
              value={selectedCategory}
              onChange={handleCategoryChange}
            />
          </div>

          {/* Route Filter */}
          <div className="lg:col-span-3">
            <Select
              placeholder="Filter by route"
              options={routeOptions}
              value={selectedRoute}
              onChange={handleRouteChange}
            />
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">15,234</div>
            <div className="text-sm text-muted-foreground">Total Discussions</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-secondary">8,567</div>
            <div className="text-sm text-muted-foreground">Active Members</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-success">1,892</div>
            <div className="text-sm text-muted-foreground">Resolved Issues</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-warning">456</div>
            <div className="text-sm text-muted-foreground">Today's Posts</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForumHeader;