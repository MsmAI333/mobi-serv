import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';

const Customers = () => {
  const customers = [
    { id: 'CUST001', name: 'John Doe', email: 'john@example.com', phone: '123-456-7890', totalJobs: 3 },
    { id: 'CUST002', name: 'Jane Smith', email: 'jane@example.com', phone: '234-567-8901', totalJobs: 2 },
    { id: 'CUST003', name: 'Bob Johnson', email: 'bob@example.com', phone: '345-678-9012', totalJobs: 1 },
  ];

  return (
    <div className="container mx-auto py-10">
      <header className="bg-white dark:bg-gray-800 shadow mb-8">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Customers</h1>
            <Navigation />
          </div>
        </div>
      </header>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Customer ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Total Jobs</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {customers.map((customer) => (
            <TableRow key={customer.id}>
              <TableCell>{customer.id}</TableCell>
              <TableCell>{customer.name}</TableCell>
              <TableCell>{customer.email}</TableCell>
              <TableCell>{customer.phone}</TableCell>
              <TableCell>{customer.totalJobs}</TableCell>
              <TableCell>
                <Link to={`/customers/${customer.id}`}>
                  <Button variant="ghost" size="sm">
                    View Details
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

export default Customers;