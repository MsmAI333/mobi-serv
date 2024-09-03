import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Edit } from 'lucide-react';

const AllJobs = () => {
  const jobs = [
    { id: 1, customer: 'John Doe', device: 'iPhone 12', progress: 75, status: 'In Progress' },
    { id: 2, customer: 'Jane Smith', device: 'Samsung Galaxy S21', progress: 100, status: 'Completed' },
    { id: 3, customer: 'Bob Johnson', device: 'MacBook Pro', progress: 25, status: 'Pending' },
  ];

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-5">All Jobs</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Job ID</TableHead>
            <TableHead>Customer Name</TableHead>
            <TableHead>Device</TableHead>
            <TableHead>Progress</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {jobs.map((job) => (
            <TableRow key={job.id}>
              <TableCell>{job.id}</TableCell>
              <TableCell>{job.customer}</TableCell>
              <TableCell>{job.device}</TableCell>
              <TableCell>
                <Progress value={job.progress} className="w-[60%]" />
              </TableCell>
              <TableCell>{job.status}</TableCell>
              <TableCell>
                <Button variant="ghost" size="sm">
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