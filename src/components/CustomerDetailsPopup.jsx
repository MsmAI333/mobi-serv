import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useQuery } from '@tanstack/react-query';
import { fetchCustomerJobs } from '../utils/dataUtils';

const CustomerDetailsPopup = ({ customer }) => {
  const { data: jobs, isLoading, isError } = useQuery({
    queryKey: ['customerJobs', customer.id],
    queryFn: () => fetchCustomerJobs(customer.id),
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link">{customer.name}</Button>
      </DialogTrigger>
      <DialogContent className="w-full max-w-3xl">
        <DialogHeader>
          <DialogTitle>Customer Details</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Customer Information</h3>
          <p>Name: {customer.name}</p>
          <p>Email: {customer.email}</p>
          <p>Phone: {customer.phone}</p>
        </div>
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Job History</h3>
          {isLoading ? (
            <p>Loading job history...</p>
          ) : isError ? (
            <p>Error loading job history</p>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Job ID</TableHead>
                    <TableHead>Device</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {jobs.map((job) => (
                    <TableRow key={job.id}>
                      <TableCell>{job.id}</TableCell>
                      <TableCell>{job.device}</TableCell>
                      <TableCell>{job.status}</TableCell>
                      <TableCell>{job.date}</TableCell>
                      <TableCell>
                        <Button variant="link" onClick={() => window.open(job.pdfUrl, '_blank')}>
                          View PDF
                        </Button>
                        <Button variant="link" onClick={() => window.open(job.imageUrl, '_blank')}>
                          View Image
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CustomerDetailsPopup;