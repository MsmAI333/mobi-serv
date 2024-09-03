import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';

const StatusButton = ({ status, jobId }) => {
  const navigate = useNavigate();
  const getStatusColor = () => {
    switch (status.toLowerCase()) {
      case 'started':
        return 'bg-green-500 hover:bg-green-600';
      case 'ongoing':
        return 'bg-yellow-500 hover:bg-yellow-600';
      case 'completed':
        return 'bg-blue-500 hover:bg-blue-600';
      default:
        return 'bg-gray-500 hover:bg-gray-600';
    }
  };

  return (
    <Button 
      className={`${getStatusColor()} text-white`}
      onClick={() => navigate(`/job-details/${jobId}`)}
    >
      {status}
    </Button>
  );
};

const AllJobs = () => {
  const jobs = [
    { id: 1, customer: 'John Doe', device: 'iPhone 12', status: 'Started', customerId: 'CUST001' },
    { id: 2, customer: 'Jane Smith', device: 'Samsung Galaxy S21', status: 'Ongoing', customerId: 'CUST002' },
    { id: 3, customer: 'Bob Johnson', device: 'MacBook Pro', status: 'Completed', customerId: 'CUST003' },
  ];

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
          {jobs.map((job) => (
            <TableRow key={job.id}>
              <TableCell>{job.id}</TableCell>
              <TableCell>
                <Link to={`/customers/${job.customerId}`} className="text-blue-500 hover:underline">
                  {job.customer}
                </Link>
              </TableCell>
              <TableCell>{job.device}</TableCell>
              <TableCell>
                <StatusButton status={job.status} jobId={job.id} />
              </TableCell>
              <TableCell>
                <Link to={`/edit-job/${job.id}`}>
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AllJobs;