import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Home, List, Users, BarChart2, DollarSign } from 'lucide-react';

const Navigation = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? "bg-primary text-primary-foreground" : "bg-background";
  };

  const navItems = [
    { path: '/', icon: <Home className="h-4 w-4" />, label: 'Home' },
    { path: '/all-jobs', icon: <List className="h-4 w-4" />, label: 'All Jobs' },
    { path: '/customers', icon: <Users className="h-4 w-4" />, label: 'Customers' },
    { path: '/product-analysis', icon: <BarChart2 className="h-4 w-4" />, label: 'Product Analysis' },
    { path: '/revenue-analysis', icon: <DollarSign className="h-4 w-4" />, label: 'Revenue Analysis' },
  ];

  return (
    <nav className="flex flex-wrap justify-center space-x-2 space-y-2 md:space-y-0">
      {navItems.map((item) => (
        <Link key={item.path} to={item.path}>
          <Button variant="ghost" className={`${isActive(item.path)} flex items-center`}>
            {item.icon}
            <span className="ml-2 hidden md:inline">{item.label}</span>
          </Button>
        </Link>
      ))}
    </nav>
  );
};

export default Navigation;