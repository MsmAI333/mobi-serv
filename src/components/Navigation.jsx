import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";

const Navigation = () => {
  return (
    <nav className="flex space-x-4">
      <Link to="/">
        <Button variant="ghost">Home</Button>
      </Link>
      <Link to="/all-jobs">
        <Button variant="ghost">All Jobs</Button>
      </Link>
      <Link to="/customers">
        <Button variant="ghost">Customers</Button>
      </Link>
      <Link to="/product-analysis">
        <Button variant="ghost">Product Analysis</Button>
      </Link>
    </nav>
  );
};

export default Navigation;