import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Home, List, Users, BarChart2, DollarSign } from 'lucide-react';

const Navigation = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? "bg-primary text-primary-foreground" : "bg-background";
  };

  return (
    <nav className="flex space-x-2">
      <Link to="/">
        <Button variant="ghost" className={isActive('/')}>
          <Home className="mr-2 h-4 w-4" />
          Home
        </Button>
      </Link>
      <Link to="/all-jobs">
        <Button variant="ghost" className={isActive('/all-jobs')}>
          <List className="mr-2 h-4 w-4" />
          All Jobs
        </Button>
      </Link>
      <Link to="/customers">
        <Button variant="ghost" className={isActive('/customers')}>
          <Users className="mr-2 h-4 w-4" />
          Customers
        </Button>
      </Link>
      <Link to="/product-analysis">
        <Button variant="ghost" className={isActive('/product-analysis')}>
          <BarChart2 className="mr-2 h-4 w-4" />
          Product Analysis
        </Button>
      </Link>
      <Link to="/revenue-analysis">
        <Button variant="ghost" className={isActive('/revenue-analysis')}>
          <DollarSign className="mr-2 h-4 w-4" />
          Revenue Analysis
        </Button>
      </Link>
    </nav>
  );
};

export default Navigation;