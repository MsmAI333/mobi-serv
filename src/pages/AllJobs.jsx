import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Edit } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';
import { useQuery } from '@tanstack/react-query';

const fetchJobs = async () => {
  // Simulating API call with dummy data
  await new Promise(resolve => setTimeout(resolve, 500));
  return [
    { id: 1, customer: 'John Doe', device: 'iPhone 12', status: 'Started', customerId: 'CUST001', date: '2023-03-15' },
    { id: 2, customer: 'Jane Smith', device: 'Samsung Galaxy S21', status: 'Ongoing', customerId: 'CUST002', date: '2023-03-16' },
    { id: 3, customer: 'Bob Johnson', device: 'MacBook Pro', status: 'Completed', customerId: 'CUST003', date: '2023-03-17' },
    { id: 4, customer: 'Alice Brown', device: 'iPad Air', status: 'Started', customerId: 'CUST004', date: '2023-03-18' },
    { id: 5, customer: 'Charlie Davis', device: 'Google Pixel 5', status: 'Ongoing', customerId: 'CUST005', date: '2023-03-19' },
  ];
};

const AllJobs = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({ id: '', customer: '', device: '', status: '', date: '' });

  const { data: jobs, isLoading, isError } = useQuery({ queryKey: ['jobs'], queryFn: fetchJobs });

  const handleFilterChange = (key, value) => setFilters(prev => ({ ...prev, [key]: value }));

  const filteredJobs = jobs?.filter(job => 
    Object.entries(filters).every(([key, value]) => {
      if (!value) return true;
      if (key === 'date' && value === 'today') return job.date === new Date().toISOString().split('T')[0];
      return job[key].toString().toLowerCase().includes(value.toLowerCase());
    })
  ) || [];

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching jobs</div>;

  return (
    <div className="container mx-auto py-10">
      <header className="bg-white dark:bg-gray-800 shadow mb-8">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">All Jobs</h1>
            <Navigation />
          </div>
        </div>
      </header>
      <div className="mb-4 grid grid-cols-5 gap-4">
        <Input placeholder="Filter by ID" value={filters.id} onChange={(e) => handleFilterChange('id', e.target.value)} />
        <Input placeholder="Filter by Customer" value={filters.customer} onChange={(e) => handleFilterChange('customer', e.target.value)} />
        <Input placeholder="Filter by Device" value={filters.device} onChange={(e) => handleFilterChange('device', e.target.value)} />
        <Select value={filters.status} onValueChange={(value) => handleFilterChange('status', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All</SelectItem>
            <SelectItem value="Started">Started</SelectItem>
            <SelectItem value="Ongoing">Ongoing</SelectItem>
            <SelectItem value="Completed">Completed</SelectItem>
          </SelectContent>
        </Select>
        <Select value={filters.date} onValueChange={(value) => handleFilterChange('date', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by Date" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All</SelectItem>
            <SelectItem value="today">Today</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Job ID</TableHead>
            <TableHead>Customer Name</TableHead>
            <TableHead>Device</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredJobs.map((job) => (
            <TableRow key={job.id}>
              <TableCell>{job.id}</TableCell>
              <TableCell>
                <Link to={`/customers/${job.customerId}`} className="text-blue-500 hover:underline">
                  {job.customer}
                </Link>
              </TableCell>
              <TableCell>{job.device}</TableCell>
              <TableCell>{job.status}</TableCell>
              <TableCell>
                <Button variant="ghost" size="sm" onClick={() => navigate(`/edit-job/${job.id}`)}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AllJobs;