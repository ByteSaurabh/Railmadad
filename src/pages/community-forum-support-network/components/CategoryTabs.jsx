import React from 'react';
import Icon from '../../../components/AppIcon';

const CategoryTabs = ({ activeCategory, onCategoryChange }) => {
  const categories = [
    {
      id: 'trending',
      name: 'Trending',
      icon: 'TrendingUp',
      count: 234,
      color: 'text-primary'
    },
    {
      id: 'recent',
      name: 'Recent',
      icon: 'Clock',
      count: 89,
      color: 'text-secondary'
    },
    {
      id: 'delays',
      name: 'Delays',
      icon: 'AlertTriangle',
      count: 156,
      color: 'text-warning'
    },
    {
      id: 'facilities',
      name: 'Facilities',
      icon: 'Building',
      count: 78,
      color: 'text-success'
    },
    {
      id: 'safety',
      name: 'Safety',
      icon: 'Shield',
      count: 45,
      color: 'text-error'
    },
    {
      id: 'routes',
      name: 'Routes',
      icon: 'Route',
      count: 312,
      color: 'text-trust'
    },
    {
      id: 'help',
      name: 'Help & Tips',
      icon: 'HelpCircle',
      count: 167,
      color: 'text-authority'
    }
  ];

  return (
    <div className="bg-white border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex overflow-x-auto scrollbar-hide">
          <div className="flex space-x-1 py-4 min-w-max">
            {categories?.map((category) => (
              <button
                key={category?.id}
                onClick={() => onCategoryChange(category?.id)}
                className={`flex items-center space-x-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                  activeCategory === category?.id
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <Icon 
                  name={category?.icon} 
                  size={16} 
                  className={activeCategory === category?.id ? 'text-primary-foreground' : category?.color}
                />
                <span>{category?.name}</span>
                <span className={`px-1.5 py-0.5 text-xs rounded-full ${
                  activeCategory === category?.id
                    ? 'bg-primary-foreground/20 text-primary-foreground'
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {category?.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryTabs;