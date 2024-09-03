import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navigation from '../components/Navigation';

const RevenueDetails = () => {
  const revenueData = [
    { id: 1, device: 'iPhone 12', amount: 250 },
    { id: 2, device: 'Samsung Galaxy S21', amount: 200 },
    { id: 3, device: 'MacBook Pro', amount: 500 },
    { id: 4, device: 'iPad Air', amount: 150 },
    { id: 5, device: 'Google Pixel 5', amount: 180 },
  ];

  const totalRevenue = revenueData.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="container mx-auto py-10">
      <header className="bg-white dark:bg-gray-800 shadow mb-8">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Revenue Details</h1>
            <Navigation />
          </div>
        </div>
      </header>
      <Card>
        <CardHeader>
          <CardTitle>Today's Revenue Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Device</TableHead>
                <TableHead>Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {revenueData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.device}</TableCell>
                  <TableCell>${item.amount}</TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell className="font-bold">Total</TableCell>
                <TableCell className="font-bold">${totalRevenue}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default RevenueDetails;