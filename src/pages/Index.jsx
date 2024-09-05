import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { PlusCircle, Smartphone, Laptop, BarChart2, Search, User } from 'lucide-react';
import JobList from '../components/JobList';
import Analytics from '../components/Analytics';
import Navigation from '../components/Navigation';
import { useQuery } from '@tanstack/react-query';
import CustomerSearch from '../components/CustomerSearch';
import { fetchCustomersFromExcel } from '../utils/dataUtils';

const Index = () => {
  const navigate = useNavigate();

  const { data: dashboardData, isLoading: dashboardLoading } = useQuery({
    queryKey: ['dashboardData'],
    queryFn: fetchCustomersFromExcel,
  });

  useEffect(() => {
    const handleResize = () => {
      document.body.style.zoom = window.innerWidth > 768 ? 1 : window.innerWidth / 768;
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (dashboardLoading) return <div>Loading...</div>;

  const totalJobs = dashboardData.length;
  const ongoingJobs = dashboardData.filter(job => job.status === 'In Progress').length;
  const completedToday = dashboardData.filter(job => job.status === 'Completed' && job.date === new Date().toISOString().split('T')[0]).length;
  const revenueToday = completedToday * 100; // Assuming $100 per job

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
          <div className="mt-4 relative">
            <CustomerSearch />
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
                  <div className="text-2xl font-bold">{totalJobs}</div>
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
                  <div className="text-2xl font-bold">{ongoingJobs}</div>
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
                  <div className="text-2xl font-bold">{completedToday}</div>
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
                  <div className="text-2xl font-bold">${revenueToday}</div>
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