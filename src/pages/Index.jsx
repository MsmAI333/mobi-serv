import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { PlusCircle, Smartphone, Laptop, BarChart2, Search, User } from 'lucide-react';
import JobList from '../components/JobList';
import Analytics from '../components/Analytics';
import Navigation from '../components/Navigation';
import { useQuery } from '@tanstack/react-query';

const fetchSearchResults = async (query) => {
  // Simulating API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  return [
    { id: 'CUST001', name: 'John Doe', phone: '123-456-7890' },
    { id: 'CUST002', name: 'Jane Smith', phone: '234-567-8901' },
  ].filter(customer => 
    customer.name.toLowerCase().includes(query.toLowerCase()) ||
    customer.phone.includes(query)
  );
};

const fetchDashboardData = async () => {
  // Simulating API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  return {
    totalJobs: 1234,
    ongoingJobs: 42,
    completedToday: 16,
    revenueToday: 1234
  };
};

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const { data: searchResults, refetch: refetchSearch } = useQuery({
    queryKey: ['search', searchQuery],
    queryFn: () => fetchSearchResults(searchQuery),
    enabled: false,
  });

  const { data: dashboardData, isLoading: dashboardLoading } = useQuery({
    queryKey: ['dashboardData'],
    queryFn: fetchDashboardData,
  });

  const handleSearch = (e) => {
    e.preventDefault();
    refetchSearch();
  };

  const handleSearchResultClick = (customerId) => {
    navigate(`/customers/${customerId}`);
  };

  if (dashboardLoading) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Mobi Serve</h1>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => navigate('/login')}>
                <User className="mr-2 h-4 w-4" />
                Hello, User
              </Button>
              <Link to="/new-job">
                <Button className="bg-green-500 hover:bg-green-600">
                  <PlusCircle className="mr-2 h-4 w-4" /> Add New Job
                </Button>
              </Link>
            </div>
          </div>
          <Navigation />
          <div className="mt-4">
            <form onSubmit={handleSearch} className="relative">
              <Input
                type="text"
                placeholder="Search by name, phone, email, or reference number"
                className="pl-10 pr-4 py-2 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Button type="submit" className="absolute right-2 top-1/2 transform -translate-y-1/2">
                Search
              </Button>
            </form>
            {searchResults && searchResults.length > 0 && (
              <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md max-h-60 overflow-auto">
                {searchResults.map((result) => (
                  <div
                    key={result.id}
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleSearchResultClick(result.id)}
                  >
                    {result.name} - {result.phone}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Link to="/all-jobs">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Jobs</CardTitle>
                  <Smartphone className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{dashboardData.totalJobs}</div>
                </CardContent>
              </Card>
            </Link>
            <Link to="/all-jobs?status=ongoing">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Ongoing Jobs</CardTitle>
                  <Laptop className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{dashboardData.ongoingJobs}</div>
                </CardContent>
              </Card>
            </Link>
            <Link to="/all-jobs?status=completed&date=today">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Completed Today</CardTitle>
                  <BarChart2 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{dashboardData.completedToday}</div>
                </CardContent>
              </Card>
            </Link>
            <Link to="/revenue-details">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Revenue Today</CardTitle>
                  <BarChart2 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${dashboardData.revenueToday}</div>
                </CardContent>
              </Card>
            </Link>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <JobList />
            <Analytics />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;