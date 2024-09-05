import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchCustomersFromExcel, editCustomerData, deleteCustomerData } from '../utils/dataUtils';

const CustomerDetails = ({ customer }) => (
  <Dialog>
    <DialogTrigger asChild>
      <Button variant="link">View Details</Button>
    </DialogTrigger>
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>{customer.name}</DialogTitle>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <p>Email: {customer.email}</p>
        <p>Phone: {customer.phone}</p>
        <p>Device: {customer.device}</p>
        <p>Problem: {customer.problem}</p>
        <p>Status: {customer.status}</p>
        <p>Date: {customer.date}</p>
        {customer.imageUrl && (
          <img src={customer.imageUrl} alt="Device" className="w-full h-auto" />
        )}
        {customer.pdfUrl && (
          <Button onClick={() => window.open(customer.pdfUrl, '_blank')}>View PDF</Button>
        )}
      </div>
    </DialogContent>
  </Dialog>
);

const Customers = () => {
  const queryClient = useQueryClient();
  const [editingCustomer, setEditingCustomer] = useState(null);

  const { data: customers, isLoading, isError } = useQuery({
    queryKey: ['customers'],
    queryFn: fetchCustomersFromExcel,
  });

  const editMutation = useMutation({
    mutationFn: ({ id, data }) => editCustomerData(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(['customers']);
      setEditingCustomer(null);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => deleteCustomerData(id),
    onSuccess: () => {
      queryClient.invalidateQueries(['customers']);
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching customers</div>;

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
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {customers && customers.map((customer) => (
            <TableRow key={customer.id}>
              <TableCell>{customer.id}</TableCell>
              <TableCell>{customer.name}</TableCell>
              <TableCell>{customer.email}</TableCell>
              <TableCell>{customer.phone}</TableCell>
              <TableCell>
                <CustomerDetails customer={customer} />
                <Button variant="ghost" size="sm" onClick={() => setEditingCustomer(customer)}>
                  Edit
                </Button>
                <Button variant="ghost" size="sm" onClick={() => deleteMutation.mutate(customer.id)}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {editingCustomer && (
        <Dialog open={!!editingCustomer} onOpenChange={() => setEditingCustomer(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Customer</DialogTitle>
            </DialogHeader>
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              const updatedData = Object.fromEntries(formData.entries());
              editMutation.mutate({ id: editingCustomer.id, data: updatedData });
            }}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="name">Name</label>
                  <input id="name" name="name" defaultValue={editingCustomer.name} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="email">Email</label>
                  <input id="email" name="email" defaultValue={editingCustomer.email} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="phone">Phone</label>
                  <input id="phone" name="phone" defaultValue={editingCustomer.phone} className="col-span-3" />
                </div>
              </div>
              <Button type="submit">Save Changes</Button>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default Customers;